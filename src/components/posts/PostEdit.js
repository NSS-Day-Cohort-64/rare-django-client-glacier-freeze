import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../managers/categories";

export const PostEdit = () => {
    const [categories, setCategories] = useState([])

    const [newPost, setPost] = useState({
        user: 0,
        category: 0,
        title: "",
        publication_date: new Date().toISOString().split('T')[0],
        image_url: "",
        content: "",
        approved: 0
    })

    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch comment data when the component mounts
        fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setPost(data); // Update the state with the fetched comment data
            });
    }, []);

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setCategories(categoryList);
            });
    }, []);

    const changePostState = (domEvent) => {
        // Update the specific field in the newComment state
        const updatedPost = { ...newPost };
        updatedPost[domEvent.target.name] = domEvent.target.value;
        setPost(updatedPost);
    }

    return (
        <form className="PostForm">
            <h2 className="postFormHeader">Edit a Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="postTitle">Title:</label>
                    {/* Use the correct 'name' attribute and value from the state */}
                    <input
                        required autoFocus
                        name="title"
                        type="text"
                        className="form-control"
                        placeholder="THINK OF A FUN TITLE"
                        value={newPost?.title}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category" className="label-bold">Category:</label>
                    {/* Use the correct 'name' attribute and value from the state */}
                    <select
                        name="category"
                        value={newPost?.category}
                        onChange={changePostState}
                        className="form-control"
                    >
                        <option value="0">Select Your Category</option>
                        {categories.map((category) => (
                            <option
                                key={`categoryType--${category?.id}`}
                                value={category?.id}
                            >
                                {category?.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imagePost" className="imagePost">Image:</label>
                    <input
                        required autoFocus
                        name="imgurl"
                        type="text"
                        className="form-control"
                        value={newPost?.image_url}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content" className="contentPost">Content:</label>
                    <input
                        required autoFocus
                        name="content"
                        type="text"
                        className="form-control"
                        value={newPost?.content}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault(); // Prevent form submission
                    const postUpdate = {
                        user: parseInt(newPost?.user),
                        category: parseInt(newPost?.category?.id), 
                        title: newPost?.title,
                        publication_date: newPost?.publication_date,
                        image_url: newPost?.image_url,
                        content: newPost?.content,
                        approved: newPost?.approved

                    }
                    // Send the updated comment data to the server
                    fetch(`http://localhost:8000/posts/${postId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${localStorage.getItem("auth_token")}`
                        },
                        body: JSON.stringify(postUpdate)
                    })
                        .then(() => {
                            navigate(`/posts/${postId}`)
                        })
                }}
                className="btn btn-primary"
            >
                Save
            </button>
            <button onClick={() => navigate(`/posts/${postId}`)}> Cancel </button>
        </form>
    );
};