import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  InfoCreatePage,
  InfoDetailPage,
  InfoEditPage,
  InfoListPage,
} from "./pages/Info";
// import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
// import AuthGuard from "./auth/AuthGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ルートにアクセスしたら必ず/loginにリダイレクト */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          {/* info関連のルート */}
          <Route path="/info" element={<InfoListPage />} />
          <Route path="/info/create" element={<InfoCreatePage />} />
          <Route path="/info/:id/detail" element={<InfoDetailPage />} />
          <Route path="/info/:id/edit" element={<InfoEditPage />} />
          {/* それ以外 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
