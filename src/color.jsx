import { useContext } from "react";
import { ColorContext } from "./Generator";
export default function Color() {
  const data = useContext(ColorContext);

  const colorEl = data
    ? data.map((color) => (
        <div className="color--block" key={color.hex.clean}>
          <div
            className="color--cell"
            style={{ backgroundColor: color.hex.value }}
          ></div>
          <input
            type="text"
            value={color.hex.value}
            name="hexValue"
            onChange={() => console.log("copied")}
          />
        </div>
      ))
    : null;
  return <div className="color--palette">{colorEl}</div>;
}
