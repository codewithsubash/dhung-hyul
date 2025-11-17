import { Route, Routes } from "react-router-dom";

import BlogCreateScreen from "../../screens/App/CRM/Blog/BlogCreateScreen";
import NotFoundScreen from "../../screens/NotFoundScreen";
import BlogListScreen from "../../screens/App/CRM/Blog/BlogListScreen";
import BlogEditScreen from "../../screens/App/CRM/Blog/BlogEditScreen";
import BlogDetailScreen from "../../screens/App/CRM/Blog/BlogDetailScreen";

const BlogRouter = () => {
  return (
    <Routes>
      <Route path="create" element={<BlogCreateScreen />} />
      <Route path="list" element={<BlogListScreen />} />
      <Route path=":id/edit" element={<BlogEditScreen />} />
      <Route path=":id/detail" element={<BlogDetailScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default BlogRouter;
