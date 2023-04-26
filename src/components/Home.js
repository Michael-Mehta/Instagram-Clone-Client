import React, { useEffect, useState } from 'react'
import Post from './Post';
import '../App.css'


const Home = ({token, currUser, setShowComment, setPic, setPost, setAnyUser, setProfileComment, setProfile}) => {

  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [myprofile, setMyProfile] = useState(false)

    const [posts, setPosts] = useState([])


    const getPosts = () => {

    
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
  }



  
  useEffect(() => {
  
      let mounted = true;
    
    
     getPosts()
     setProfileComment(false)
    
    
      return () => (mounted = false);
    
    
    }, []);




    
   
    


    



  return (
    <div className='posts'>


      {
        posts.map((post, i)=> (
            <Post post = {post}
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
  )
}

export default Home

