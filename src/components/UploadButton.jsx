import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function UploadButton({ toggleModal }) {
  const openModal = () => {
    toggleModal(true);
  }
  return (
      <button className="bg-sky-600 h-12 py-2 px-4 rounded-sm cursor-pointer flex items-center text-lg hover:bg-sky-500" onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} size="lg" className="mr-2"/>
        New Post
      </button>
  )
}