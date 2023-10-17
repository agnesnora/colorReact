import { useState, useEffect, createContext } from "react";
import Color from "./color";
import Header from "./Header";

export const ColorContext = createContext();
export default function Generator() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    baseColor: "#EA054B",
    mode: "monochrome",
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

  function handleChange(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <ColorContext.Provider value={data}>
      <div className="container">
        <Header />
        <form>
          <input
            type="color"
            name="baseColor"
            value={formData.baseColor}
            onChange={handleChange}
          />
          <select name="mode" onChange={handleChange} value={formData.mode}>
            <option value="monochrome">Monochrome</option>
            <option value="monochrome-dark">Monochrome-dark</option>
            <option value="monochrome-light">Monochrome-light</option>
            <option value="analogic">Analogic</option>
            <option value="analogic-complement">Analogic-complement</option>
            <option value="complement">Complement</option>
            <option value="triad">Triad</option>
          </select>
          <button type="button" onClick={fetchData}>
            button
          </button>
        </form>
        {loading ? <h1>Loading...</h1> : <Color />}
      </div>
    </ColorContext.Provider>
  );
}
