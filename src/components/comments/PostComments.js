import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPost, del, deleteComment } from "../../managers/comments"
import { getPostById } from "../../managers/posts"
import { getUserByToken } from "../../managers/tokens";

export const PostComments = () => {
    const { postId } = useParams()
    const [ comments, setComments ] = useState([])
    const [post, setPost] = useState({})
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [currentUser, setCurrentUser]= useState()

    const navigate = useNavigate()

    useEffect(() => {
        if (postId) {
            getCommentsByPost(postId).then(foundComments => setComments(foundComments))
            getPostById(postId).then(PostDetails => setPost(PostDetails))
        }
    }, [postId])

    useEffect(() => {
      if (token) {
          getUserByToken(token).then(data => setCurrentUser(data.user))
      }
  }, [token])

    const deleteButton = (comment) => {
        return (
          <button
            onClick={() => {
              deleteComment(comment.id).then(() => {
                getCommentsByPost(postId).then(foundComments => setComments(foundComments));
              });
            }}
            className="submission__delete small-button"
          >
            Delete
          </button>
        );
      }


    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>Comments for "{post.title}"</h1>
            {
                comments.map(comment => {
                    return <section className="comment" key={`comment--${comment.id}`}>
                    <div>==============================</div>
                    <div>Comment: {comment.content}</div>
                    <div>User: {comment.author.full_name}</div>
                    {comment.author.id === currentUser.id ? (
                        deleteButton(comment)
                    )
                    : (<div></div>)}
                </section>
                })
            }
            <button onClick = {()=> {navigate(`/commentform/${postId}`)}}>Add Comment</button>

        </div>
    )


}
