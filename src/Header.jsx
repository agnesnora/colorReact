import { useContext } from "react";
import { ColorContext } from "./Generator";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
export default function Header() {
  const { setTheme, theme } = useContext(ColorContext);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"));
  }

  return (
    <header>
      <h1>Color Scheme Generator</h1>
      <h3>Create beautiful color palettes</h3>
      <button className={`${theme}--day--night`} onClick={toggleTheme}>
        {theme == "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
      </button>
    </header>
  );
}
