export default function SavedToProfile({ setProfileOn, savedSchemes }) {
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
    <div>
      <button onClick={closeProfile}>Close profile</button>
      <button onClick={clearLocalStorage}>Clear saved schemes</button>
      <h1>SavedTOProfile component mounted</h1>
      <div className="saved--container">
        {" "}
        <SchemesEl />
      </div>
    </div>
  );
}
