import { useContext } from "react";
import { ColorContext } from "./Generator";
export default function Color() {
  const { data, theme, formData } = useContext(ColorContext);

  const colorEl = data
    ? data.map((color) => (
        <div className={`${theme}--color--block`} key={color.hex.clean}>
          <div
            className="color--cell"
            style={{ backgroundColor: color.hex.value }}
          ></div>
          <input
            type="text"
            value={color.hex.value}
            name="hexValue"
            onChange={() => console.log("copied")}
            className="hexValue"
          />
        </div>
      ))
    : null;
  return (
    <div className="colorscheme--container">
      {" "}
      <h1>{formData.mode}</h1>
      <div className="color--palette">{colorEl}</div>
    </div>
  );
}
