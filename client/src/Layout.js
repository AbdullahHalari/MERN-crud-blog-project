import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaRegFileExcel, FaWindows } from "react-icons/fa";

export default function Layout() {
   const navigate = useNavigate();

  const {setUserInfo,userInfo} = useContext(UserContext);
  const [post,setPost] = useState([]);

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
       if (res.status === 400) {
         navigate("/login");
       }
     } catch (error) {
       console.log(error);
       navigate("/login");
     }
   };
   const postData = async () => {
     try {
       const res = await fetch("/postget", {
         method: "GET",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
       });
       console.log('res');
       const data = await res.json();
       setPost(data);

       if (!res.status === 200) {
         const error = new Error(res.error);
         throw error;
       }
      //  if (res.status === 400) {
      //    navigate("/login");
      //  }
     } catch (error) {
       console.log(error);
      //  navigate("/login");
     }
   };
async function deletePost(Item) {
  let id = Item._id;
  let title=Item.title;
  let description = Item.description;
  const response = await fetch("/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      description,
    }),
    credentials: "include",
  });
  console.log(id, title, description);
  if (response.ok) {
    // setRedirect(true);
    window.location.reload()
  }
}
useEffect(() => {
  callPage();
  postData();
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

  const username = userInfo.email;
  return (
    <div>
      <header>
        <Link to="/" className="logo">
          MyBlog CRUD
        </Link>
        <p>Abdullah halari</p>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logOut}>Logout ({username})</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logOut}>Logout ({"username"})</a>
            </>
          )}
        </nav>
      </header>
      <div className="questions-list">
        {post.map((Item, index) => (
          <div key={index}>
            <div>{`${Item.title}`}</div>
            <div>
              <div>
                <p>{Item.description}</p>
              </div>
              <div>
                <p>{Item.date}</p>
              </div>
              <div className="edit-row">
                <Link
                  className="edit-btn"
                  to={`/edit/${Item._id}`}
                >
                  Edit this post <FaEdit />
                </Link>
              </div>
              <div className="edit-row">
               <button onClick={()=>deletePost(Item)}>
                delete
               </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}