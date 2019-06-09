import React, { useState } from 'react';
import './App.css';

import { TimelapseApp, sampleImageCreator } from "./container/Timelapse";
import Canvas from "./component/Canvas";

const images = sampleImageCreator(100)

const App: React.FC = () => {
  const [timelapseHandle, setTimelapseHandle] = useState<null | boolean>(null)
  const startTimelapse = () => {
    console.log("hello")
    setTimelapseHandle(true)
  }
  return (
    <div className="App">
      <Canvas timelapseHandle={timelapseHandle} preloadedCallback={startTimelapse} images={images} width={500} height={500} />
    </div>
  );
}

export default App;
