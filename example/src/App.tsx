import React, { useState } from 'react';

import { sampleImageCreator } from "./lib/Utils";

import Timelapse, { ImageProps } from "./component/Timelapse";

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
