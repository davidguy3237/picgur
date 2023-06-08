/* eslint-disable react-hooks/exhaustive-deps */
export default function Search({ updateSearch }) {

  return(
    <input
      type="search"
      placeholder="Search..."
      onChange={(e) => updateSearch(e.target.value)}
      className="text-lg mr-10 h-12 w-[400px] px-3 border-2 border-sky-600 bg-[#121212] focus:border-sky-400 focus:outline-none"/>
  )
}
