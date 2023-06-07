import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function UploadButton({ toggleModal }) {
  const openModal = () => {
    toggleModal(true);
  }
  return (
      <button className="bg-sky-600 h-8 p-2 rounded-sm cursor-pointer flex items-center" onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} size="lg" className="mr-2"/>
        New Post
      </button>
  )
}