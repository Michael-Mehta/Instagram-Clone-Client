
import { useState } from "react";

import NavBar from "./NavBar";


const UpdateUser = ({user, currUser, setAnyUser, setCurrUser, setPost, setShowComment, 
  setPic, setExplore, setProfile, setProfileComment, setUpdate, setNewProfilePic}) => {
   

const [avatar, setAvatar] = useState(null);

const [showPost, setShowPost] = useState(false)

const handleAvatarChange = (event) => {
  setAvatar(event.target.files[0]);
};

const handleAvatarUpdate = () => {
  const formData = new FormData();
  formData.append('avatar', avatar);

  fetch(`/users/${currUser.id}/avatar`, {
    method: 'PUT',
    body: formData,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    });
};



const handlePic = () => {

  setNewProfilePic(true)

}



return (
  <div>
    <div><NavBar setShowPost = {setShowPost} setAnyUser = {setAnyUser} currUser = {currUser}
         setCurrUser = {setCurrUser} setExplore = {setExplore} setProfile = {setProfile}
         setUpdate = {setUpdate}/>
         </div>


         <div className='bio'>
          <div className='bio-image'>
            <img src = {user.avatar_url} alt = "profile pic" className='profilePic' />
         </div>
         <div >
          <div className='bio-top'>
            <h1>{user.username}</h1>
          </div>
          <p className="changeProfilePic" onClick={() => handlePic()}>Change Profile Picture</p>
         </div>
         </div>
  </div>
);


}

export default UpdateUser
