import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import HomePage from "../pages/Home/HomePage";
import SignupPage from "../pages/Signup/SignupPage";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/Login/LoginPage";

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            index
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </>
  );
}
