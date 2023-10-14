import {useEffect, useState} from "react";
import {Navigate, useParams,useNavigate} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [description,setSummary] = useState('');
  const navigate = useNavigate();
  // const [content,setContent] = useState('');
  // const [files, setFiles] = useState('');
  // const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setSummary(postInfo.description);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const response = await fetch("/edit", {
      method: "PUT",
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
      navigate("/home");
    }
  }

  // if (redirect) {
  //   return <Navigate to={'/post/'+id} />
  // }

  return (
    <form 
    onSubmit={updatePost}
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
      {/* <Editor onChange={setContent} value={content} /> */}
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  );
}