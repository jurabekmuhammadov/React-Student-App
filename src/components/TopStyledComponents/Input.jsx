import styled from "styled-components";

export const Input = styled.input`
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 0.8em;
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
