import React, { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  position?: {
    x: number;
    y: number;
  };
}

const INIT_X = 0;
const INIT_Y = 0;

const calculateRange = (d: number, target: number, limit: number) => {
  return d + target > limit ? limit - target : d < 0 ? 0 : d;
};

export default function Draggable({ children, position }: Props) {
  const initX = position ? position.x : INIT_X;
  const initY = position ? position.y : INIT_Y;

  const targetRef = useRef<HTMLDivElement>(null);
  const [{ x, y }, setPosition] = useState({
    x: initX,
    y: initY,
  });

  const handleMouseDown = (clickEvent: React.MouseEvent<HTMLElement>) => {
    const handleMouseMove = (mouseEvent: MouseEvent) => {
      if (!targetRef.current) {
        return;
      }
      const nextX = x + mouseEvent.screenX - clickEvent.screenX;
      const nextY = y + mouseEvent.screenY - clickEvent.screenY;

      const target = targetRef.current.getBoundingClientRect();
      const container = (
        targetRef.current.parentElement as HTMLElement
      ).getBoundingClientRect();

      setPosition({
        x: calculateRange(nextX, target.width, container.width),
        y: calculateRange(nextY, target.height, window.screen.height),
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", handleMouseMove);
      // you can save position
      console.warn("up");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  return (
    <div
      ref={targetRef}
      style={{
        position: "absolute",
        left: x,
        top: y,
        cursor: "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}
