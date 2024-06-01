import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../constant/Path";
import { login } from "./api/login";
import { useDispatch } from "react-redux";
import { setUser } from "./slice/authSlice";

type TProps = {
  onLoginSuccess: () => void;
};

export const Login = ({ onLoginSuccess }: TProps): React.JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await login({
        username,
        password,
      });
      dispatch(setUser(response.user));
      onLoginSuccess();
      navigate(Path.TECH_ARTICLE);
    } catch (err) {
      setError("ログインに失敗しました");
    }
  };
  return (
    <Form onFinish={handleLogin}>
      <FormItem>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormItem>
      <Button htmlType="submit">ログイン</Button>
      {error && <p>{error}</p>}
    </Form>
  );
};
