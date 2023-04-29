import React, { useEffect, useRef, useState } from "react";

function AudioVisualiser(props) {
  const canvasRef = useRef(null);
  useEffect(() => {
    // creates new audio context
    const audioContext = new AudioContext();

    // gets source of audio
    const audioSrc = audioContext.createMediaElementSource(props.audioRef.current);
    // creates analyser
    const analyser = audioContext.createAnalyser();
    
    audioSrc.connect(analyser);
    audioSrc.connect(audioContext.destination);
    const canvas = canvasRef.current;
    const parentDiv = canvas.parentNode;
    canvas.width = parentDiv.clientWidth;
    canvas.height = parentDiv.clientHeight;
    const canvasCtx = canvas.getContext("2d");
    const bufferLength = canvas.width/10;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = 10;
    let barHeight;
    let x = 0;
    function renderFrame() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);
      canvasCtx.fillStyle = props.color;
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]/2;
        const x = i * (barWidth+1);
        dataArray[i] = Math.max(dataArray[i] - 0.12, 0);
        canvasCtx.fillStyle = `rgb(${barHeight + 78}, 140, 255)`;
        canvasCtx.fillRect(x, canvas.height - barHeight/2, barWidth, barHeight/2);
      }
    }
    renderFrame();
  }, [props.audioRef, props.color]);

  return (
  <div className="canvas-parent">
    <canvas ref={canvasRef}></canvas>
  </div>
  );
}

export default AudioVisualiser;
