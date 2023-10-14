import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function signUp(e){
    try {
      e.preventDefault();
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 422 || !data) {
        console.log("Invalid");
      } else {
        console.log("success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
    }
  }
  // async function register(ev) {
  //   ev.preventDefault();
  //   const response = await fetch('http://localhost:4000/register', {
  //     method: 'POST',
  //     body: JSON.stringify({username,password}),
  //     headers: {'Content-Type':'application/json'},
  //   });
  //   if (response.status === 200) {
  //     alert('registration successful');
  //   } else {
  //     alert('registration failed');
  //   }
  // }
  return (
    <form
      className="register"
      // onSubmit={register}
    >
      <h1>Register</h1>
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
      <button onClick={signUp}>Register</button>
      <br />
      <button onClick={() => navigate("/login")}>already have account</button>
    </form>
  );
}