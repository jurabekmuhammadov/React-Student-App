import styled from "styled-components";

export const Select = styled.select`
  border: 2px solid transparent;
  width: 20%;
  height: 2.5em;

  outline: none;
  overflow: hidden;
  background-color: #f3f3f3;
  border-radius: 10px;
  transition: all 0.5s;
  border: 2px solid #f3f3f3;
  &:hover,
  &:focus {
    border: 2px solid #1bc58d;
    box-shadow: 0px 0px 0px 5px #1bc58c36;
    background-color: white;
  }
`;
