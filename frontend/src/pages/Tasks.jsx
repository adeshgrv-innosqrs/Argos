import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import InstructionGuide from '../components/InstructionGuide';
import Navbar from '../components/Navbar';
import QuestionsPanel from '../components/QuestionPanel';
import SearchEngine from '../components/SearchEngine';
import allTasks from '../data/tasks.json';


const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6 text-center">
          <FaCheckCircle className="text-green-600 text-5xl mx-auto mb-4" />
          <p className="text-gray-700 text-lg mb-6">{message}</p>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-[#008ec2] transition-colors"
          >
            Proceed to Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const Notification = ({ message, type = 'error', onClose }) => {
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

const Timer = ({ time, isActive }) => {
  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  
  return (
    <div className={`p-3 rounded shadow text-center transition-colors ${
      isActive ? 'bg-green-100' : 'bg-red-100'
    }`}>
      <div className="text-sm font-medium text-gray-600">Timer</div>
      <div className={`text-2xl font-bold ${
        isActive ? 'text-green-700' : 'text-red-700'
      }`}>
        {formatTime(time)}
      </div>
      {!isActive && (
        <div className="text-xs text-red-600 mt-1">Paused - Move cursor to resume</div>
      )}
    </div>
  );
};

const InfoPanel = ({ question, category, onShowInstructions, onPrev, onNext, disablePrev, disableNext, time, isTimerActive }) => (
  <div className="bg-white p-4 rounded shadow">
    <div className="flex items-start justify-between">
      <Timer time={time} isActive={isTimerActive} />
      <div className="flex-1 text-center px-4">
        <h1 className="text-xl font-bold text-gray-800">{question}</h1>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <button onClick={onShowInstructions} className="text-xs font-semibold bg-[#E0FFE0] px-3 py-1 rounded-full shadow">Show Instructions</button>
        <div className="flex space-x-1 pt-2">
          <button onClick={onPrev} disabled={disablePrev} className="p-1 rounded-full bg-[#E9F1FA] hover:bg-[#00ABE4] hover:text-white disabled:opacity-50">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={onNext} disabled={disableNext} className="p-1 rounded-full bg-[#E9F1FA] hover:bg-[#00ABE4] hover:text-white disabled:opacity-50">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SubmitSection = ({ canSubmit, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSubmitClick = () => {
    if (!canSubmit) return;
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setNotification({ message: '✅ Your answers have been submitted successfully!', type: 'success' });
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
            disabled={!canSubmit}
            onClick={handleSubmitClick}
            className={`px-8 py-3 rounded-md text-white font-semibold text-lg transition-colors ${
              canSubmit ? 'bg-green-600 hover:bg-green-400' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {canSubmit ? 'Submit' : 'Complete All Responses to Submit'}
          </button>
          {!canSubmit && <p className="text-sm text-red-500 mt-2">Please answer all questions before submitting.</p>}
        </>
      )}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmSubmit}
        title="Confirm Submission"
        message="Confirm your answers and proceed to submit. Once submitted, you cannot make any changes."
      />
    </div>
  );
};

const Tasks = () => {
  const { serialNumber } = useParams();
  const navigate = useNavigate();
  const annotator = 'Ibrahim';
  const filteredTasks = allTasks.filter(t => t.annotator === annotator);
  const [answers, setAnswers] = useState({});
  const [showGuide, setShowGuide] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());

  const currentIndex = filteredTasks.findIndex(t => t.serialNumber === serialNumber);
  const task = filteredTasks[currentIndex];

  const canSubmit = Object.keys(answers).length > 0; 

  const goToTask = (index) => {
    if (index >= 0 && index < filteredTasks.length) {
      setTime(0); 
      navigate(`/tasks/${filteredTasks[index].serialNumber}`);
    }
  };

  const handleSubmit = () => {
    console.log('Annotation submitted successfully with answers:', answers);
    setAnswers({});
  };

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = () => {
      setLastMouseMove(Date.now());
      if (!isTimerActive) {
        setIsTimerActive(true);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isTimerActive]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMouseMove;
      
      if (timeSinceLastMove >= 60000) {
        setIsTimerActive(false);
      } else {
        setIsTimerActive(true);
        setTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastMouseMove]);

  useEffect(() => {
    if (!serialNumber && filteredTasks.length > 0) {
      navigate(`/tasks/${filteredTasks[0].serialNumber}`);
    }
  }, [serialNumber, filteredTasks]);

  if (!task) {
    return (
      <div className="bg-[#E9F1FA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Task Not Found</h1>
          <p className="text-gray-600">No tasks available for this annotator.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E9F1FA] min-h-screen">
      <Navbar active={isTimerActive} />
      <div className="p-6 space-y-6">
        <InfoPanel
          question={task.question.text}
          category={task.question.category}
          onShowInstructions={() => setShowGuide(true)}
          onPrev={() => goToTask(currentIndex - 1)}
          onNext={() => goToTask(currentIndex + 1)}
          disablePrev={currentIndex <= 0}
          disableNext={currentIndex >= filteredTasks.length - 1}
          time={time}
          isTimerActive={isTimerActive}
        />
        <div className="grid grid-cols-12 gap-5 min-h-[600px]">
          <div className="col-span-12 lg:col-span-7">
            <div className="h-full bg-white rounded p-4 shadow overflow-y-auto">
              <QuestionsPanel 
                answers={answers} 
                setAnswers={setAnswers} 
                locked={false} 
                setLocked={() => {}} 
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="h-full bg-white rounded p-4 shadow">
              <SearchEngine query={task.question.text} />
            </div>
          </div>
        </div>
        <SubmitSection canSubmit={canSubmit} onSubmit={handleSubmit} />
      </div>
      {showGuide && <InstructionGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
};

export default Tasks;