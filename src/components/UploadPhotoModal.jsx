import axios from 'axios';
import React from 'react';
const { useState } = React;

export default function UploadPhotoModal({ toggleModal, updatePosts }) {
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handlePreview = (e) => {
    const blob = URL.createObjectURL(e.target.files[0]);
    setPreview(blob);
    setFile(e.target.files[0]);
  }

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

  return (
    <div
      id="photo-upload-modal"
      onClick={exitModal}
      className="flex justify-center items-center fixed z-10 left-0 top-0 w-full h-full bg-black/50">
      <div id="photo-upload-modal-content" className="bg-slate-800 p-4 w-1/2 h-3/4 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
          {
            preview
            ? <img src={preview} alt='' className='m-10 max-h-full max-w-full' />
            : <>
              <input type="file" id="photoUpload" accept="image/*" hidden onChange={handlePreview} required />
              <label htmlFor="photoUpload" className="bg-slate-500 cursor-pointer p-5 rounded-md">Upload an image</label>
            </>
          }
          <input
            type="text"
            id="inputTitle"
            name="title"
            className="mt-2 bg-slate-500"
            placeholder="Add a title"
            required
            onChange={(e) => setTitle(e.target.value)}/>
        <button type="submit" className="bg-slate-600 m-5 p-3 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  )
}
