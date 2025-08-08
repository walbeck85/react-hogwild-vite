// App.jsx – Main component file for HogWild
// Handles rendering, filtering, form input, and hide/show behavior for the hog competition app
import React, { useState } from "react";
import Nav from "./Nav";
import hogsData from "../porkers_data";

function HogCard({ hog, onHideHog }) {
  // Each hog gets its own card component.
  // This local state controls whether we show extra details.
  const [showDetails, setShowDetails] = useState(false);

  // Toggle the details panel open/closed when the card is clicked.
  function handleClick() {
    setShowDetails(!showDetails);
  }

  return (
    <div
      className="ui eight wide column"
      aria-label="hog card"
      onClick={handleClick}
    >
      <div className="ui card">
        <div className="image">
          <img
            src={hog.image}
            alt={hog.name}
            onError={(e) => {
              // If the image fails to load, show a fallback pig image instead.
              console.error(`Image failed to load for hog: ${hog.name}`);
              e.target.src = "https://i.imgur.com/MT5VQ76.jpg";
            }}
          />
        </div>
        <div className="content">
          <h3>{hog.name}</h3>
        </div>

        {showDetails && (
          <div className="extra content">
            <p><strong>Specialty:</strong> {hog.specialty}</p>
            <p><strong>Weight:</strong> {hog.weight}</p>
            <p><strong>Greased:</strong> {hog.greased ? "Yes" : "No"}</p>
            <p><strong>Highest Medal Achieved:</strong> {hog["highest medal achieved"]}</p>
          </div>
        )}

        {/* Hide Me button is rendered at the bottom of the card */}
        <div className="extra content">
          <button
            className="ui button"
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering handleClick
              onHideHog(hog.name);
            }}
          >
            Hide Me
          </button>
        </div>
      </div>
    </div>
  );
}

// App is the main component that manages state for the whole app.
// We handle filtering, form inputs, and rendering here.
function App() {
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [hogs, setHogs] = useState(hogsData);
  const [hiddenHogs, setHiddenHogs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    specialty: "",
    weight: "",
    greased: false,
    medal: ""
  });

  function handleGreasedChange(event) {
    setGreasedOnly(event.target.checked);
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newHog = {
      name: form.name,
      image: form.image,
      specialty: form.specialty,
      weight: parseFloat(form.weight),
      greased: form.greased,
      "highest medal achieved": form.medal
    };

    setHogs([...hogs, newHog]);

    setForm({
      name: "",
      image: "",
      specialty: "",
      weight: "",
      greased: false,
      medal: ""
    });
  }

  const displayedHogs = (greasedOnly ? hogs.filter(hog => hog.greased) : hogs).filter(
    (hog) => !hiddenHogs.includes(hog.name)
  );

  return (
    <div className="App">
      <Nav />
      <div className="ui form">
        <div className="field">
          <label htmlFor="greased-checkbox">
            <input
              id="greased-checkbox"
              type="checkbox"
              checked={greasedOnly}
              onChange={handleGreasedChange}
            />
            Show only greased hogs
          </label>
        </div>
      </div>

      {/* Form for adding a new hog. Controlled inputs using local form state. */}
      <form className="ui form" onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleInputChange} />
        </div>
        <div className="field">
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image" value={form.image} onChange={handleInputChange} />
        </div>
        <div className="field">
          <label htmlFor="specialty">Specialty</label>
          <input id="specialty" name="specialty" value={form.specialty} onChange={handleInputChange} />
        </div>
        <div className="field">
          <label htmlFor="weight">Weight</label>
          <input id="weight" name="weight" type="number" value={form.weight} onChange={handleInputChange} />
        </div>
        <div className="field">
          <label htmlFor="medal">Highest Medal Achieved</label>
          <input id="medal" name="medal" value={form.medal} onChange={handleInputChange} />
        </div>
        <div className="field">
          <label htmlFor="greased">Greased</label>
          <input id="greased" name="greased" type="checkbox" checked={form.greased} onChange={handleInputChange} />
        </div>
        <button className="ui button" type="submit">Add Hog</button>
      </form>

      {/* Render all hogs (either full list or filtered) using HogCard component */}
      <div className="ui grid container">
        {displayedHogs.map((hog, index) => (
          <HogCard
            key={index}
            hog={hog}
            onHideHog={(name) => setHiddenHogs([...hiddenHogs, name])}
          />
        ))}
      </div>
    </div>
  );
}

export default App;