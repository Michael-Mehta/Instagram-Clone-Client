import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate }
 from 'react-router-dom';

import './App.css';
import User from './components/User'
import MainPage from './components/MainPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';


const App=()=>{
  const [currUser, setCurrUser]=useState(null);
  const [anyUser, setAnyUser] = useState(null);
  const [token, setToken] = useState('');
  const [post, setPost] = useState('');
  const [pic, setPic] = useState('');
  const [showPost, setShowPost] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [explore, setExplore] = useState(false);
  const [profile, setProfile] = useState(false);
  
 
  const navigate = useNavigate;

 
  
  return (
    <div className="App">
        <BrowserRouter>
      <Routes>
        <Route path="/" element={currUser? <MainPage currUser = {currUser}
         token = {token} setAnyUser = {setAnyUser} setCurrUser = {setCurrUser}
         post = {post} setPost = {setPost} pic = {pic}
         setPic = {setPic} showPost = {showPost} setShowPost = {setShowPost}
         showComment = {showComment} setShowComment = {setShowComment}
         setExplore = {setExplore} explore = {explore} profile = {profile}
         setProfile = {setProfile} anyUser = {anyUser}/> : 
        <Login currUser = {currUser}
         setCurrUser = {setCurrUser} setToken = {setToken} />} />
        <Route path="/login" element={<Login currUser = {currUser}
        setCurrUser = {setCurrUser} />} />
        <Route path="/signup" element={<Signup currUser = {currUser}
        setCurrUser = {setCurrUser} />} />
        
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}


export default App