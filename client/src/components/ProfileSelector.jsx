import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfileSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewURL(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImgChange}
        className="hidden"
      />

      {previewURL ? (
        // Show image preview and delete button
        <div className="relative">
          <img
            src={previewURL}
            alt="Profile Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center text-white bg-red-500 rounded-full absolute bottom-1 right-1"
          >
            <LuTrash />
          </button>
        </div>
      ) : (
        // Default user icon with upload button
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-indigo-500" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center text-white bg-indigo-500 rounded-full absolute bottom-1 right-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
