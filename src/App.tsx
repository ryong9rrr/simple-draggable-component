import React from "react";
import Box from "./components/Box";
import Draggable from "./components/Draggable";
import "./index.css";

function App() {
  return (
    <>
      <Draggable position={{ x: 500, y: 500 }}>
        <Box style={{ backgroundColor: "royalblue" }} />
      </Draggable>
      <Draggable position={{ x: 300, y: 300 }}>
        <Box style={{ backgroundColor: "green" }} />
      </Draggable>
      <Draggable>
        <Box style={{ backgroundColor: "tomato" }} />
      </Draggable>
      <Draggable>
        <Box style={{ backgroundColor: "black" }} />
      </Draggable>
      <Draggable>
        <Box style={{ backgroundColor: "orange" }} />
      </Draggable>
    </>
  );
}

export default App;
