import axios from 'axios';
import React from 'react';
const { useState, useEffect, useCallback } = React;
import UploadButton from './components/UploadButton';
import CardList from './components/CardList';
import UploadPhotoModal from './components/UploadPhotoModal';
import Search from './components/Search';
import Sort from './components/Sort';

function App() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('likes DESC');

  const updatePosts = useCallback(() => {
    axios
      .get(import.meta.env.VITE_API_POSTS_URL, {
        params: { search, sort },
      })
      .then(({ data }) => setPosts(data));
  }, [search, sort])

  useEffect(() => {
    updatePosts();
  }, [search, sort, updatePosts])

  const toggleModal = (state) => {
    setShowModal(state);
  }

  const filterPostsByTag = (tag) => {
    axios
      .get(import.meta.env.VITE_API_POSTS_BY_TAG_URL, {
        params: { tag }
      })
      .then(({ data }) => setPosts(data));
  }

  const updateSearch = (str) => {
    setSearch(str);
  }

  const updateSort = (state) => {
    setSort(state);
  }

  return (
    <div id="App" className="text-slate-100 container flex flex-col items-center max-w-[90%] mx-auto">
      {showModal ? <UploadPhotoModal toggleModal={toggleModal} updatePosts={updatePosts} /> : null}
      <nav className="my-5 flex w-full justify-around items-center">
        <UploadButton toggleModal={toggleModal} />
        <Search updateSearch={updateSearch} />
        <Sort updateSort={updateSort} />
      </nav>
      {posts.length > 0 ? <CardList posts={posts} filterPostsByTag={filterPostsByTag} /> : null}
    </div>
  )
}

export default App
