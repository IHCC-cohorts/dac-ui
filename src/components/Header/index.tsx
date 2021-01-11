import React from "react";
import logo from "./dac.png";
import { css } from "emotion";
import background from "./DAC-header-background.jpg";

const Header = () => {
  const headerStyle = css`
    min-height: 64px;
    display: flex;
    position: relative;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.04;
    letter-spacing: normal;
    color: #191970;
    background: url(${background});
    background-size: cover;
    background-position: left;
    border-bottom: solid 2px #dcdde1;
    width: 100%;
    justify-content: space-between;
  `;
  const logoStyle = css`
    height: 40px;
    margin-left: 15px;
  `;
  return (
    <div className={headerStyle}>
      <div
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        <img alt="dac logo" src={logo} className={logoStyle}></img>
      </div>
      <div
        className={css`
          width: 500px;
          height: 100%;
          overflow: hidden;
          position: absolute;
          right: 0px;
        `}
      >
        <div
          className={css`
            background: #0056b9;
            width: 340px;
            height: 100%;
            position: absolute;
            right: 0px;
            &::before {
              content: "";
              position: absolute;
              background: #143f87;
              border: solid 1px #0056b9;
              width: 100px;
              height: 80px;
              transform: rotate(-12deg);
              left: -10px;
              top: -25px;
            }
            &::after {
              content: "";
              position: absolute;
              background: #0056b9;
              width: 100px;
              height: 200px;
              transform: rotate(12deg);
              left: -10px;
              top: -25px;
            }
          `}
        />
      </div>
      <div
        className={css`
          text-align: right;
          color: white;
          position: relative;
        `}
      >
        <div
          className={css`
            margin-right: 10px;
          `}
        >
          Alzheimer’s Cohort Atlas
        </div>
      </div>
    </div>
  );
};

export default Header;
