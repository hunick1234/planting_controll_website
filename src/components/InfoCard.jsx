import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./InfoCard.css";

const InfoCard = ({ title, description }) => {
  return (
    <>
      <div className="info-card">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export const HumidityComponent = ({ humidity }) => {
  const [data, setData] = useState(humidity);
  useEffect(() => {
    setData(humidity);
  }, [humidity]);

  const getHumidity = () => {
    const humidity = Math.floor(Math.random() * 100);
    // send api request to get humidity
    setData(humidity);
  };

  return (
    <div onClick={getHumidity}>
      <InfoCard title="Humidity" description={`currently:  ${data}%`} />
    </div>
  );
};

HumidityComponent.propTypes = {
  humidity: PropTypes.number.isRequired,
};

export const TemperatureComponent = ({ temperature }) => {
  const [data, setData] = useState(temperature);
  useEffect(() => {
    setData(temperature);
  }, [temperature]);

  const getTemprature = () => {
    const humidity = Math.floor(Math.random() * 100);
    // send api request to get temperature
    setData(humidity);
  };
  return (
    <div onClick={getTemprature}>
      <InfoCard title="Temperature" description={`currently: ${data}°C`} />
    </div>
  );
};

TemperatureComponent.propTypes = {
  temperature: PropTypes.number.isRequired,
};

export const LightComponent = ({ light }) => {
  const [data, setData] = useState(light);
  useEffect(() => {
    setData(light);
  }, [light]);

  const getLight = () => {
    const light = Math.floor(Math.random() * 100);
    // send api request to get humidity
    setData(light);
  };
  return (
    <div onClick={getLight}>
      <InfoCard title="Light" description={`currently: ${data} lux`} />
    </div>
  );
};

LightComponent.propTypes = {
  light: PropTypes.number.isRequired,
};

export const WaterComponent = ({ water }) => {
  return (
    <>
      <InfoCard title="Water" description={`${water}ml`} />
    </>
  );
};

WaterComponent.propTypes = {
  water: PropTypes.number.isRequired,
};

export default InfoCard;
