import { useEffect, useState } from "react";
import { deletePost, viewUserPost } from "../../managers/posts";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByToken } from "../../managers/tokens";



export const UserPost = () => {
  const [userPosts, setUserPosts] = useState([]); // Change 'posts' to 'userPosts'
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [currentUser, setCurrentUser]= useState()
  const [filteredUser, setFilterUser] = useState([])


  const navigate = useNavigate()
  const { postId } = useParams()


  useEffect(() => {
    viewUserPost({ token }).then((postsData) => setUserPosts(postsData)); // Pass token as an object
  }, [token]);

      useEffect(() => {
        if (token) {
            getUserByToken(token).then(data => setCurrentUser(data.user))
        }
    }, [token])



  useEffect(() => {
    const postsByCurrentUser = userPosts.filter(
      (postByAuthor) =>
        postByAuthor.user.id === currentUser.id
    );
    setFilterUser(postsByCurrentUser);
  }, [userPosts, currentUser]);
  
  

  const deleteButton = (postId) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm("Are you sure you want to delete this post?");
      if (shouldDelete) {
        deletePost(postId).then(() => {
          setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        });
      }
    };

    return (
      <button onClick={handleDelete}>
        Delete
      </button>
    );
  };


  const editButton = (post) => {
    return (
      <button onClick={() => { navigate(`/my-posts/${post.id}/edit`) }}>
        Edit
      </button>
    )
  }


  return (
    <div style={{ margin: "0rem 3rem" }}>
      <h1>My Posts</h1>
      <article className="posts">
        {filteredUser.map((post) => {
          return (
            <section className="post" key={post.id}>
              <div>==============================</div>
              <div> Author: {post?.user?.full_name}</div>
              <div>Title: {post.title}</div>
              <div>Category: {post?.category?.label}</div>
              <div>Date: {post.publication_date}</div>
              <footer>{deleteButton(post.id)}</footer>
              <footer>{editButton(post)}</footer>

            </section>
          );
        })}
      </article>
    </div>
  );
};