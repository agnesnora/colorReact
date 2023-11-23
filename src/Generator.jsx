import { useState, useEffect, createContext } from "react";
import Color from "./color";
import Header from "./Header";
import { FaArrowTurnDown } from "react-icons/fa6";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { PiFolderUserFill } from "react-icons/pi";
import SavedToProfile from "./SavedToProfile";

export const ColorContext = createContext();
export default function Generator() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [formData, setFormData] = useState({
    baseColor: "#ef38a9",
    color: "",
    mode: "monochrome-light",
    newMode: "",
  });
  const [savedSchemes, setSavedSchemes] = useState(() => {
    const storedSchemes = localStorage.getItem("savedSchemes");
    return storedSchemes ? JSON.parse(storedSchemes) : [];
  });
  const [profileOn, setProfileOn] = useState(false);

  useEffect(() => {
    localStorage.setItem("savedSchemes", JSON.stringify(savedSchemes));
  }, [savedSchemes]);
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"));
  }
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
  const handleColorChange = (event) => {
    const newColor = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      baseColor: newColor,
    }));
  };

  const handleGenerateClick = () => {
    setFormData({
      ...formData,
      newMode: selectedMode,
    });
    fetchData();
    setProfileOn(false);
    console.log(data);
  };

  const handleSaveClick = () => {
    const newScheme = data.map((color, index) => ({
      index,
      value: color.hex.value,
    }));
    setSavedSchemes([...savedSchemes, newScheme]);

    // setSavedSchemes([...savedSchemes, data.map((color) => color.hex.value)]);

    console.log("saved", savedSchemes);
  };
  const handleProfileClick = () => {
    setProfileOn(true);
  };

  return (
    <ColorContext.Provider
      value={{
        data,
        theme,
        setTheme,
        formData,
        loading,
        savedSchemes,
        handleProfileClick,
        profileOn,
      }}
    >
      <div className={`${theme} container`}>
        <Header />
        <div className={`${theme} settings--header`}>
          <p className={`${theme} pick`}>Pick your color and style</p>
          <form>
            <div className="generate--settings">
              <input
                type="color"
                name="baseColor"
                value={formData.baseColor}
                onChange={handleColorChange}
                className="picked--color"
              />
              <div className="custom-select">
                <select
                  name="mode"
                  onChange={handleChange}
                  value={formData.mode}
                >
                  <option value="monochrome">Monochrome</option>
                  <option value="monochrome-dark">Monochrome-dark</option>
                  <option value="monochrome-light">Monochrome-light</option>
                  <option value="analogic">Analogic</option>
                  <option value="analogic-complement">
                    Analogic-complement
                  </option>
                  <option value="complement">Complement</option>
                  <option value="triad">Triad</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              className="generate--btn big--btn"
              onClick={handleGenerateClick}
            >
              Generate
            </button>
          </form>
        </div>
        {!profileOn ? (
          <div className={`${theme} palette--container`}>
            {loading ? <h1>Loading...</h1> : <Color />}
            <button
              onClick={handleSaveClick}
              className={`${theme} save big--btn`}
            >
              Save scheme to your profile
            </button>
          </div>
        ) : (
          <SavedToProfile
            setProfileOn={setProfileOn}
            savedSchemes={savedSchemes}
            theme={theme}
          />
        )}
      </div>
    </ColorContext.Provider>
  );
}
