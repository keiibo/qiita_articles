import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import React from "react";

const Login = (): React.JSX.Element => {
  const handleLogin = async () => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      username: "example",
      password: "password",
    });
    return res.data;
  };
  return (
    <Form>
      <FormItem>
        <Input />
        <Input />
        <Button onClick={handleLogin}>ログイン</Button>
      </FormItem>
    </Form>
  );
};

export default Login;
