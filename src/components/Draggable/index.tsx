import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  position?: {
    x: number;
    y: number;
  };
}

export default function Draggable({ children, position }: Props) {
  const targetRef = useRef<HTMLDivElement>(null);

  const dragging = useRef(false);

  const coords = useRef({
    startX: position ? position.x : 0,
    startY: position ? position.y : 0,
    lastX: position ? position.x : 0,
    lastY: position ? position.y : 0,
  });

  useEffect(() => {
    if (!targetRef.current || !coords.current) {
      return;
    }

    const targetElement = targetRef.current;
    const containerElement = targetElement.parentElement;

    if (!containerElement) {
      throw new Error("target element must have parentElement");
    }

    const handleMouseDown = (e: MouseEvent) => {
      dragging.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      dragging.current = false;
      coords.current.lastX = targetElement.offsetLeft;
      coords.current.lastY = targetElement.offsetTop;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) {
        return;
      }

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      targetElement.style.top = `${nextY}px`;
      targetElement.style.left = `${nextX}px`;
    };

    targetElement.addEventListener("mousedown", handleMouseDown);
    targetElement.addEventListener("mouseup", handleMouseUp);
    containerElement.addEventListener("mousemove", handleMouseMove);
    containerElement.addEventListener("mouseleave", handleMouseUp);

    return () => {
      targetElement.removeEventListener("mousedown", handleMouseDown);
      targetElement.removeEventListener("mouseup", handleMouseUp);
      containerElement.removeEventListener("mousemove", handleMouseMove);
      containerElement.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={targetRef}
      style={{
        position: "absolute",
        top: position ? position.x : 0,
        left: position ? position.y : 0,
        cursor: "grab",
      }}
    >
      {children}
    </div>
  );
}
