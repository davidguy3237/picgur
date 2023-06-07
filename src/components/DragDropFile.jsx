import React from 'react';
const { useState, useRef } = React;

export default function DragDropFile({ handleFile }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      className="w-[90%] h-3/4 border-dashed border-2 border-sky-600 rounded-lg relative">
      <input ref={inputRef} type="file" id="photo-upload" required hidden onChange={(e) => handleFile(e.target.files[0])}/>
      <label
        htmlFor="photo-upload"
        className={`w-full h-full flex items-center justify-center ${dragActive ? 'bg-sky-600/50' : ''}`}>
        <div className="flex flex-col justify-center items-center text-3xl">
          <p className="m-4">Drag and drop your file here or</p>
          <button type="button" className="cursor-pointer p-1 underline" onClick={() => inputRef.current.click()}>Upload a file</button>
        </div>
      </label>
      { dragActive && <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className="absolute w-full h-full inset-x-0 inset-y-0"></div> }
    </div>
  )
}
