import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Home from './Home'
import Suggestions from './Suggestions'
import CreatePost from './CreatePost'
import Comment from './Comment'
import Explore from './Explore'
import Profile from './Profile'
import Followers from './Followers'
import UpdateUser from './UpdateUser'
import ProfilePicUpdate from './ProfilePicUpdate'

const MainPage = ({currUser, token, setAnyUser, setCurrUser, post, setPost, pic, setPic, showPost,
setShowPost, showComment, setShowComment, setExplore, explore, profile, setProfile, anyUser}) => {
  

  const [profileComment, setProfileComment] = useState(false)
  const [update, setUpdate] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState(false)


  useEffect(() => {


  
  

   

    fetch(`http://localhost:3000/users/${currUser.id}`, {
         
       method: 'GET',
 
       headers: {
 
         
 
         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
       }
 
       })
       .then((response) => response.json())
       .then((data) => {
           
           
       
 
           setCurrUser(data)
         
           
           
       })
       .catch((error) => {
           console.log('Error:', error)
       })
 
         
 
      
       
         
 
     },[]);
 

  
 
 
  return (
    <div>
      {showPost && < CreatePost setShowPost = {setShowPost} currUser = {currUser}/>}
      {showComment && <Comment setShowComment={setShowComment}
       pic = {pic} post = {post} currUser = {currUser} setAnyUser = {setAnyUser}
       anyUser = {anyUser} setProfile = {setProfile} setExplore = {setExplore} 
       profileComment = {profileComment} setPost = {setPost}/> }

       {explore &&
         <Explore currUser = {currUser} setShowComment = {setShowComment}
        setPic = {setPic} setPost = {setPost} setAnyUser = {setAnyUser}
        setShowPost = {setShowPost} setCurrUser = {setCurrUser} setExplore = {setExplore}
        setProfile = {setProfile} setProfileComment = {setProfileComment}
        setUpdate = {setUpdate} />
        }

        {profile && <Profile user = {anyUser} currUser = {currUser}
         setAnyUser = {setAnyUser} setCurrUser = {setCurrUser} setPost = {setPost}
         setPic = {setPic} setShowComment = {setShowComment} setExplore = {setExplore}
          setProfile = {setProfile} setProfileComment = {setProfileComment} setUpdate = {setUpdate}/>
        
        }


{update && <UpdateUser user = {anyUser} currUser = {currUser}
         setAnyUser = {setAnyUser} setCurrUser = {setCurrUser} setPost = {setPost}
         setPic = {setPic} setShowComment = {setShowComment} setExplore = {setExplore}
          setProfile = {setProfile} setProfileComment = {setProfileComment} 
          setUpdate = {setUpdate} setNewProfilePic = {setNewProfilePic}/>
        
        }



{newProfilePic && <ProfilePicUpdate setNewProfilePic={setNewProfilePic} currUser = {currUser}/>}




        
      
   {!explore && !profile && !update && <div className='mainpage'>

        <NavBar setShowPost = {setShowPost} setAnyUser = {setAnyUser} currUser = {currUser}
         setCurrUser = {setCurrUser} setExplore = {setExplore} setProfile = {setProfile}
         setUpdate = {setUpdate}/>
        < Home token = {token} currUser = {currUser} setShowComment = {setShowComment} setPic = {setPic}
        setPost = {setPost} setAnyUser = {setAnyUser} setProfile = {setProfile} setProfileComment = {setProfileComment}/>
        < Suggestions currUser = {currUser}/>
       

    </div>
   }


    </div>
  )
}

export default MainPage