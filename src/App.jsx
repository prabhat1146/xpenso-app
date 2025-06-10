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
import Expense from "./pages/user/Expense";
import AddNew from "./pages/user/AddNew";
import ExpenseAnalysis from "./pages/user/ExpenseAnalysis";
import Profile from "./pages/user/Profile ";
import Settings from "./pages/user/Setting";
import Rating from "./components/Rating";
import Contact from "./components/Contact";
import AboutUs from "./pages/legal/AboutUs";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy ";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import RefundPolicy from "./pages/legal/RefundPolicy";
import Disclaimer from "./pages/legal/Disclaimer";

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
                <Route path="expense" element={<Expense />} />
                <Route path="expense-analysis" element={<ExpenseAnalysis />} />
                <Route path="add-new" element={<AddNew />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="rating" element={<Rating />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="legal" element={<Outlet />}>
            <Route path="about-us" element={<AboutUs />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="disclaimer" element={<Disclaimer />} />
          </Route>
          <Route path="contact-us" element={<Contact />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
