import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: ${(props) => props.theme.bgColor.green};
  border-radius: 40px;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 400px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 10px;
  text-align: left;
  border: 2px solid black;
  padding: 1px 10px;
  font-size: ${(props) => props.theme.fontSize.small};
`;
const Btn = styled.button`
  border-radius: 10px;
  text-align: center;
  border: 2px solid black;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: ${(props) => props.theme.fontSize.small};
  cursor: pointer;
`;

const Label = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const ErrorMessage = styled.span``;

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onVaild = async (data) => {
    if (data) {
      if (data.Password !== data.confirmPassword) {
        return setError(
          "confirmPassword",
          { message: "Password are not the same" },
          { shouldFocus: true },
        );
      }

      const { email, username } = data;
      const password = data.Password;

      await axios.post(
        "http://localhost:4000/signup",
        {
          email,
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      navigate("/");
    } else {
      setErrorMessage("양식에 맞게 입력하세요");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onVaild)}>
        <Label>Email</Label>
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[0-9A-Z]([-_\.]?[0-9A-Z])*@[0-9A-Z]([-_\.]?[0-9A-Z])*\.[A-Z]{2,6}$/i,
              message: "Please enter a valid email",
            },
          })}
          placeholder="이메일을 입력하세요"
        />
        <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        <Label>Username</Label>
        <Input
          {...register("username", {
            required: "Username is required",
            minLength: { value: 2, message: "Your username is too short" },
          })}
          placeholder="유저네임을 입력하세요(최소 2글자 이상)"
        />
        <ErrorMessage>{errors?.username?.message}</ErrorMessage>
        <Label>Password</Label>
        <Input
          {...register("Password", {
            required: "Password is required",
            minLength: { value: 4, message: "Your Password is too short" },
          })}
          placeholder="비밀번호을 입력하세요(최소 4글자 이상)"
        />
        <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        <Label>Confirm Password</Label>
        <Input
          {...register("confirmPassword", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Your confirm password is too short",
            },
          })}
          placeholder="비밀번호을 한번 더 입력해주세요"
        />
        <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
        <Btn>Sign Up</Btn>
      </Form>
    </Wrapper>
  );
}

export default Signup;
