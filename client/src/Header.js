import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const {setUserInfo,userInfo} = useContext(UserContext);

   const callPage = async () => {
     try {
       const res = await fetch("/create", {
         method: "GET",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
         credentials: "include",
       });
       const data = await res.json();
       console.log(data);
       setUserInfo(data);

       if (!res.status === 200) {
         const error = new Error(res.error);
         throw error;
       }
       if (res.status === 401) {
         navigate("/login");
       }
     } catch (error) {
       console.log(error);
       navigate("/login");
     }
   };
useEffect(() => {
  callPage();
},[]);
   const logOut = async () => {
     try {
       const res = await fetch("/logout", {
         method: "GET",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
         credentials: "include",
       });
      //  const data = await res.json();
       if (!res.status === 200) {
         const error = new Error(res.error);
         throw error;
        }
      } catch (error) {
        console.log(error);
      }
      navigate("/login");
   };

  const username = userInfo?.email;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <p>heellll</p>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a 
            onClick={logOut}
            >Logout 
            ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
