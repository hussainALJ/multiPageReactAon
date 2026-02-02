import { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import { Link, useNavigate } from "react-router";

function AddPost() {
  const [title, setTitle] = useState("");

  const [body, setBody] = useState("");

  async function handelAddPost() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
            id: 101,
          }),
        },
      );
      if (response.ok) useNavigate('/')
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <Hero />
      <div className="container">
        <section className="posts">
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <Link to="/">Cancel</Link>
            <h3 style={{ cursor: "pointer" }} onClick={handelAddPost}>
              {" "}
              Add Post{" "}
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
        </section>
      </div>
    </>
  );
}

export default AddPost;
