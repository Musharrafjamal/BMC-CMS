import React from 'react'
import "./Navbars/nav.css";
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import {SlLogout} from 'react-icons/sl'

const LogOut = () => {
    const logOut = async () => {
        try {
            await signOut(auth)
          } catch (err) {
            console.error(err);
          }
      };
  return (
    <Link to={'/'} className='scale-up-bl nav-btns' onClick={logOut}> {<SlLogout size={20} />} </Link >
  )
}

export default LogOut