import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../managers/posts"
import { useEffect, useState } from "react"
import { getUsers } from "../../managers/users"
import { getCategories } from "../../managers/categories"
import { Link } from "react-router-dom"


export const PostDetails = () => {
    const { postId } = useParams()
    const [ post, setPost ] = useState({})
    const [ users, setUsers ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getUsers().then(usersData => setUsers(usersData))
    }, [])


    useEffect(() => {
        if (postId) {
            getPostById(postId).then(PostDetails => setPost(PostDetails))
        }
    }, [postId])




    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>{post?.title}</h1>
            <article className="postDetails">
                <img src={post?.image_url} />
                <div>{post?.content}</div>
                <div>Date: {post?.publication_date}</div>
                <div>Author: <Link to={`/users/${post?.user?.id}`}>{post?.user?.full_name}</Link></div>
            </article>
            <button onClick = {()=> {navigate(`/comments/${postId}`)}}>View Comments</button>
            <button onClick = {()=> {navigate(`/commentform/${postId}`)}}>Add Comment</button>
        </div>
    )
}