export default function SavedToProfile({ setProfileOn, savedSchemes, theme }) {
  const closeProfile = () => {
    setProfileOn(false);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };
  console.log(savedSchemes);

  const SchemesEl = () => {
    return savedSchemes.map((scheme, schemeIndex) => (
      <div key={`scheme-${schemeIndex}`} className="scheme--saved">
        {scheme.map((color, colorIndex) => (
          // Inner map for iterating over colors within each scheme
          <div
            key={`color-${colorIndex}`}
            className={`color--${colorIndex}`}
            style={{ backgroundColor: color.value, padding: "3em" }}
          ></div>
        ))}
      </div>
    ));
  };
  return (
    <div className={`${theme} palette--container`}>
      <div className="saved--container">
        <h1>Your saved colorschemes</h1> <SchemesEl />
        <button className="big--btn" onClick={closeProfile}>
          Close profile
        </button>
        <button className="big--btn" onClick={clearLocalStorage}>
          Clear saved schemes
        </button>
      </div>
    </div>
  );
}
