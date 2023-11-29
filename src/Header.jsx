import { useContext } from "react";
import { ColorContext } from "./Generator";

export default function Header() {
  const { theme } = useContext(ColorContext);

  const brickText = ["generate", "your", "lovely", "color", "palettes"];
  const colorBrickText = brickText.map((item) => (
    <div key={item} className={`bricktext--cell ${theme} ${item}`}>
      {item}
    </div>
  ));

  return (
    <header>
      <div className={`${theme} bricktext--container`}>{colorBrickText}</div>
    </header>
  );
}
