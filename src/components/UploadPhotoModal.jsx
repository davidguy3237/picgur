import axios from 'axios';
import React from 'react';
const { useState } = React;
import DragDropFile from './DragDropFile';
import Tags from './Tags';

export default function UploadPhotoModal({ toggleModal, updatePosts }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    tags.forEach((tag) => {
      formData.append('tags[]', tag);
    })
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

  const addTag = (newTag) => {
    setTags([...tags, newTag]);
  }

  return (
    <div
      id="photo-upload-modal"
      onClick={exitModal}
      className="flex justify-center items-center fixed z-10 left-0 top-0 w-full h-full bg-black/50" >
      <div
        id="photo-upload-modal-content"
        className="bg-slate-800 p-4 w-1/3 h-3/4 flex justify-center items-center rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full h-full">
          {
            preview
            ? <img src={preview} alt='' loading="lazy" className='m-10 max-h-[70%] max-w-full' />
            : <DragDropFile handleFile={handleFile} />
          }cd
          <input
            type="text"
            id="inputTitle"
            name="title"
            className="mt-2 bg-slate-800 border-2 w-4/5 h-10 p-1 border-slate-500 focus:border-slate-400 focus:outline-none"
            placeholder="Add a title"
            required
            onChange={(e) => setTitle(e.target.value)}/>
          <Tags tags={tags} addTag={addTag} />
          <div className="flex items-center justify-center mb-3">
            {
              tags?.map((tag) => <span key={tag} className="text-sm bg-slate-600 px-3 py-1 mx-1 rounded-full">{tag}</span>)
            }
          </div>
        <button type="submit" className="bg-slate-600 text-3xl px-5 py-1 rounded-md hover:bg-slate-500">Submit</button>
        </form>
      </div>
    </div>
  )
}
