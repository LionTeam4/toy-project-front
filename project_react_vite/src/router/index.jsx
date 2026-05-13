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
import SignupProfile from "../pages/SignupProfile";
import SignupFestival from "../pages/SignupFestival";
import Reviewlistpage from "../pages/Reviewlistpage";
import Reviewdetailpage from "../pages/Reviewdetailpage";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          {/* 로그인 없이 접근 가능 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/festivals" element={<Festivallistpage />} />
          <Route path="/festivals/:id" element={<Festivaldetailpage />} />
          <Route path="/search" element={<Searchpage />} />

          {/* 로그인 필요 */}
          <Route path="/community" element={
            <ProtectedRoute><Postlistpage /></ProtectedRoute>
          } />
          <Route path="/community/new" element={
            <ProtectedRoute><PostNewPage /></ProtectedRoute>
          } />
          <Route path="/community/:id" element={
            <ProtectedRoute><Postpage /></ProtectedRoute>
          } />
          <Route path="/community/:id/edit" element={
            <ProtectedRoute><PostEditPage /></ProtectedRoute>
          } />
          <Route path="/mypage" element={
            <ProtectedRoute><Mypage /></ProtectedRoute>
          } />
          <Route path="/reviews" element={
            <ProtectedRoute><Reviewlistpage /></ProtectedRoute>
          } />
          <Route path="/reviews/new" element={
            <ProtectedRoute><PostNewPage /></ProtectedRoute>
          } />
          <Route path="/reviews/:id" element={
            <ProtectedRoute><Reviewdetailpage /></ProtectedRoute>
          } />

        </Route>

        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/signup/profile" element={<SignupProfile />} />
        <Route path="/signup/festival" element={<SignupFestival />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;