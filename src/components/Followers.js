import React, { useEffect, useState } from 'react'

import { BsXLg } from 'react-icons/bs';

const Followers = ({setShowFollowers, user, followings, currUser}) => {

  const [tempCurrUser, setTempCurrUser] = useState(null)

  const [following, setFollowing] = useState([])
  

  useEffect(() => {

    fetch(`http://localhost:3000/users/${currUser.id}`, {
        
    method: 'GET',

    headers: {

      

      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }

    })
    .then((response) => response.json())
    .then((data) => {
        
        console.log(data)
       

        setTempCurrUser(data)

        setFollowing(data.following)

      
        console.log(data.following)
        
        
    })
    .catch((error) => {
        console.log('Error:', error)
    })


    console.log(user)
  },[])



  const handleFollow = (follower) => {

    fetch(`http://localhost:3000/profile/${follower.id}/follow`, {
        
    
    method: 'POST',
  
    headers: {
  
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  
    }
  
    }).catch((error) => {
        console.log('Error:', error)
    })
  
    
    
  }
   
    
    
  const handleUnfollow = (follower) => {
  
    fetch(`http://localhost:3000/profile/${follower.id}/unfollow`, {
        
    
    method: 'POST',
  
    headers: {
  
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  
    }
  
    }).catch((error) => {
        console.log('Error:', error)
    })
  
    
  }


const CurrUserFollow = ({follower}) => {


  return (
    <div className='follower-list'>
               <div><img src = {follower.avatar_url} alt = 'profile pic' className = 'evenBiggerAvatar'/></div>
               <div className='follower-username'>{follower.username}</div>
              

     </div>
  )
}





  const Follow = ({follower}) => {

    const [tempFollow, setTempFollow] = useState(false)
 
    const [change, setChange] = useState(true)

    



  

  if(followings) {
    
    following.map((follow) => {
      if(follow.id === tempCurrUser.id){
        setTempFollow(true)
      }
    })

}







      


  const secondHandleFollow = (follower) => {

    

    setTempFollow(false)
    handleFollow(follower)
  }


  const secondHandleUnfollow = (follower) => {

  
    setTempFollow(true)
    handleUnfollow(follower)
  }
  
    
    
    return(
    <div className='follower-list'>
               <div><img src = {follower.avatar_url} alt = 'profile pic' className = 'evenBiggerAvatar'/></div>
               <div className='follower-username'>{follower.username}</div>
              
    {tempFollow ? <button onClick={() => secondHandleFollow(follower)} className = "followersFollow">Follow</button> :
   <button onClick={() => secondHandleUnfollow(follower)} className = "followersUnfollow">Unfollow</button>}
               
     </div>
    )
  }

  

    return(

    <div className='followersCreateBackground'>

      <div onClick={() => setShowFollowers(false)}><BsXLg className='exit'/></div>

      {followings ? <div className='followers'>
        <div className='followers-heading'>Following</div>
        

        {
            user.following.map((follower) => {

              if(follower.id === currUser.id){
                  return(
                    <CurrUserFollow follower = {follower}/>
                  )
              }else{

                return(
                  < Follow follower = {follower} />
                )}
            })
        }
      </div> : 
      <div className='followers'>
      <div className='followers-heading'>Followers</div>
      

      {
          user.followers.map((follower) => {

              

            if(follower.id === currUser.id){
              return(
                <CurrUserFollow follower = {follower}/>
              )
          }else{

            return(
              < Follow follower = {follower} />
            )}
          })
      }
    </div>}

    </div>

    )
}


export default Followers