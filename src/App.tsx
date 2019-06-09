import React, { useState } from 'react';

import Timelapse from "timelapse/src/component/Timelapse";
import { sampleImageCreator } from "./lib/Utils";

const images = sampleImageCreator(100)

const App: React.FC = () => {
  const [timelapseHandle, setTimelapseHandle] = useState<null | boolean>(null)
  const startTimelapse = () => {
    setTimelapseHandle(true)
  }
  return (
    <div className="App">
      <Timelapse fps={60} timelapseHandle={timelapseHandle} preloadedCallback={startTimelapse} images={images} width={864} height={540} />
    </div>
  );
}

export default App;
