import React, { useEffect, useState } from 'react'
import { BsFillHouseDoorFill, BsSearch, BsCompass,
  BsChatText, BsHeart, BsPlusSquare} from 'react-icons/bs';
 import { BiMoviePlay } from "react-icons/bi";
 import { GiDove, GiHamburgerMenu } from "react-icons/gi";
 import { useNavigate } from "react-router-dom";

const NavBar = ({setShowPost, setAnyUser, currUser, setCurrUser, setExplore, setProfile, setUpdate}) => {

  const navigate = useNavigate();


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


  const handleHome = () => {
    setShowPost(false)

    setUpdate(false)
   
    setExplore(false)

    setProfile(false)

    navigate('/')
  }

  const handleProfile = () => {
    fetch(`http://localhost:3000/users/${currUser.id}`, {
        
      method: 'GET',

      headers: {

        

        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }

      })
      .then((response) => response.json())
      .then((data) => {
          
          

          setAnyUser(data)
        
          setUpdate(false)
          setExplore(false)
          setProfile(true)
          
      })
      .catch((error) => {
          console.log('Error:', error)
      })



      

     
  }


  const handleExplore = (e) => {

    e.preventDefault();

    navigate('/')

    setUpdate(false)
    
    setProfile(false)

    setExplore(true)
  }

  return (
    <div className='naVbar'>
        <div className='naVItems'>
          <h1>Instagram</h1>

        <div onClick={() => handleHome()}><div><BsFillHouseDoorFill/></div><div>Home</div></div>
        <div><div><BsSearch/></div><div>Search</div></div>
        <div onClick={(e) => handleExplore(e) }><div><BsCompass/></div><div>Explore</div></div>
        <div><div><BiMoviePlay/></div><div>Reels</div></div>
        <div><div><BsChatText/></div><div>Messages</div></div>
        <div><div><BsHeart/></div><div>Notifications</div></div>
        <div onClick={() => setShowPost(true)}><div><BsPlusSquare/></div><div>Create</div></div>
        <div className='navProfile' onClick={() => handleProfile()}><div><img src = {currUser.avatar_url } alt = "avatar" className = 'avatar'/></div><div>Profile</div></div>
        <div><div><GiHamburgerMenu/></div><div>More</div></div>
        </div>

    </div>
  )

}

export default NavBar