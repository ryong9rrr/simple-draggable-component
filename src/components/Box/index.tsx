import React, { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Box = ({ ...props }: Props) => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "60px",
        height: "60px",
        ...props.style,
      }}
    />
  );
};

export default Box;
