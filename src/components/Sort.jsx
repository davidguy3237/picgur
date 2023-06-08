export default function Sort({ updateSort }) {

  return (
    <div>
      <select
      defaultValue="likes"
      onChange={(e) => updateSort(e.target.value)}
      className="bg-transparent border-b-2 border-solid border-sky-600 h-8 w-fit text-lg hover:border-sky-400 cursor-pointer">
        <option value="likes DESC" className="text-black text-lg">Most Likes</option>
        <option value="dislikes DESC" className="text-black text-lg">Most Dislikes</option>
        <option value="createdat DESC" className="text-black text-lg">Newest</option>
        <option value="createdat" className="text-black text-lg">Oldest</option>
      </select>
    </div>
  )
}
