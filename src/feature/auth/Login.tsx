import { Button, Form, Input, Modal, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../constant/Path";
import { login } from "./api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./slice/authSlice";
import { styled } from "styled-components";
import { CreateModal } from "./CreateModal";

type TProps = {
  onLoginSuccess: () => void;
};

export const Login = ({ onLoginSuccess }: TProps): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await login({
        username,
        password,
      });
      dispatch(setUser(response.user));
      onLoginSuccess();
      navigate(Path.TECH_ARTICLE);
      setIsModalOpen(false);
    } catch (err) {
      setError("失敗：ユーザー名またはパスワードに誤りがあります");
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="ログイン"
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        footer={[]}
        maskClosable={false}
      >
        <StyledForm onFinish={handleLogin}>
          <StyledFormItem
            label="ユーザー名"
            name="username"
            rules={[
              {
                required: true,
                message: "ユーザー名を入力してください", // 未入力時に表示するメッセージ
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </StyledFormItem>
          <StyledFormItem
            label="パスワード"
            name="password"
            rules={[
              {
                required: true,
                message: "パスワードを入力してください", // 未入力時に表示するメッセージ
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledFormItem>
          <StyledButtonContainer>
            <StyledButton htmlType="submit">ログイン</StyledButton>
            <div>または</div>
            <StyledButton
              htmlType="button"
              onClick={() => setIsCreateModalOpen(true)}
            >
              新規作成
            </StyledButton>
          </StyledButtonContainer>
        </StyledForm>
        {error && <StyledError>{error}</StyledError>}
      </Modal>
      {isCreateModalOpen && (
        <CreateModal
          isOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen}
          api={api}
        />
      )}
    </>
  );
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 20px auto;
`;

const StyledFormItem = styled(FormItem)`
  width: 300px;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  width: 100px;
  margin: 0 auto;
`;

const StyledError = styled.p`
  margin: 0;
  padding: 0;
  color: red;
  text-align: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;
