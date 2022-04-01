import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import CalendarForm from "./CalendarForm";

export const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

export const ModalView = styled.div`
  width: 320px;
  height: 400px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

export const ModalClose = styled.button`
  color: #eee;
  background: #000;
  border: 1px solid #000;
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 50%);
  text-align: center;
  font-size: 1.2rem;
  height: 34px;
  width: 72px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function CalendarModal({ onConfirm, onCancel, visible }) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;
  return (
    <ModalBackdrop disappear={!visible}>
      <ModalView disappear={!visible}>
        <CalendarForm />
        <ModalClose onClick={onConfirm}>확인</ModalClose>
      </ModalView>
    </ModalBackdrop>
  );
}

export default CalendarModal;
