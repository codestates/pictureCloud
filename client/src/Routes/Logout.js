import styled from "styled-components";
import { useNavigate } from "react-router";

const LogoutModalBox = styled.div`
  padding: 200px 0px;
  height: 100%;
  width: 100%;
  text-align: center;
  align-items: center;
`;
const LogoutNametag = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  width: 100%;
  padding-bottom: 30px;
  display: inline-block;
`;
const LogoutYesButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.medium};
  width: 150px;
  margin: 20px;
  cursor: pointer;
`;
const LogoutNoButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.medium};
  width: 150px;
  margin: 20px;
  cursor: pointer;
`;

const GitHubBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 150px;
  margin: 20px;
  cursor: pointer;
  position: absolute;
  top: 460px;
  left: 630px;
`;

function Logout({ handleLogout }) {
  const navigate = useNavigate();
  const handleYesOut = () => {
    console.log("yes, i'm out");
    handleLogout();
  };

  const handleNoOut = () => {
    navigate("/");
  };

  return (
    <>
      <LogoutModalBox>
        <LogoutNametag>로그아웃 하실건가요?</LogoutNametag>
        <LogoutYesButton onClick={handleYesOut}>그럴게요</LogoutYesButton>
        <LogoutNoButton onClick={handleNoOut}>아니예요</LogoutNoButton>
      </LogoutModalBox>
    </>
  );
}

export default Logout;
