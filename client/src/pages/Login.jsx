import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      if (data?.login?.token) {
        Auth.login(data.login.token);
        navigate("/welcome");
      }
    } catch (e) {
      console.error(e);
    }

    setFormState({ email: "", password: "" });
  };

  return (
    <Flex align="center" justify="center" height="54vh">
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxWidth="400px"
        width="100%"
      >
        <Heading as="h2" mb={6} textAlign="center" color="#63b6c3">
          Login
        </Heading>
        <form onSubmit={handleFormSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Enter your email"
              bg="gray.50"
              _placeholder={{ color: "gray.500" }}
              required
            />
          </FormControl>

          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Enter your password"
              bg="gray.50"
              _placeholder={{ color: "gray.500" }}
              required
            />
          </FormControl>

          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error.message}
            </Alert>
          )}

          <Button
            type="submit"
            bg="#63b6c3"
            color="white"
            _hover={{ bg: "#5aaab5" }}
            size="lg"
            width="100%"
            mb={4}
          >
            Submit
          </Button>
        </form>
        <Text textAlign="center">
          Don't have an account?{" "}
          <Text as="span" color="teal.500">
            <Link to="/signup">Sign up</Link>
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
