import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Homepage";
import Mypage from "../pages/Mypage";
import Festivallistpage from "../pages/Festivallistpage";
import Festivaldetailpage from "../pages/Festivaldetailpage";
import Searchpage from "../pages/Searchpage";
import Postlistpage from "../pages/Postlistpage";
import Postpage, { PostNewPage, PostEditPage } from "../pages/Postpage";
import Loginpage from "../pages/Loginpage";
import Signuppage from "../pages/Signuppage";
import Reviewlistpage from "../pages/Reviewlistpage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/festivals" element={<Festivallistpage />} />
          <Route path="/festivals/:id" element={<Festivaldetailpage />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/community" element={<Postlistpage />} />
          <Route path="/community/new" element={<PostNewPage />} />
          <Route path="/community/:id" element={<Postpage />} />
          <Route path="/community/:id/edit" element={<PostEditPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/reviews" element={<Reviewlistpage />} />
        </Route>

        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;