import React from "react";

// This component renders the form for adding a new hog
function HogForm({ formData, onChange, onSubmit }) {
  return (
    // This form calls onSubmit when the user submits the form
    <form className="ui form" onSubmit={onSubmit}>
      <h3>Add a New Hog</h3>

      // Text input for the hog's name
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
      </div>

      // Text input for an image URL
      <div className="field">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          value={formData.image}
          onChange={onChange}
          required // 
        />
      </div>

      // Input for the hog’s specialty
      <div className="field">
        <label htmlFor="specialty">Specialty</label>
        <input
          id="specialty"
          name="specialty"
          value={formData.specialty}
          onChange={onChange}
        />
      </div>

      // Input for hog’s weight (number input)
      <div className="field">
        <label htmlFor="weight">Weight</label>
        <input
          id="weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={onChange}
        />
      </div>

      // Checkbox to mark if the hog is greased
      <div className="field">
        <label htmlFor="greased">
          <input
            id="greased"
            name="greased"
            type="checkbox"
            checked={formData.greased}
            onChange={onChange}
          />
          Greased
        </label>
      </div>

      // Input for the highest medal this hog has achieved
      <div className="field">
        <label htmlFor="highestMedal">Highest Medal Achieved</label>
        <input
          id="highestMedal"
          name="highest medal achieved"
          value={formData["highest medal achieved"]}
          onChange={onChange}
        />
      </div>

      // Submit button to add the hog to the list
      <button type="submit" className="ui button primary">Add Hog</button>
    </form>
  );
}

export default HogForm;