import React, { useEffect, useState } from 'react'



const Suggestions = ({currUser}) => {


  const [users, setUsers] = useState([])


  const SuggestedUser = ({user}) => {

    const [following, setFollowing] = useState(false)


    const secondHandleFollow = (user) => {

      setFollowing(true)
      handleFollow(user)
    }


    const secondHandleUnfollow = (user) => {

      setFollowing(false)
      handleUnfollow(user)
    }

    return (
    <div className='suggestedUser'>
      <div>
    <img src = {user.avatar_url} className = 'avatar'/> <div>{user.username} 
    </div>
    </div>
    {following ? <button onClick={() => secondHandleUnfollow(user)} className = "suggestedUnfollow">Unfollow</button> : 
    <button onClick={() => secondHandleFollow(user)} className = "suggestedFollow">Follow</button> }
    </div>
    )
  }


  const getUsers = () => {

    
    fetch('http://localhost:3000/users/suggested_users', {
      
    method: 'GET',

    headers: {

      

      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }

    })
    .then((response) => response.json())
    .then((data) => {
        
        console.log(data)
      
        setUsers(data)

        console.log(currUser)
        
    })
    .catch((error) => {
        console.log('Error:', error)
    })
}




useEffect(() => {

  getUsers()

},[])
  
  

const handleFollow = (user) => {

  fetch(`http://localhost:3000/profile/${user.id}/follow`, {
      
  
  method: 'POST',

  headers: {

      'Authorization': `Bearer ${localStorage.getItem('authToken')}`

  }

  }).catch((error) => {
      console.log('Error:', error)
  })

  
  
}
 
  
  
const handleUnfollow = (user) => {

  fetch(`http://localhost:3000/profile/${user.id}/unfollow`, {
      
  
  method: 'POST',

  headers: {

      'Authorization': `Bearer ${localStorage.getItem('authToken')}`

  }

  }).catch((error) => {
      console.log('Error:', error)
  })

  
}
  

  return (
    <div >

        <div className='suggestions'>
        <div className='suggestionsCurrUsers'>
          <img src = {currUser.avatar_url} className = "biggerAvatar"/> 
          <div className='suggestionUsername'>{currUser.username}</div>
          </div>

        <h3>Suggestions for you</h3>

        <div className='suggestedUsers'>
        {users.map((user) => {
          return(
            < SuggestedUser user = {user} />
          )
        })
        
        }
        </div>
        
       </div>
        
    </div>
  )
}

export default Suggestions