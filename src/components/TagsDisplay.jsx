export default function TagsDisplay({ tags, filterPostsByTag }) {

  return (
    <div className="w-full flex justify-center">
      {
        tags?.map(
          (tagObj) => (
            <button
              key={tagObj.tag}
              value={tagObj.tag}
              onClick={(e) => filterPostsByTag(e.target.value)}
              className="text-sm bg-slate-600 px-3 py-1 mx-1 rounded-full hover:bg-slate-500">
              {tagObj.tag}
            </button>)
          )
      }
    </div>
  )
}
