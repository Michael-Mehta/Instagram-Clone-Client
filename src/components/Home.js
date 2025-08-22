import { useEffect, useState } from 'react'
import Post from './Post';
import '../App.css'


const Home = ({token, currUser, setShowComment, setPic, setPost, setAnyUser, setProfileComment, setProfile}) => {

  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [myprofile, setMyProfile] = useState(false)

    const [posts, setPosts] = useState([])

    const handlePostDelete = (deletedPostId) => {
    setPost(posts.filter(post => post.id !== deletedPostId));
   };

    const getPosts = () => {

      const token = localStorage.getItem('authToken')
    if (!currUser?.id || !token) {
      console.warn('Skipping user fetch in NavBar: missing currUser.id or authToken')
      return
    }
    
      fetch('https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/posts', {
        
      method: 'GET',

      headers: {

        

        'Authorization': `Bearer ${token}`
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
             onPostDelete={handlePostDelete}
             />
        ))

    
      }
    </div>
  )
}

export default Home

