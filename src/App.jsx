import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { Error404, dashboardPages } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.scss";
import store from "store";
import setUpInterceptor from "lib/axios-interceptors";
import { currentTokenDispatch } from "store/Slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = React.lazy(() => import("./pages/sign-up/SignUp.page"));
const SignIn = React.lazy(() => import("./pages/sign-in/SignIn.page"));
const ForgotPassword = React.lazy(() =>
  import("./pages/forgot-password/ForgotPassword.page")
);
const ResetPassword = React.lazy(() =>
  import("./pages/reset-password/ResetPassword.page")
);
const MultiFactor = React.lazy(() =>
  import("./pages/multi-factor/MultiFactor.pages")
);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  setUpInterceptor({ store, navigate });

  // const { maintenance, maintenanceDetails, suspended } = useSelector(
  //     (state) => state.settings
  // );

  const isLoggedIn = false;
  return (
    <div className="flex items-center content-center bg-custom-main">
      <ToastContainer />
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-screen h-screen">
            <Spin spinning size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" />} />
          <Route
            path="/sign-in"
            element={
              // isLoggedIn ? (
              //     <Navigate to="/admin/dashboard" />
              // ) : (
              //      <Navigate to= "/admin/sign-in"/>
              // )
              <SignIn />
            }
          />
          <Route
            path="/sign-up"
            element={
              // isLoggedIn ? <Navigate to="/admin/dashboard" /> : <SignUp/>
              <SignUp />
            }
          />
          <Route
            path="/reset-password"
            element={
              // suspended ? (
              //     <Navigate to="/admin/account-suspended" />
              // ) : isLoggedIn ? (
              //     <Navigate to="/admin/dashboard" />
              // ) : (
              //     <ResetPassword />
              // )
              <ResetPassword />
            }
          />
          <Route
            path="/forgot-password"
            element={
              // suspended ? (
              //     <Navigate to="/admin/account-suspended" />
              // ) : isLoggedIn ? (
              //     <Navigate to="/admin/dashboard" />
              // ) : (
              //     <ForgotPassword />
              // )
              <ForgotPassword />
            }
          />
          <Route
            path="/multi-factor-authentication"
            element={
              // suspended ? (
              //     <Navigate to="/admin/account-suspended" />
              // ) : isLoggedIn ? (
              //     <Navigate to="/admin/dashboard" />
              // ) : (
              //     <ConfirmOtp />
              // )
              <MultiFactor />
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <Routes>
                {dashboardPages.map(({ path, Component }) => (
                  <Route
                    key={path}
                    path={`${path}`}
                    index={path === "/"}
                    element={<Component />}
                  />
                ))}
              </Routes>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
