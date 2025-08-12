import { useState } from "react";






const ProfilePicUpdate = ({setNewProfilePic, currUser}) => {


    const [avatar, setAvatar] = useState(null);

  const handleInputChange = (event) => {
    setAvatar(event.target.files[0]);
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('avatar', avatar);
    
        try {
          const response = await fetch(`https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/users/${currUser.id}/avatar`, {
            method: 'PUT',
            body: formData,
          });
          const data = await response.json();
          console.log(data);
          setNewProfilePic(false)
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className='followersCreateBackground'>

      

      <div className='newProfilePic'>
        <h1>Change Profile Photo</h1>
        <form onSubmit={handleSubmit} className = 'profilePicForm'>
   
        <input type="file" onChange={handleInputChange} />
      
      <button type="submit" >Update Avatar</button>
    </form>
        <p className='cancel' onClick={() => setNewProfilePic(false)}>Cancel</p>
        </div>

    </div>
    )
}


export default ProfilePicUpdate