import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faEye, faComment } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
const { useState, useEffect } = React;

export default function Card({ post }) {
  const { id, title, url, likes, dislikes, views } = post;
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDislikesCount] = useState(dislikes);
  const [clickedLike, setClickedLike] = useState('');
  const [viewCount, setViewCount] = useState(views);

  useEffect(() => {
    setViewCount(oldView => oldView + 1);
    axios.put('http://localhost:3000/api/views', { id });
  }, [id]);

  const handleLike = () => {
    if (clickedLike === 'dislike') {
      setClickedLike('like');
      setLikesCount(likesCount + 1);
      setDislikesCount(dislikesCount - 1);
    } else if (clickedLike === '') {
      setClickedLike('like');
      setLikesCount(likesCount + 1);
    }
  }
  const handleDislike = () => {
    if (clickedLike !== 'dislike') {
      console.log('THIS IS A DISLIKE');
      setDislikesCount(dislikesCount + 1);
      setClickedLike('dislike');
    }
    if (clickedLike === 'like') {
      setClickedLike('dislike');
      setDislikesCount(dislikesCount + 1);
      setLikesCount(likesCount - 1);
    } else if (clickedLike === '') {
      setClickedLike('dislike');
      setDislikesCount(dislikesCount + 1);
    }
  }

  return (
    <div className="flex flex-col items-center rounded-lg overflow-hidden bg-neutral-700 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] max-h-[600px] max-w-[400px] m-2 relative">
      <div className="flex items-center justify-center relative w-full h-[90%]">
        <img
          src={url}
          alt=''
          className="w-full h-auto"
        />
      </div>
      <div className="my-2">
        {title}
      </div>
      <div className="my-2 flex justify-around w-full">
        <div className="flex items-center">
          <button onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
          </button>
          <span className="mr-2">{likesCount}</span>
        </div>
        <div className="flex items-center">
          <button onClick={handleDislike}>
            <FontAwesomeIcon icon={faThumbsDown} className="mr-2" />
          </button>
          <span>{dislikesCount}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEye} className="mr-2"/>
          <div>{viewCount}</div>
        </div>
      </div>
    </div>
  )
}