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
import { UserDetail } from "../components/users/UserDetail"
import { PostComments } from "../components/comments/PostComments"
import { CommentForm } from "../components/comments/CommentForm"


import { ReactionList } from "../components/reactions/reactionList.js"

//import { SubscribedUserPosts } from "../components/subscriptions/ViewSubscribedUserPosts"


export const AuthorViews = ({ token, setToken}) => {
  return <>
    <Routes>
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<PostList/>}  />

        <Route path="/tags" element={<TagList />}  />
        <Route path="/posts" element={<PostList />}  />
        <Route path="/my-posts" element={<UserPost token={token}/>}  />
        <Route path="/posts/:postId" element={<PostDetails />}  />
        <Route path="/categories" element={<CategoryList />}  />
        <Route path="/comments/:postId" element={<PostComments token={token}/>}  />
        <Route path="/reactions" element={<ReactionList token={token}/>}  />
        <Route path="/commentform/:postId" element={<CommentForm token={token}/>}  />
        
        <Route path="/users"> 
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserDetail token={token}/>} />
        </Route>
        <Route path="/postform" element={<PostForm token={token}/>}  />
        <Route path="/my-posts/:postId/edit" element={<PostEdit />}  />
 

      </Route>
    </Routes>
  </>
}
