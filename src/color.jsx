import { useContext } from "react";
import { ColorContext } from "./Generator";
export default function Color() {
  const { data, theme, formData, loading } = useContext(ColorContext);

  const colorEl = data
    ? data.map((color, index) => (
        <div className={`${theme} color--block`} key={color.hex.clean}>
          <div
            className={`color--cell color--cell--${index}`}
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
      <h1>{loading ? formData.mode : formData.newMode}</h1>
      <div className="color--palette">{colorEl}</div>
    </div>
  );
}
