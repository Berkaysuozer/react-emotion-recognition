import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import * as faceapi from 'face-api.js';


function App() {
  const [Initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef();
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + './models';
      setInitializing(true)

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startCamera());
    }
    loadModels();
  }, [])

  function startCamera() {
    //   return false;
    navigator.getUserMedia(
      {
        video: {}
      },
      stream => (videoRef.current.srcObject = stream),
      err => console.log(err)
    );
  }

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (Initializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      const displaySize = {
        width: videoWidth,
        height: videoHeight
      }
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)


    }, 1000)
  }



  return (
    <div className='App'>

      <span><h6 style={{ color: 'red' }} >  {Initializing ? `Yapay Zeka Yüklenene Kadar Bekleyin` : 'Hazır'}</h6></span>
      <div className='parent-div'>
        <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} />
        <canvas ref={canvasRef} className='canvas' />
      </div>
    </div >
  );
}

export default App;
