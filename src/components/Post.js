import { useEffect, useState } from 'react'
import '../App.css'

import { useNavigate } from "react-router-dom";
import { BsHeart, BsChat } from 'react-icons/bs';


const Post = ({ post, currUser, setShowComment, setPic, setPost, profile, setAnyUser, setProfile, onPostDelete}) => {


    const [liked, setLiked] = useState(post.liked_by_current_user);
     
    const [likes, setLikes] = useState(0)

    
    const [reload, setReload] = useState(false)

    const [ok, setOk] = useState(false)

    const [red, setRed] = useState(false)


    const navigate = useNavigate();





    useEffect(() => {


        setLikes(post.likes_count)


        
  
    
    },[])







    const handleProfile = () => {
        const token = localStorage.getItem('authToken')
    if (!currUser?.id || !token) {
      console.warn('Skipping user fetch in NavBar: missing currUser.id or authToken')
      return
    }
        fetch(`https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/users/${post.user_id}`, {
            
          method: 'GET',
    
          headers: {
    
            
    
            'Authorization': `Bearer ${token}`
          }
    
          })
          .then((response) => response.json())
          .then((data) => {
              
              
    
              setAnyUser(data)

              
            
              setProfile(true)
              
          })
          .catch((error) => {
              console.log('Error:', error)
          })
    
    
    
          
    
         
      }






      const handleProfileCommentAvatar = () => {
        const token = localStorage.getItem('authToken')
    if (!currUser?.id || !token) {
      console.warn('Skipping user fetch in NavBar: missing currUser.id or authToken')
      return
    }
        fetch(`https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/users/${post.user_id}`, {
            
          method: 'GET',
    
          headers: {
    
            
    
            'Authorization': `Bearer ${token}`
          }
    
          })
          .then((response) => response.json())
          .then((data) => {
              
             
    
              setAnyUser(data)
            
            
              
          })
          .catch((error) => {
              console.log('Error:', error)
          })
    
    
    
          
    
         
      }
    
    

   
    
  
      
    
    const handleLikeClick = () => {
        if (liked) {
            // User has already liked the post - unlike it
            
            fetch(`https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/likes/${post.id}`,
                { method: 'DELETE',

                headers: { 
                    'Content-Type': 'application/json'
                 },


                body: JSON.stringify({ 
                'user_id': currUser.id ,
                'post_id': post.id })
            
            
            });

            

            setLikes(likes - 1)
            setLiked(false)
            setRed(false)
       

        } else {
            // User hasn't liked the post yet - like it
            fetch(`https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/posts/${post.id}/likes`,
                { method: 'POST',

                headers: { 
                    'Content-Type': 'application/json'
                 },

                 body: JSON.stringify({ user_id: currUser.id , post_id: post.id })
                
                }
                
                )
                .then((response) => response.json())
                .then((data) => {
                    setLiked(true);
                    // Update the post object with the new likes_count value
                     setLikes(likes + 1)
                     setRed(true)
                 
                     
                })
                .catch(error => console.error(error));
        }


    };




    const handleComment = () => {

        
        setShowComment(true)
        setPic(post.image_url)
        setPost(post)
    }

const DeleteButton = ({ postId, onDelete }) => {
    const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = localStorage.getItem('authToken'); // or wherever you store your JWT
        
        const response = await fetch(`https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          onDelete(postId); // Remove from UI
        } else {
          alert('Failed to delete post');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting post');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      Delete
    </button>
  );
};


    const handleProfileComment = () => {
        handleProfileCommentAvatar()
        setShowComment(true)
        setPic(post.image)
        setPost(post)
    }


    return (

        
        <div>


         {profile ?
           (<img src={post.image} alt='pic' className='profilePost' onClick={() => handleProfileComment()}/>):(<div className='post'>
            <div className='postTop' onClick={() => handleProfile()}><div><img src = {post.user_avatar_url} className = 'postAvatar'/></div>
            <div className='postUsername'>{post.username}</div></div>
            {post.user_id === currUser.id && (
                    <DeleteButton 
                     postId={post.id} 
                     onDelete={onPostDelete}
                    />
                     )}
            <div className='picIcon'><div className='imagePic'><img src={post.image_url} alt='pic' className='imagePics'  /></div>
                <div className='heart-comment'>
                    <div>< BsHeart className={red ? 'unheart':'heart'} 
                    onMouseDown={() => handleLikeClick()} /></div>
                    <div onClick={() => handleComment()}>< BsChat /></div>
                </div>
                
                <div className='likes'>Likes:{likes}</div>

                <div className='postDescription'>
                    <p>Description: {post.description}</p>
                </div>
                <div className='addComment' onClick={() => handleComment()}>
                    <p>View all comments</p>
                </div>
            </div>
        </div>)
        }

    
        </div>
    
    );


}

export default Post