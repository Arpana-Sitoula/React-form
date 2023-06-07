import { useState } from "react";
import Login from "../molecules/Login";
import SignUp from "../molecules/SignUp";
import { Button, ButtonGroup, Container, Box } from "@chakra-ui/react";

const UserAuth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [logActive, setLogActive] = useState("gray");
  const [signActive, setSignActive] = useState("gray");

  const handleLogin = () => {
    setIsRegister(true);
    setLogActive("red");
    setSignActive("gray");
  };
  const handleSignin = () => {
    setIsRegister(false);
    setSignActive("green");
    setLogActive("gray");
  };

  return (
    <Container centerContent>
      <Box>
        <ButtonGroup>
          <Button colorScheme={logActive} onClick={handleLogin}>
            Login
          </Button>
          <Button colorScheme={signActive} onClick={handleSignin}>
            Signup
          </Button>
        </ButtonGroup>
        {!isRegister && <SignUp />}
        {isRegister && <Login />}
      </Box>
    </Container>
  );
};

export default UserAuth;
