import React, { useState, useEffect } from "react";
import { auth, storage } from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Dashboard() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false); 
  const [loadingFetch, setLoadingFetch] = useState(false); 
  const [loadingSignOut, setLoadingSignOut] = useState(false); 
  const firebaseAuth = getAuth();
  const navigate = useNavigate(); 

  const uploadFile = () => {
    if (imageUpload == null) return;

    setLoadingUpload(true);
    const userId = firebaseAuth.currentUser.uid;
    const imageRef = ref(storage, `images/${userId}/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setLoadingUpload(false); 
      });
    }).catch(error => {
      console.error('Error uploading image', error);
      setLoadingUpload(false); 
    });
  };

  const handleSignOut = () => {
    setLoadingSignOut(true); 
    signOut(auth).then(() => {
      console.log('Signed Out');
      navigate('/'); 
      setLoadingSignOut(false); 
    
      Swal.fire({
        icon: 'success',
        title: 'Signed Out!',
        showConfirmButton: false,
        timer: 1500
      });
    }).catch((error) => {
      console.error('Sign Out Error', error);
      setLoadingSignOut(false); 
    });
  };

  useEffect(() => {
    setLoadingFetch(true); 
    const userId = firebaseAuth.currentUser ? firebaseAuth.currentUser.uid : null;
    
    if (userId) {
      const imagesListRef = ref(storage, `images/${userId}`);
      listAll(imagesListRef).then((response) => {
        const urls = [];
        if (response.items.length === 0) {
          setLoadingFetch(false); 
          return;
        }
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            urls.push(url);
            setImageUrls((prev) => [...prev, url]);
          });
        });
        setLoadingFetch(false); 
        
        Swal.fire({
          icon: 'success',
          title: 'Images Loaded!',
          showConfirmButton: false,
          timer: 1500
        });
      }).catch(error => {
        console.error('Error fetching images', error);
        setLoadingFetch(false); 
      });
    } else {
      setImageUrls([]);
    }
  }, [firebaseAuth.currentUser]);

  if (!firebaseAuth.currentUser) {
    navigate('/');
    return <div>Loading</div>;
  }

  return (
    <div className="dashboard-container">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button className="upload-button" onClick={uploadFile} disabled={loadingUpload}>
        {loadingUpload ? "Uploading..." : "Upload Image"}
      </button>
      <button className="signout-button" onClick={handleSignOut} disabled={loadingSignOut}>
        {loadingSignOut ? "Signing Out..." : "Sign Out"}
      </button>
      {loadingFetch ? (
        <div>Loading Images...</div>
      ) : (
        <div className="image-container">
          {imageUrls.map((url, index) => {
            return <img key={index} src={url} alt={`Image ${index}`} className="uploaded-image" />;
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
