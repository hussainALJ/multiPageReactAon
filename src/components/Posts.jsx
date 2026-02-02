import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

function Posts() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchArticles() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );
      setArticles(response.data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isLoading) {
      fetchArticles();
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="container">
      <section className="posts">
        <div className="flex" style={{justifyContent: "space-between"}}>
            <h2 style={{ fontSize: "20px" }}>Articles</h2>
            <Link to='/add-post'><img src="/plus-icon.svg" alt="" width='24px' /></Link>
        </div>
        {isLoading ? (
          <h3 style={{ textAlign: "center" }}>Loading articles...</h3>
        ) : error ? (
          <h3 style={{ textAlign: "center" }}>{error}</h3>
        ) : (
          <div className="articles">
            {articles.map((article) => {
              return (
                <div key={article.id} className="article flex">
                  <hr />
                  <Link to={`/${article.id}`}>
                    <h3>{article.title}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Posts;
