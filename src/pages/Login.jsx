import React, { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loginError, setLoginErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({ mode: "onSubmit" });

  // Save auth info in cookies (2 hours)
  const saveUserToCookies = (user, token) => {
    Cookies.set("uid", user.uid, { expires: 1 / 12 });
    Cookies.set("accessToken", token, { expires: 1 / 12 });
    Cookies.set("displayName", user.displayName || "", { expires: 1 / 12 });
    Cookies.set("profileURL", user.photoURL || "", { expires: 1 / 12 });
  };

  const onSubmit = async (data) => {
    try {
      setLoginErrors("");
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = res.user;
      const token = await user.getIdToken();

      saveUserToCookies(user, token);
      login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        accessToken: token,
      });

      navigate("/");
    } catch (error) {
      console.log(error.message);
      setLoginErrors("Invlaid email or password. Please try again!!")
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoginErrors("");
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const token = await user.getIdToken();

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          provider: "google",
          lastLogin: new Date(),
        },
        { merge: true }
      );

      saveUserToCookies(user, token);
      login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        accessToken: token,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setLoginErrors("Failed to login with Google. Please try again!!")
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>

        {/* Error messages */}
        {loginError && <div className="password-input-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    {...register("password", {
      required: "Password is required.",
      minLength: {
        value: 8,
        message: "Password must be 8 characters long",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must contain 1 uppercase, 1 lowercase, 1 number & 1 special character",
      },
    })}
  />
  <span
    className="password-toggle-icon"
    onClick={() => setShowPassword((prev) => !prev)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>}

        {isSubmitted && Object.keys(errors).length > 0 && (
          <div className="form-errors">
            {errors.email && <p>{errors.email.message}</p>}
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="google-btn" onClick={signInWithGoogle}>
          <FaGoogle size={14} /> Continue with Google
        </button>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
