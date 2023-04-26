import React, { useEffect, useState } from 'react'
import ExplorePosts from './ExplorePosts'
import NavBar from './NavBar'


const Explore = ({currUser, setShowComment, setPic, setPost, setAnyUser,
   setShowPost, setCurrUser, setExplore, setProfile, setProfileComment, setUpdate}) => {

    const [posts, setPosts] = useState([])
    const [myprofile, setMyProfile] = useState(false)


    useEffect(() => {


      fetch('http://localhost:3000/posts', {
        
      method: 'GET',

      headers: {

        

        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }

      })
      .then((response) => response.json())
      .then((data) => {
          
          console.log(data)
        
          setPosts(data)
          
      })
      .catch((error) => {
          console.log('Error:', error)
      })


      setProfileComment(false)
    },[]);


    return (
        <div className='explorePage'>

<div className='explore-nav'><NavBar setShowPost = {setShowPost} setAnyUser = {setAnyUser} currUser = {currUser}
         setCurrUser = {setCurrUser} setExplore = {setExplore} setProfile = {setProfile} setUpdate = {setUpdate}/></div>


<div className='posts-explore'>
      {

        
        posts.map((post)=> (
            <ExplorePosts post = {post}
             currUser = {currUser}
             setShowComment = {setShowComment}
             setPic = {setPic}
             setPost = {setPost}
             profile = {myprofile}
             setAnyUser = {setAnyUser}
             setProfile = {setProfile}
             
             />
        ))

        
    
      }
      </div>
        </div>
    )
}



export default Explore