import { Box, Button, TextField } from "@material-ui/core";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { CryptoState } from "../../CryptoContext";

const Signup = ({ handleClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert, user } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(auth.currentUser);
      setAlert({
        open: true,
        message: `Welcome ${user.displayName}. Please confirm your email`,
        type: "success",
      });

      await updateProfile(auth.currentUser, {
        displayName: fullName.split(" ")[0],
      });

      //   setAlert({
      //     open: true,
      //     message: `Sign up Successful. Welcome ${auth?.currentUser?.displayName}`,
      //     type: "success",
      //   });
      //   handleClose();
      //   console.log("userDetail", result);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="text"
        label="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
      />

      <TextField
        variant="outlined"
        type="email"
        label="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
