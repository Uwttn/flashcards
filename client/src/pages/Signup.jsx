import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
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

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
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
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      navigate("/welcome");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex align="center" justify="center" height="70vh">
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxWidth="400px"
        width="100%"
      >
        <Heading as="h2" mb={6} textAlign="center" color="#63b6c3">
          Sign Up
        </Heading>
        <form onSubmit={handleFormSubmit}>
          <FormControl id="username" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeholder="Enter your username"
              bg="gray.50"
              _placeholder={{ color: "gray.500" }}
              required
            />
          </FormControl>

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
          Already have an account?{" "}
          <Text as="span" color="teal.500">
            <Link to="/login">Login</Link>
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
