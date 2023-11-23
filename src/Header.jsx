import { useContext } from "react";
import { ColorContext } from "./Generator";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { PiFolderUserFill } from "react-icons/pi";
export default function Header() {
  // const { theme } = useContext(ColorContext);
  const { setTheme, theme } = useContext(ColorContext);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"));
  }
  const brickText = ["generate", "your", "lovely", "colour", "palettes"];
  const colorBrickText = brickText.map((item) => (
    <div key={item} className={`bricktext--cell ${theme} ${item}`}>
      {item}
    </div>
  ));

  return (
    <header>
      {/* <h1>Color Scheme Generator</h1> */}
      <div className={`${theme} bricktext--container`}>{colorBrickText}</div>
      <div className={`${theme} container--header`}>
        {" "}
        <h1 className={`${theme} title`}>Color Scheme Generator</h1>
        <button className={`${theme} day--night`} onClick={toggleTheme}>
          {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
        </button>
        <PiFolderUserFill className="folder" />
      </div>
      {/* <p className={`${theme} pick`}>Pick your color and style</p> */}
      {/* <h3>Create beautiful color palettes</h3> */}
      {/* <button className={`${theme} day--night`} onClick={toggleTheme}>
        {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
      </button> */}
    </header>
  );
}
