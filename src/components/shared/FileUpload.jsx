import { useState, useRef } from "react";

export const FileUpload = ({
  onFileSelect,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 10,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const validateFile = (file) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Please upload PDF, JPG, or PNG.");
      return false;
    }
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB.`);
      return false;
    }
    return true;
  };

  const handleFile = (file) => {
    setError("");
    if (validateFile(file)) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive
            ? "border-primary bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type='file'
          accept={accept}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) handleFile(file);
          }}
          className='hidden'
        />
        {fileName ? (
          <div className='text-sm'>
            <p className='text-gray-700 font-medium'>{fileName}</p>
            <p className='text-gray-500 mt-1'>Click to change file</p>
          </div>
        ) : (
          <div>
            <svg
              className='mx-auto h-8 w-8 text-gray-400 mb-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
            <p className='text-sm text-gray-600'>
              Drag and drop your file here, or{" "}
              <span className='text-primary font-medium'>browse</span>
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              PDF, JPG, or PNG (max {maxSize}MB)
            </p>
          </div>
        )}
      </div>
      {error && <p className='mt-2 text-xs text-red-500'>{error}</p>}
    </div>
  );
};
