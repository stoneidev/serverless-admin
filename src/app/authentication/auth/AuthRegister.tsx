import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";
import { signUp } from "aws-amplify/auth";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const { userId } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      console.log("User successfully registered:", userId);
      // Here you can redirect the user or show a success message
    } catch (error: any) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField
            id="name"
            variant="outlined"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            fullWidth
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            fullWidth
          />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="/authentication/login"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
