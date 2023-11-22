import { useState, useEffect, createContext } from "react";
import Color from "./color";
import Header from "./Header";
import { FaArrowTurnDown } from "react-icons/fa6";

export const ColorContext = createContext();
export default function Generator() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [formData, setFormData] = useState({
    baseColor: "#33658a",
    mode: "monochrome-light",
    newMode: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecolorapi.com/scheme?hex=${formData.baseColor.slice(
          1
        )}&mode=${formData.mode}&count=5`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data.colors);
    } catch (error) {
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [0]);

  // function handleChange(event) {
  //   setFormData((prevData) => {
  //     return {
  //       ...prevData,
  //       [event.target.name]: event.target.value,
  //     };
  //   });
  // }

  const [selectedMode, setSelectedMode] = useState(formData.mode);
  const handleChange = (event) => {
    const newMode = event.target.value;
    setSelectedMode(newMode);
    setFormData((prevData) => ({
      ...prevData,
      mode: newMode,
    }));
    setTimeout(() => {
      setFormData((prevData) => ({ ...prevData, newMode: newMode }));
    }, 2500);
  };

  const handleGenerateClick = () => {
    setFormData({
      ...formData,
      newMode: selectedMode,
    });
    fetchData();
  };

  return (
    <ColorContext.Provider value={{ data, theme, setTheme, formData, loading }}>
      <Header />
      <div className={`${theme} container`}>
        <p className="pick">
          Pick your color and style <FaArrowTurnDown className="arrow" />
        </p>
        <form>
          <div className="generate--settings">
            <input
              type="color"
              name="baseColor"
              value={formData.baseColor}
              onChange={handleChange}
              className="picked--color"
            />

            {/* <label className="picker" htmlFor="baseColor" /> */}
            <div className="custom-select">
              {" "}
              <select name="mode" onChange={handleChange} value={formData.mode}>
                <option value="monochrome">Monochrome</option>
                <option value="monochrome-dark">Monochrome-dark</option>
                <option value="monochrome-light">Monochrome-light</option>
                <option value="analogic">Analogic</option>
                <option value="analogic-complement">Analogic-complement</option>
                <option value="complement">Complement</option>
                <option value="triad">Triad</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            className={`${theme}--generate--btn `}
            onClick={handleGenerateClick}
          >
            Generate
          </button>
        </form>
      </div>
      <div className={`${theme}--palette--container`}>
        {" "}
        {loading ? <h1>Loading...</h1> : <Color />}
      </div>
    </ColorContext.Provider>
  );
}
