import React from 'react';
import './App.css';

import { TimelapseApp, sampleImageCreator } from "./container/Timelapse";
import { Timelapse, Image } from "./component/Timelapse";
import Canvas from "./component/Canvas";


const App: React.FC = () => {
  return (
    <div className="App">
      <Canvas images={sampleImageCreator(903)} width={500} height={500} />
    </div>
  );
}

export default App;
