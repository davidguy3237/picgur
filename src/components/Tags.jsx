import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Tags({ tags, addTag }) {

  const handleClick = () => {
    const newTag = document.querySelector('#add-tag').value;
    addTag(newTag);
    document.querySelector('#add-tag').value = '';
  }

  return (
    <div className="flex my-3">
      {
        tags.length < 5
        ? (
          <div>
            <input
              id="add-tag"
              type="text"
              placeholder="Add a tag"
              className="bg-slate-800 border-2 h-10 p-1 border-slate-500 focus:border-slate-400 focus:outline-none"/>
            <button
              type="button"
              onClick={handleClick}
              className="text-base px-3 py-1 mx-3 rounded-md bg-slate-600 hover:bg-slate-500">
              <FontAwesomeIcon icon={faPlus} className="mr-2"/>
              Tag
            </button>
          </div>
        )
        : null
      }
    </div>
  )
}
