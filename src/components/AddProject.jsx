import { useState } from 'react';
import { FaTimes, FaUpload, FaFile } from 'react-icons/fa';

const AddProject = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/json" || file.name.endsWith('.json')) {
        setSelectedFile(file);
      } else {
        alert('Please select a JSON file');
      }
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/json" || file.name.endsWith('.json')) {
        setSelectedFile(file);
      } else {
        alert('Please select a JSON file');
      }
    }
  };

  // Handle upload
  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically process the file
      console.log('Uploading file:', selectedFile.name);
      
      // For demo purposes, just show success message
      alert(`Project "${selectedFile.name}" uploaded successfully!`);
      
      // Reset and close
      setSelectedFile(null);
      onClose();
    }
  };

  // Reset when modal closes
  const handleClose = () => {
    setSelectedFile(null);
    setDragActive(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 !bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Add New Project</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Add your JSON project here
          </p>

          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-[#00ABE4] bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center">
              <FaUpload className="text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your JSON file here, or{' '}
                <span className="text-[#00ABE4] font-semibold">click to browse</span>
              </p>
              <p className="text-sm text-gray-400">Only JSON files are supported</p>
            </div>
          </div>

          {/* Selected File Display */}
          {selectedFile && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <FaFile className="text-[#00ABE4] mr-3" />
                <div>
                  <p className="font-medium text-gray-800">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTimes size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              selectedFile
                ? 'bg-[#00ABE4] text-white hover:bg-[#008ec2]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Upload Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;