import React, { useEffect, useState } from "react";
import { getPosts, getPostsByApproval, getPostsByTag} from "../../managers/posts";
import { getUsers } from "../../managers/users";
import { getCategories } from "../../managers/categories";
import { Link } from "react-router-dom";
import { getTags } from "../../managers/TagManager";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: 0,
    userId: 0,
    title: "",
    tagId: 0,
    approved: false
  });
  const [titleInput, setTitleInput] = useState(""); // New state to track the input field value

  useEffect(() => {
    getPostsByApproval().then((postsData) => setPosts(postsData));
    getUsers().then((usersData) => setUsers(usersData));
    getCategories().then((categoriesData) => setCategories(categoriesData));
    getTags().then((tagData) => setTags(tagData));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, posts]);

  const applyFilters = () => {
    let filteredResults = posts;

    if (filters.categoryId !== 0) {
      filteredResults = filteredResults.filter(
        (post) => post.category_id === filters.categoryId
      );
    }
 

    if (filters.userId !== 0) {
      filteredResults = filteredResults.filter(
        (post) => post.user_id === filters.userId
      );
    }

    if (filters.title.trim() !== "") {
      filteredResults = filteredResults.filter((post) =>
        post.title.toLowerCase().includes(titleInput.toLowerCase())
      );
    }

    if (filters.tagId !== 0) {
      getPostsByTag(filters.tagId).then((posts) => setFilteredPosts(posts))
    }

    setFilteredPosts(filteredResults);
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setFilters({ ...filters, categoryId });
  };

  const handleAuthorChange = (event) => {
    const userId = parseInt(event.target.value);
    setFilters({ ...filters, userId });
  };

  const handleTagChange = (event) => {
    const tagId = parseInt(event.target.value)
    setFilters({ ...filters, tagId });
  };

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value); // Update the title input state
  };

  const handleTitleSubmit = () => {
    setFilters({ ...filters, title: titleInput }); // Update the title filter
  };

  const handleApprovePost = (postId) => {
  // Assuming you have a function to update the post's approval status
  // Replace this with your actual function to update the post's approval status
  updatePostApproval(postId).then(() => {
    // Once the approval status is updated on the server, update the state
    // Find the post in the filteredPosts array and update its approval status
    const updatedFilteredPosts = filteredPosts.map((post) => {
      if (post.id === postId) {
        return { ...post, approved: true };
      }
      return post;
    });

    setFilteredPosts(updatedFilteredPosts);
  });
};


  return (
    <div style={{ margin: "0rem 3rem" }}>
      <h1>Posts</h1>
      <div className="form-group">
        <label htmlFor="category">Category: </label>
        <select name="category" className="form-control" onChange={handleCategoryChange}>
          <option value={0}>Select a category</option>
          {categories.map((category) => (
            <option key={`catFilter--${category.id}`} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>

        <label htmlFor="filterByUser">Author: </label>
        <select name="filterByUser" className="form-control" onChange={handleAuthorChange}>
          <option value={0}>Filter By Author</option>
          {users.map((user) => (
            <option key={`userFilter--${user.id}`} value={user.id}>
              {user.first_name} {user.last_name}
            </option>
          ))}
        </select>
        

        <div>
          <input type="text" value={titleInput} onChange={handleTitleChange} />
          <button onClick={handleTitleSubmit}>Search</button>
        </div>
      </div>
            
        <label htmlFor="tag">Tag: </label>
        <select name="tag" className="form-control" onChange={handleTagChange}>
          <option value={0}>Select a tag</option>
          {tags.map((tag) => (
            <option key={`tagFilter--${tag.id}`} value={tag.id}>
              {tag.label}
            </option>
          ))}
        </select>

      <article className="posts">
        {filteredPosts.map((post) => {
          return (
            <section className="post" key={`postList--${post.id}`}>
              <div>==============================</div>
              <div>
                Post Title: <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
              <div>
                Author: <Link to={`/users/${post?.user?.id}`}>{post?.user?.full_name}</Link>
              </div>
              <div>Category: {post?.category?.label}</div>
              <button onClick={() => handleApprovePost(post.id)}>
Approve Post</button>
            </section>
            
          );
        })}
      </article>
    </div>
  );
};
