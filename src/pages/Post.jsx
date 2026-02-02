import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero.jsx";

function Post() {
  const id = useParams().id;

  const [postObj, setPostObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (isLoading) {
      fetchPost();
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Hero />
      <div className="container">
        <section className="posts">
        <Link to='/' end><img src="/left-arrow.svg" alt="" /></Link>
          {isLoading ? (
            <h3 style={{ textAlign: "center" }}>Loading articles...</h3>
          ) : error ? (
            <h3 style={{ textAlign: "center" }}>{error}</h3>
          ) : (
            <>
            <h2 style={{ fontSize: "20px" }}>{postObj.title}</h2>
            <p>{postObj.body}</p>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default Post;
