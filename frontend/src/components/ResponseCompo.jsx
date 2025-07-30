import React, { useState } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6 text-center">
          <FaCheckCircle className="text-[#00ABE4] text-5xl mx-auto mb-4" />
          <p className="text-gray-700 text-lg mb-6">{message}</p>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-6 py-2 bg-[#00ABE4] text-white rounded-lg font-semibold hover:bg-[#008ec2] transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export const Notification = ({ message, type = 'error', onClose }) => {
  if (!message) return null;

  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-red-100 border-red-400 text-red-700';
    }
  };

  return (
    <div className={`${getNotificationStyles()} px-4 py-3 rounded relative text-center text-sm border mb-4 flex items-center justify-between`}>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 text-current hover:opacity-70">
          <FaTimes size={12} />
        </button>
      )}
    </div>
  );
};

export const SubmitSection = ({ response1Answers, response2Answers, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const hasResponse1Answers = Object.keys(response1Answers).some(key =>
    response1Answers[key]?.answer && response1Answers[key]?.remark?.trim()
  );

  const hasResponse2Answers = Object.keys(response2Answers).some(key =>
    response2Answers[key]?.answer && response2Answers[key]?.remark?.trim()
  );

  const hasAnswers = hasResponse1Answers || hasResponse2Answers;

  const handleSubmitClick = () => {
    if (!hasAnswers) return;
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setNotification({ message: '✅ All responses have been submitted successfully!', type: 'success' });
    setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    onSubmit();
  };

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const clearNotification = () => setNotification({ message: '', type: '' });

  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <Notification message={notification.message} type={notification.type} onClose={clearNotification} />
      {isSubmitting ? (
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00ABE4]"></div>
          <span className="text-[#00ABE4] font-semibold">Submitting...</span>
        </div>
      ) : (
        <>
          <button
            disabled={!hasAnswers}
            onClick={handleSubmitClick}
            className={`px-8 py-3 rounded-md text-white font-semibold text-lg transition-colors ${
              hasAnswers ? 'bg-[#00ABE4] hover:bg-[#0093c4]' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {hasAnswers ? 'Submit All Responses' : 'Complete Responses to Submit'}
          </button>
          {!hasAnswers && <p className="text-sm text-red-500 mt-2">Please complete at least one response before submitting.</p>}
        </>
      )}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmSubmit}
        title="Confirm Submission"
        message="Are you sure you want to submit all responses? Once submitted, you cannot make any changes."
      />
    </div>
  );
};
