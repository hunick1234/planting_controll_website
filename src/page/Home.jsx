import {} from "react";
import { WaterSlider, LightSlider } from "../components/Slider";
import {
  TemperatureComponent,
  HumidityComponent,
  LightComponent,
} from "../components/InfoCard";
import "./Home.css";
import { Agent } from "../components/ELF";

function Home() {
  return (
    <>
      <div className="home">
        <Agent></Agent>
        {/* <ELFCanvas message="Hello, move me around! canvas version" imageSrc="https://i.gifer.com/embedded/download/22S7.gif" /> */}
        <div className="title">
          <h1>Home</h1>
        </div>
        <div className="viewInfo">
          <HumidityComponent humidity={49} />
          <TemperatureComponent temperature={50} />
          <LightComponent light={51} />
        </div>
        <div className="controlle">
          <WaterSlider />
          <LightSlider />
        </div>
      </div>
    </>
  );
}

export default Home;
