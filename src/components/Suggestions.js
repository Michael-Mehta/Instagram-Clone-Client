import { useEffect, useState } from 'react'



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
    const token = localStorage.getItem('authToken')

    if (!currUser?.id || !token) {
      console.warn('Skipping user fetch in NavBar: missing currUser.id or authToken')
      return
    }

    
    fetch('https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/users/suggested_users', {
      
    method: 'GET',

    headers: {

      

      'Authorization': `Bearer ${token}`
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
  const token = localStorage.getItem('authToken')
    
    if (!currUser?.id || !token) {
      console.warn('Skipping user fetch in NavBar: missing currUser.id or authToken')
      return
    }

  getUsers()

},[])
  
  

const handleFollow = (user) => {

  const token = localStorage.getItem('authToken')
    if (!currUser?.id || !token) {
      console.warn('Skipping user fetch in NavBar: missing currUser.id or authToken')
      return
    }

  fetch(`https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/profile/${user.id}/follow`, {
      
  
  method: 'POST',

  headers: {

      'Authorization': `Bearer ${token}`

  }

  }).catch((error) => {
      console.log('Error:', error)
  })

  
  
}
 
  
  
const handleUnfollow = (user) => {

  const token = localStorage.getItem('authToken')
    if (!currUser?.id || !token) {
      console.warn('Skipping user fetch in NavBar: missing currUser.id or authToken')
      return
    }

  fetch(`https://instagramclonebackend-ffg2c4gsd3fwg4gd.westus3-01.azurewebsites.net/profile/${user.id}/unfollow`, {
      
  
  method: 'POST',

  headers: {

      'Authorization': `Bearer ${token}`

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