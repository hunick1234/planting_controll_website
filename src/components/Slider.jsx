import { useState } from "react";
import PropTypes from "prop-types";
import "./Slider.css"; // Ensure the CSS is properly linked

export function VerticalSlider() {
  const [value, setValue] = useState(50); // Initialize the slider value to 50

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="slider-container vertical">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        // className="range-slider vertical-slider"
        orient="vertical" // This is important for some browsers
      />
      <p>Value: {value}</p>
    </div>
  );
}
export function HorizontalSlider({ title, onValueChange }) {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
    onValueChange(event.target.value);
  };

  return (
    <div className="slider">
      <h2>{title}</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="range-slider"
      />
      <p>Value: {value}</p>
    </div>
  );
}

export function LightSlider() {
  const handleValueChange = (value) => {
    //send api request to update light value
    console.log("New light value:", value);
  };

  return (
    <div className="light-slider">
      <HorizontalSlider title="Light" onValueChange={handleValueChange} />
    </div>
  );
}

export function WaterSlider() {
  const handleValueChange = (value) => {
    //send api request to update water value
    console.log("New water value:", value);
  };

  return (
    <div className="water-slider">
      <HorizontalSlider title="Water" onValueChange={handleValueChange} />
    </div>
  );
}

HorizontalSlider.propTypes = {
  title: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
