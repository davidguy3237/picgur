import axios from 'axios';
import React from 'react';
const { useState, useEffect } = React;
import UploadButton from './components/UploadButton';
import CardList from './components/CardList';
import UploadPhotoModal from './components/UploadPhotoModal';
import Search from './components/Search';

function App() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const updatePosts = (search = '') => {
    axios
      .get('http://localhost:3000/api/posts', {
        params: { search },
      })
      .then(({ data }) => setPosts(data));
  }

  useEffect(() => {
    updatePosts();
  }, [])

  const toggleModal = (state) => {
    setShowModal(state);
  }

  return (
    <div id="App" className="text-slate-100 container flex flex-col items-center max-w-[90%] mx-auto">
      {showModal ? <UploadPhotoModal toggleModal={toggleModal} updatePosts={updatePosts} /> : null}
      <nav className="m-5 flex">
        <Search updatePosts={updatePosts} />
        <UploadButton toggleModal={toggleModal} />
      </nav>
      {posts.length > 0 ? <CardList posts={posts} /> : null}
    </div>
  )
}

export default App
