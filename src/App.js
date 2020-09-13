import React from "react";
import "./styles.css";
import FlipGameContainers from "./containers/FlipGameContainer";
import cardList from "./cardList.json";

export default function App() {
  return <FlipGameContainers cards={cardList} />;
}
