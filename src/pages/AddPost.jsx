import { useState } from "react";
import Hero from "../components/Hero.jsx";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function AddPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  async function handelAddPost() {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: 11,
          title: title,
          body: body,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <>
      <Hero />
      <div className="container">
        <section className="posts">
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <Link to="/">Cancel</Link>
            <h3 style={{ cursor: "pointer" }} onClick={() => handelAddPost()}>
              Add Post
            </h3>
          </div>
          <div className="content flex">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <textarea
              name="postBody"
              style={{ fieldSizing: "content", resize: "none" }}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></textarea>
          </div>
          {
            error? <h3 style={{textAlign: 'center', marginTop: '20px'}}>{error}</h3>
            : <></>
          }
        </section>
      </div>
    </>
  );
}

export default AddPost;
