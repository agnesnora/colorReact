import { useContext } from "react";
import { ColorContext } from "./Generator";
export default function Color() {
  const data = useContext(ColorContext);

  const colorEl = data
    ? data.map((color) => (
        <div
          className="color--column"
          key={color.hex.clean}
          style={{ backgroundColor: color.hex.value }}
        ></div>
      ))
    : null;
  return <div>{colorEl}</div>;
}
