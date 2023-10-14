import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate,Link, useNavigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [description,setSummary] = useState('');
  const date = Date(Date.now());
  const navigate = useNavigate();
  // const [content,setContent] = useState('');
  // const [files, setFiles] = useState('');
  // const [redirect, setRedirect] = useState(false);
  // async function createNewPost(ev) {
  //   const data = new FormData();
  //   data.set('title', title);
  //   data.set('summary', summary);
  //   data.set('content', content);
  //   data.set('file', files[0]);
  //   ev.preventDefault();
  //   const response = await fetch('http://localhost:4000/post', {
  //     method: 'POST',
  //     body: data,
  //     credentials: 'include',
  //   });
  //   if (response.ok) {
  //     setRedirect(true);
  //   }
  // }

  // if (redirect) {
  //   return <Navigate to={'/'} />
  // }
   async function post(ev) {
     try {
       ev.preventDefault();
       const res = await fetch("/post", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           title,
           description,
           date
         }),
       });
       const data = await res.json();
       console.log(data);
       if (data.status === 422 || !data) {
         console.log("Invalid");
       } else {
         console.log("success");
       }
       navigate('/home')
     } catch (error) {
       console.log(error);
     }
   }
  return (
    <form 
    // onSubmit={createNewPost}
    >
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} 
             />
      <input type="summary"
             placeholder={'Summary'}
             value={description}
             onChange={ev => setSummary(ev.target.value)} 
             />
      {/* <input type="file"
            //  onChange={ev => setFiles(ev.target.files)} 
             /> */}
      {/* <Editor value={content} onChange={setContent} /> */}
      <button onClick={post} style={{marginTop:'5px'}}>Create post</button>
      <Link to={"/home"}>HOME</Link>
    </form>
  );
}