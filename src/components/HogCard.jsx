import React, { useState } from "react";

function HogCard({ hog }) {
  // We'll use state to toggle whether to show hog details
  const [showDetails, setShowDetails] = useState(false);

  function handleClick() {
    // Toggle the details section on click
    setShowDetails(!showDetails);
  }

  return (

    <div
      className="ui eight wide column"
      aria-label="hog card"
      onClick={handleClick}
    >
      <div className="ui card">
        // This shows the hog image
        <div className="image">
          <img src={hog.image} alt={hog.name} />
        </div>
        // This section shows the hog's name
        <div className="content">
          <h3>{hog.name}</h3>
        </div>
        // This section only renders if showDetails is true
        {showDetails && (
          // This section shows more details if toggled on
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

export default HogCard;