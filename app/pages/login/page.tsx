"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { Token } from "@/models/token";

export default function AuthPage() {
  const { loginEmailPassword, registerEmailPassword } = useAuth();

  // --- Login state ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // --- Register state ---
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  // --- Handlers ---
  const handleLogin = () => {
    setError(null);
    loginEmailPassword.mutate(
      { email: loginEmail, password: loginPassword },
      {
        onSuccess: (token: Token) => {
          console.log("Logged in, access token:", token);
        },
        onError: (err: unknown) => {
          console.error(err);
          setError((err as Error).message || "Login failed");
        },
      }
    );
  };

  const handleRegister = () => {
    setError(null);
    registerEmailPassword.mutate(
      { 
        username: registerUsername, 
        password: registerPassword,
        email: registerEmail,
      },
      {
        onSuccess: () => {
          console.log("Registered Successfully");
        },
        onError: (err: unknown) => {
          console.error(err);
          setError((err as Error).message || "Register failed");
        },
      }
    );
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
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      <Stack spacing={2} mb={4}>
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
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={loginEmailPassword.isPending}
        >
          {loginEmailPassword.isPending ? "Logging in..." : "Login"}
        </Button>
      </Stack>

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
        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
          disabled={registerEmailPassword.isPending}
        >
          {registerEmailPassword.isPending ? "Registering..." : "Register"}
        </Button>
      </Stack>
    </Box>
  );
}
