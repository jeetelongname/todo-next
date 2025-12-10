"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

export default function AuthPage() {
  // --- Login state ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // --- Register state ---
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");

  // --- Error / Loading ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Handlers ---
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      // TODO: Call your login API
      console.log("Logging in", { loginEmail, loginPassword });
      // Example: await loginWithEmailPassword(loginEmail, loginPassword);
    } catch (err) {
      console.error(err)
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    try {
      // TODO: Trigger Google OAuth flow
      console.log("Login with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithMagicLink = async () => {
    setLoading(true);
    try {
      // TODO: Send magic link to email
      console.log("Login with magic link", loginEmail);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      // TODO: Register user with email/password/username
      console.log("Registering", { registerEmail, registerPassword, registerUsername });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterWithGoogle = async () => {
    setLoading(true);
    try {
      console.log("Register with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterWithMagicLink = async () => {
    setLoading(true);
    try {
      console.log("Register with magic link", registerEmail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 6,
        p: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {/* --- LOGIN SECTION --- */}
      <Typography variant="h5" mb={2}>
        Login
      </Typography>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      <Stack spacing={2} mb={2}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <Button variant="contained" fullWidth onClick={handleLogin} disabled={loading}>
          Login
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleLoginWithGoogle}
          disabled={loading}
        >
          Login with Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleLoginWithMagicLink}
          disabled={loading || !loginEmail}
        >
          Login with Magic Link
        </Button>
      </Stack>

      <Divider sx={{ my: 4 }}>or Register</Divider>

      {/* --- REGISTER SECTION --- */}
      <Typography variant="h5" mb={2}>
        Register
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Username"
          fullWidth
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <Button variant="contained" fullWidth onClick={handleRegister} disabled={loading}>
          Register
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleRegisterWithGoogle}
          disabled={loading}
        >
          Register with Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleRegisterWithMagicLink}
          disabled={loading || !registerEmail}
        >
          Register with Magic Link
        </Button>
      </Stack>
    </Box>
  );
}
