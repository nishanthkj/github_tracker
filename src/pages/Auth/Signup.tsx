import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/useAppSelector";
import { signup } from "../../features/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await dispatch(signup({ username, email, password }));
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setUsername("");
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="w-screen-md text-xl text-center font-bold cursor-pointer mb-6">
          SignUp with
          <h4 className="text-4xl">GitHub Tracker</h4>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            className="mt-4"
          >
            {isLoading && (
              <CircularProgress className="mr-3" size={24} color="inherit" />
            )}
            Sign Up
          </Button>
        </form>
        <Typography className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Signup;
