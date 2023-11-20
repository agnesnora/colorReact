import { useContext } from "react";
import { ColorContext } from "./Generator";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
export default function Header() {
  const { setTheme, theme } = useContext(ColorContext);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"));
  }
  const brickText = ["create", "your", "rainbow", "and", "sunshine"];

  const colorBrickText = brickText.map((item) => (
    <div key={item} className={`bricktext--cell ${item}`}>
      {item}
    </div>
  ));

  return (
    <header>
      <h1>Color Scheme Generator</h1>
      <div className="bricktext--container">{colorBrickText}</div>
      <h3>Create beautiful color palettes</h3>
      <button className={`${theme}--day--night`} onClick={toggleTheme}>
        {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
      </button>
    </header>
  );
}
