import { Button, Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import styled from "styled-components";
import { createAccount } from "./api/auth";
import { TCreateAccountReq } from "./api/type/TCreateAccountReq";
import { useMutation } from "react-query";

type TProps = {
  isOpen: boolean;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateModal = ({
  isOpen,
  setIsCreateModalOpen,
}: TProps): React.JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const postMutation = useMutation(createAccount);

  const handleSubmit = () => {
    const req: TCreateAccountReq = {
      username,
      password,
    };
    console.log(req);

    postMutation.mutate(req, {
      onSuccess: (data) => {
        console.log("Article posted successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to post article:", error);
      },
    });
  };

  return (
    <Modal
      title="アカウントを新規作成する"
      open={isOpen}
      onCancel={() => setIsCreateModalOpen(false)}
      footer={[]}
    >
      <StyledForm labelWrap labelCol={{ span: 6 }} onFinish={handleSubmit}>
        <StyledFormItem
          label="ユーザー名"
          name="newUsername"
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
          name="newPassword"
          rules={[
            {
              required: true,
              message: "パスワードを入力してください", // 未入力時に表示するメッセージ
            },
          ]}
          hasFeedback
        >
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledFormItem>
        <StyledFormItem
          label="パスワード再入力"
          name="confirm"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "確認のためパスワードを再入力してください",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("パスワードが一致しません"));
              },
            }),
          ]}
        >
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledFormItem>
        <StyledButton htmlType="submit">新規作成</StyledButton>
      </StyledForm>
    </Modal>
  );
};
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 20px auto;
`;

const StyledFormItem = styled(FormItem)`
  width: 400px;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  width: 100px;
  margin: 0 auto;
`;
