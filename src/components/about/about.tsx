import React from "react";

interface aboutProps {
  boxClass: string;
}

export const AboutSection: React.FC<aboutProps> = ({ boxClass }) => {
  return (
    <div className={boxClass}>
      <div className="">
        <h2>about</h2>
        <p>recent ucd grad with a passion for SWE</p>
      </div>
    </div>
  );
};
