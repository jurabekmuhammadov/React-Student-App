import styled from "styled-components";

export const Button = styled.button`
      border-radius: 10px;
      border: none;
      background-color: #1BC58D;
      padding: 8px 20px;
      color: white;
      font-weight: 700;
      cursor: pointer;
      transition: 0.3s;
      text-align: center;

      &:hover {
        background-color: #169e70;
      }
      // @media(max-width: 500px) {
      //   padding: 7px 10px;
      //   font-size: 14px;
      // }
    }
`;
