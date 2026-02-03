import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero.jsx";

function Post() {
  const id = useParams().id;

  const [postObj, setPostObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [comments, setComments] = useState(null);
  const [commentsIsLoading, setCommentsIsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  async function fetchPost() {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      setPostObj(response.data);
    } catch (err) {
      setError(err);
    }
  }

  async function fetchComments() {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      );
      setComments(response.data);
    } catch (err) {
      setCommentsError(err);
    }
  }

  useEffect(() => {
    if (isLoading) {
      fetchPost();
      setIsLoading(false);
    }
    if (commentsIsLoading) {
      fetchComments();
      setCommentsIsLoading(false);
    }

    return () => {
      setIsLoading(true);
      setCommentsIsLoading(true);
    };
  }, []);

  return (
    <main>
      <Hero />
      <div className="container">
        <section className="posts">
          <Link to="/">
            <img src="/left-arrow.svg" alt="" />
          </Link>
          {!postObj ? (
            <h3 style={{ textAlign: "center" }}>Loading article...</h3>
          ) : error ? (
            <h3 style={{ textAlign: "center" }}>{error}</h3>
          ) : (
            <>
              <h2 style={{ fontSize: "20px" }}>{postObj.title}</h2>
              <p>{postObj.body}</p>
              <hr style={{ margin: "20px 0" }} />
              <section className="comments">
                {!comments ? (
                  <h3 style={{ textAlign: "center" }}>Loading articles...</h3>
                ) : commentsError ? (
                  <h3 style={{ textAlign: "center" }}>{error}</h3>
                ) : (
                  comments.map((comment) => {
                    return (
                      <div key={comment.id} className="comment">
                        <h3>{comment.name}</h3>
                        <p>{comment.body}</p>
                      </div>
                    );
                  })
                )}
              </section>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default Post;
