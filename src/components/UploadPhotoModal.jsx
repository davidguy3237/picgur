import axios from 'axios';
import React from 'react';
const { useState } = React;
import DragDropFile from './DragDropFile';

export default function UploadPhotoModal({ toggleModal, updatePosts }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    axios
      .post('http://localhost:3000/api/upload', formData)
      .then(() => updatePosts())
      .then(() => toggleModal(false));
  }

  const exitModal = (e) => {
    if (e.target.id === 'photo-upload-modal') {
      toggleModal(false);
    }
  }

  const handleFile = (fileToUpload) => {
    setFile(fileToUpload);
    const blob = URL.createObjectURL(fileToUpload);
    setPreview(blob);
    setFile(fileToUpload);
  }

  return (
    <div
      id="photo-upload-modal"
      onClick={exitModal}
      className="flex justify-center items-center fixed z-10 left-0 top-0 w-full h-full bg-black/50" >
      <div id="photo-upload-modal-content" className="bg-slate-800 p-4 w-1/3 h-1/2 flex justify-center items-center rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full h-full">
          {/* {
            preview
            ? <img src={preview} alt='' className='m-10 max-h-full max-w-full' />
            : <>
              <input type="file" id="photoUpload" accept="image/*" hidden onChange={handlePreview} required />
              <label htmlFor="photoUpload" className="bg-slate-500 cursor-pointer p-5 rounded-md">Upload an image</label>
            </>
          } */}
          {
            preview
            ? <img src={preview} alt='' className='m-10 max-h-full max-w-full' />
            : <DragDropFile handleFile={handleFile} />
          }
          <input
            type="text"
            id="inputTitle"
            name="title"
            className="mt-2 bg-slate-800 border-2 w-4/5 h-10 p-1 border-slate-500 focus:border-slate-400 focus:outline-none"
            placeholder="Add a title"
            required
            onChange={(e) => setTitle(e.target.value)}/>
        <button type="submit" className="bg-slate-600 m-5 p-3 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  )
}
