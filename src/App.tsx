import React from "react";
import UserListPage from "./pages/UserListPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users?page=1" />} />
      <Route index path="/users" element={<UserListPage />} />
      <Route path="/users/:userId" element={<UserPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
