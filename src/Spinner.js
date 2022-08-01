import React from "react";
import styled from "styled-components";
import { Eco } from "@material-ui/icons";

const Spinner = (props) => {
  return (
    <Outter>
      <Eco
        style={{
          color: "#673ab7",
          fontSize: "150px",
        }}
      />
    </Outter>
  );
};

const Outter = styled.div`
  background: #e5d6ff;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spinner;
