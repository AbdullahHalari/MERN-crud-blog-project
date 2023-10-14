import {useContext, useState} from "react";
import {Navigate, useNavigate,Link} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
  const [email,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    // if (response.ok) {
    //   response.json().then(userInfo => {
    //     setUserInfo(userInfo);
    //     setRedirect(true);
    //   });
    // } else {
    //   alert('wrong credentials');
    // }
     const data = await res.json();
    //  console.log('data')
    //  if(res.ok){

    //    res.json().then(userInfo => {
    //      setUserInfo(userInfo);
    //      console.log('userInfo');
    //      setRedirect(true);
    //     });
    //   }
     //  console.log(data);
     if (data.status === 400 || !data) {
      //  window.alert("Invalid");
       console.log("Invalid");
     }
      if(data.status === 400){
      //  console.log("success");
        //  window.alert("Invalid");
        navigate("/login");
         console.log("Invalid");
        }
       else {
        //  window.alert("success");
       navigate("/home");
     }
  }

  // if (redirect) {
  //   return <Navigate to={'/create'} />
  // }
  return (
    <form
      className="login"
      //  onSubmit={login}
    >
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={email}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <br/>
      <button onClick={()=>navigate("/register")}>Create new account</button>
    </form>
  );
}