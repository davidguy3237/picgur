import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
const { useState, useEffect } = React;

export default function Card({ post }) {
  const { id, title, url, likes, dislikes, views } = post;
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDislikesCount] = useState(dislikes);
  const [clickedLike, setClickedLike] = useState('');
  const [viewCount, setViewCount] = useState(views);
  const [expandPhoto, setExpandPhoto] = useState(false);

  useEffect(() => {
    setViewCount(oldView => oldView + 1);
    axios.put('http://localhost:3000/api/views', { id });
  }, [id]);

  const handleLike = () => {
    if (clickedLike === 'dislike') {
      setClickedLike('like');
      setLikesCount(likesCount + 1);
      setDislikesCount(dislikesCount - 1);
      axios.put('http://localhost:3000/api/likes', {
        id,
        likes: likesCount + 1,
        dislikes: dislikesCount - 1,
      });

    } else if (clickedLike === '') {
      setClickedLike('like');
      setLikesCount(likesCount + 1);
      axios.put('http://localhost:3000/api/likes', {
        id,
        likes: likesCount + 1,
      });
    } else if (clickedLike === 'like') {
      setClickedLike('');
      setLikesCount(likesCount - 1);
      axios.put('http://localhost:3000/api/likes', {
        id,
        likes: likesCount - 1,
      });
    }
  };

  const handleDislike = () => {
    if (clickedLike === 'like') {
      setClickedLike('dislike');
      setDislikesCount(dislikesCount + 1);
      setLikesCount(likesCount - 1);
      axios.put('http://localhost:3000/api/likes', {
        id,
        likes: likesCount - 1,
        dislikes: dislikesCount + 1,
      });
    } else if (clickedLike === '') {
      setClickedLike('dislike');
      setDislikesCount(dislikesCount + 1);
      axios.put('http://localhost:3000/api/likes', {
        id,
        dislikes: dislikesCount + 1,
      });
    } else if (clickedLike === 'dislike') {
      setClickedLike('');
      setDislikesCount(dislikesCount - 1);
      axios.put('http://localhost:3000/api/likes', {
        id,
        dislikes: dislikesCount - 1,
      });
    }
  };

  const closeExpandedPhoto = (e) => {
    if (e.target.id === 'photo-modal') {
      setExpandPhoto(false);
    }
  }

  return (
    <div className="flex flex-col items-center rounded-lg overflow-hidden bg-neutral-700 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] max-h-[600px] max-w-[400px] m-2 relative">
      <div className="flex items-center justify-center relative w-full h-[90%]">
        <button onClick={() => setExpandPhoto(true)}>
          <img
            src={url}
            alt=''
            className="w-full h-auto"
          />
        </button>
      </div>
      <div className="my-2 text-xl">
        {title}
      </div>
      <div className="my-2 flex justify-around w-full">
        <div className="flex items-center">
          <button onClick={handleLike}>
            <FontAwesomeIcon icon={faArrowUp} className={`mr-2 hover:text-sky-400 ${clickedLike === 'like' ? 'text-sky-600' : ''}`} size="xl" />
          </button>
          <span className="text-lg">{likesCount}</span>
        </div>
        <div className="flex items-center">
          <button onClick={handleDislike}>
            <FontAwesomeIcon icon={faArrowDown} className={`mr-2 hover:text-red-400 ${clickedLike === 'dislike' ? 'text-red-600' : ''}`} size="xl" />
          </button>
          <span className="text-lg">{dislikesCount}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEye} className="mr-2" size="xl"/>
          <div className="text-lg">{viewCount}</div>
        </div>
      </div>
      {
        expandPhoto
        ? (
          <div id="photo-modal" onClick={closeExpandedPhoto} className="flex justify-center items-center fixed z-10 left-0 top-0 w-full h-full bg-black/50">
            <button type="button" onClick={() => setExpandPhoto(false)} className="text-white absolute top-3 right-4 cursor-pointer border-none bg-none text-6xl">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <img
              src={url}
              alt=''
              className="max-w-[75vw] max-h-[90vh]"
            />
          </div>
        ) : null
      }
    </div>
  );
}