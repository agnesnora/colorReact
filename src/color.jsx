import { useContext, useState } from "react";
import { ColorContext } from "./Generator";

const CopyToClipboard = ({ text }) => {
  const { theme } = useContext(ColorContext);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        name="hexValue"
        // onChange={() => console.log("copied")}
        className={`${theme} hexValue`}
        onClick={handleCopyClick}
      />
      {isCopied ? " Copied!" : ""}
    </div>
  );
};

export default function Color() {
  const { data, theme, formData, loading } = useContext(ColorContext);

  const colorEl = data
    ? data.map((color, index) => (
        <div className={`${theme} color--block`} key={color.hex.clean}>
          <div
            className={`color--cell color--cell--${index}`}
            style={{ backgroundColor: color.hex.value }}
          ></div>
          <CopyToClipboard text={color.hex.value} />
        </div>
      ))
    : null;

  return (
    <div className="colorscheme--container">
      <h1>{loading ? formData.mode : formData.newMode}</h1>
      <p>Click #hex to copy!</p>
      <div className="color--palette">{colorEl}</div>
    </div>
  );
}
