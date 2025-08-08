// App.jsx – Main component for the HogWild app
// Handles state, form input, filtering, and displaying hogs

import React, { useState } from "react";
import Nav from "./Nav";
import hogsData from "../porkers_data";

function HogCard({ hog }) {
  // This component renders one hog's card
  // It shows more details when you click the card

  const [showDetails, setShowDetails] = useState(false);

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
              // If the image doesn't load, use fallback hog picture
              console.error(`Image failed to load for hog: ${hog.name}`);
              e.target.src = "https://imgur.com/a/ESu7SoF"; // Fallback image URL
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
      </div>
    </div>
  );
}

function App() {
  // Set up the main state hooks
  const [greasedOnly, setGreasedOnly] = useState(false); // filter checkbox state
  const [hogs, setHogs] = useState(hogsData); // full hog list (plus added ones)
  const [form, setForm] = useState({
    name: "",
    image: "",
    specialty: "",
    weight: "",
    greased: false,
    medal: ""
  });

  // Checkbox to filter by greased hogs only
  function handleGreasedChange(event) {
    setGreasedOnly(event.target.checked);
  }

  // Tracks all changes in the form fields
  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  // When form is submitted, create a new hog and add it to the list
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

    // Reset form after submission
    setForm({
      name: "",
      image: "",
      specialty: "",
      weight: "",
      greased: false,
      medal: ""
    });
  }

  // Filter the hog list if greasedOnly is true
  const displayedHogs = greasedOnly
    ? hogs.filter(hog => hog.greased)
    : hogs;

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

      // Form for adding new hogs
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

      // Render the list of hog cards (filtered or not)
      <div className="ui grid container">
        {displayedHogs.map((hog, index) => (
          <HogCard key={index} hog={hog} />
        ))}
      </div>
    </div>
  );
}

export default App;