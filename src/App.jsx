import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./layout/Home";
import ErrorPage from "./layout/Error";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./pages/user/Dashboard";
import ProtectedRoute from "./pages/user/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="pages" element={<Outlet />}>
          <Route path="user" element={<Outlet />}>
            <Route path="in" element={<Outlet />}>
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
