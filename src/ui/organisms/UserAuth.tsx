import { useState } from "react";
import Login from "../molecules/Login";
import SignUp from "../molecules/SignUp";
import { Button } from "@chakra-ui/react";

const UserAuth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = () => {
    setIsRegister(true);
  };
  const handleSignin = () => {
    setIsRegister(false);
  };

  return (
    <div>
      <div>
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleSignin}>Signup</Button>
      </div>
      {isRegister && <SignUp />}
      {!isRegister && <Login />}
    </div>
  );
};

export default UserAuth;
