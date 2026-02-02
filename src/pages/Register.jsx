import React, { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [registerError, setRegisterError] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({ mode: "onChange" });

  const saveUserToCookies = (user, accessToken) => {
    Cookies.set("uid", user.uid, { expires: 1 / 12 });
    Cookies.set("accessToken", accessToken, { expires: 1 / 12 });
    Cookies.set("displayName", user.displayName || "", { expires: 1 / 12 });
    Cookies.set("profileURL", user.photoURL || "", { expires: 1 / 12 });
  };

  const SignInWithGoogle = async () => {
    try {
      setRegisterError("");
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
          createdAt: new Date(),
        },
        { merge: true }
      );

      saveUserToCookies(user, token);
      login({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accessToken: token,
      })
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setRegisterError("Error signing up. Please try again!!")
    }
  };

  const onSubmit = async (data) => {
    try {
      setRegisterError("");
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = res.user;
      const token = await user.getIdToken();

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        provider: "password",
        createdAt: new Date(),
      });

      saveUserToCookies(user, token);
      login({
        uid: user.uid,
        displayName: data.name,
        email: data.email,
        photoURL: "",
        accessToken: token,
      })
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setRegisterError("Email already taken. Please try another email!!")
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register</h2>

        {registerError && <div className="form-errors">{registerError}</div>}
        {isSubmitted && Object.keys(errors).length > 0 && (
          <div className="form-errors">
            {errors.name && <p>{errors.name.message}</p>}
            {errors.email && <p>{errors.email.message}</p>}
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Please enter your name first." })}
          />

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
             })}
          />

          <div className="password-input-wrapper">
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
          </div>

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="google-btn" onClick={SignInWithGoogle}>
          <FaGoogle /> Continue with Google
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
