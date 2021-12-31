import { Box, Button, TextField } from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { CryptoState } from "../../CryptoContext";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${auth?.currentUser?.displayName}`,
        type: "success",
      });
      handleClose();
      //   console.log("Login data", result);
      //   console.log(auth.currentUser);
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

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
