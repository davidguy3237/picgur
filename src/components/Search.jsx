/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
const { useState, useEffect } = React;

export default function Search({ updatePosts }) {
  const [search, setSearch] = useState('');
  let searchTimeout = null;

  useEffect(() => {
    searchTimeout = setTimeout(() => updatePosts(search), 500);
    return () => clearTimeout(searchTimeout)
  }, [search])

  return(
    <input type="search" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className="mr-10 h-8 p-1 border-2 border-sky-600 bg-[#121212] focus:border-sky-500 focus:outline-none"/>
  )
}
