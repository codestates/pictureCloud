import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Frigo from "../Images/frigo.png";
import { gitHubClientId } from "../variable";

const ErrorMessage = styled.span`
  position: fixed;
  display: table-cell;
  padding-top: 5px;
  padding-left: 90px;
`;

const Center = styled.div`
  display: flex;
  padding: 200px 0px;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Img = styled.img`
  position: absolute;
  width: 600px;
  height: 85%;
  z-index: -1;
  top: 80px;
`;

const TitleForm = styled.form`
  background-color: ${(props) => props.theme.bgColor.green};
  width: 20rem;
  height: 2rem;
  padding: 1rem;
  margin-top: 20px;
  border: 2px solid;
  border-radius: 5px;
  display: inline-block;
`;
const LoginForm = styled.form`
  background-color: ${(props) => props.theme.bgColor.green};
  width: 20rem;
  height: 12rem;
  padding: 1rem;
  margin-top: 10px;
  border: 2px solid;
  border-radius: 5px;
  display: inline-block;
`;

const TitleLine = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const EmailInput = styled.input`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: center;
  width: 14rem;
  height: 1.5rem;
  border: 2px solid;
  border-radius: 5px;
`;

const PasswordInput = styled.input`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: center;
  width: 14rem;
  height: 1.5rem;
  margin-top: 20px;
  border: 2px solid;
  border-radius: 5px;
`;

const Button = styled.button`
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.small};
  margin-top: 20px;
  width: 6rem;
  height: 2rem;
  border: 2px solid;
  border-radius: 5px;
  cursor: pointer;
`;
const LoginBtn = styled(Button)`
  margin-bottom: 7px;
`;

const OAuthBox = styled.div``;

const OAuthBtn = styled.button`
  margin-top: 8px;
  border: 2px solid;
  border-radius: 10px;
  cursor: pointer;
`;

const CommentLine = styled.div`
  margin-top: 10px;
  font-size: 15px;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GitHubBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  border: 2px solid;
  border-radius: 5px;
  cursor: pointer;
`;

function Login({
  handleResponseSuccess,
  accessToken,
  isLogin,
  setIsLogin,
  userinfo,
  setAccessToken,
}) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onVaild = (data) => {
    if (data) {
      const { email, password } = data;

      axios
        .post(
          "http://localhost:4000/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
            withCredentials: true,
          },
        )
        .then((res) => {
          const accessToken = res.data.accessToken;

          handleResponseSuccess(accessToken);
        })
        .catch((err) => console.log(err));
    } else {
      setErrorMessage("이메일과 비밀번호를 입력하세요");
    }
  };

  //github OAuth
  const socialLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${gitHubClientId}`,
    );
  };
  const handleGitHub = () => {
    socialLogin();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const search = url.search;
    if (search) {
      const authorizationCode = search.split("=")[1];
      console.log(authorizationCode);
      axios
        .post(
          "http://localhost:4000/callback",
          { authorizationCode },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        )
        .then((response) => {
          console.log(response.data.access_Token);
          setAccessToken(response.data.access_Token);
          setIsLogin(true);
        });
    }
  }, []);

  return (
    <>
      <Center>
        <Img src={Frigo} />
        <TitleForm>
          {isLogin ? (
            <TitleLine>Hello!</TitleLine>
          ) : (
            <TitleLine>Frigo</TitleLine>
          )}
        </TitleForm>
        {isLogin ? null : (
          <>
            <LoginForm
              onSubmit={handleSubmit(onVaild)}
              action="http://frigo.com/login"
            >
              <EmailInput
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
              <PasswordInput
                type="password"
                {...register("password", {
                  required: "Password is required",

                  minLength: {
                    value: 4,
                    message: "Your password is too short",
                  },
                })}
                placeholder="비밀번호를 입력하세요"
              />
              <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              <LoginBox>
                <LoginBtn>Login</LoginBtn>
                <GitHubBtn onClick={handleGitHub}>GitHub 로그인</GitHubBtn>
              </LoginBox>

              <CommentLine>
                아직 회원가입을 하지 않으셨다면 <Link to="/signup">여기</Link>로
                이동하세요
              </CommentLine>
            </LoginForm>
          </>
        )}
      </Center>
    </>
  );
}

export default Login;
