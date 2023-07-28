import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { TagList } from '../components/tag/TagList'
import { Authorized } from "./Authorized"
import { PostList } from "../components/posts/PostList"
import { UserPost } from "../components/posts/UserPost"
import { PostDetails } from "../components/posts/PostDetails"
import { CategoryList } from "../components/Categories/CategoryList"
import { UserList } from "../components/users/UserList"
import { PostForm } from "../components/posts/PostForm"
import { PostEdit } from "../components/posts/PostEdit"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>

        <Route path="/tags" element={<TagList />}  />
        <Route path="/posts" element={<PostList />}  />
        <Route path="/my-posts" element={<UserPost token={token}/>}  />
        <Route path="/posts/:postId" element={<PostDetails />}  />
        <Route path="/categories" element={<CategoryList />}  />
        <Route path="/users" element={<UserList />}  />
        <Route path="/postform" element={<PostForm token={token}/>}  />
        <Route path="/my-posts/:postId/edit" element={ <PostEdit token={token} /> } />



      </Route>
    </Routes>
  </>
}
