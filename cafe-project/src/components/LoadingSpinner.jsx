import React from "react";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingSpinner = ({ color = "#1d5197", size = 15 }) => (
  <LoaderWrapper>
    <SyncLoader color={color} size={size} />
  </LoaderWrapper>
);

export default LoadingSpinner;
