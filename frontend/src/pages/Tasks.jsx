import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InstructionGuide from '../components/InstructionGuide';
import Navbar from '../components/Navbar';
import QuestionsPanel from '../components/QuestionPanel';
import SearchEngine from '../components/SearchEngine';
import allTasks from '../data/tasks.json';

// Pure display Timer component
const Timer = ({ time }) => {
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  return (
    <div className="bg-white p-3 rounded shadow text-center">
      <div className="text-sm font-medium text-gray-600">Timer</div>
      <div className="text-2xl font-bold text-gray-700">{formatTime(time)}</div>
    </div>
  );
};

const InfoPanel = ({
  question,
  category,
  onShowInstructions,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
  time,
}) => (
  <div className="bg-white p-4 rounded shadow">
    <div className="flex items-start justify-between">
      <Timer time={time} />
      <div className="flex-1 text-center px-4">
        <h1 className="text-xl font-bold text-gray-800">{question}</h1>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <div className="bg-[#E0FFE0] px-2 py-1 rounded text-xs font-semibold text-black">
          Category: {category}
        </div>
        <button
          onClick={onShowInstructions}
          className="text-xs font-semibold bg-[#E0FFE0] px-3 py-1 rounded-full shadow"
        >
          Show Instructions
        </button>
        <div className="flex space-x-1 pt-2">
          <button
            onClick={onPrev}
            disabled={disablePrev}
            className="p-1 rounded-full bg-[#E9F1FA] hover:bg-[#00ABE4] hover:text-white disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={onNext}
            disabled={disableNext}
            className="p-1 rounded-full bg-[#E9F1FA] hover:bg-[#00ABE4] hover:text-white disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ConfirmDialog = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md text-center w-[300px]">
      <p className="text-lg font-semibold text-gray-800 mb-4">
        Are you sure you want to submit?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-[#00ABE4] hover:bg-[#0093c4] text-white font-bold px-4 py-2 rounded"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded"
        >
          No
        </button>
      </div>
    </div>
  </div>
);

const SubmitSection = ({ answers, onSubmit }) => {
  const [showDialog, setShowDialog] = useState(false);
  const isComplete = Object.values(answers).filter(Boolean).length === 6;

  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <button
        disabled={!isComplete}
        onClick={() => setShowDialog(true)}
        className={`px-8 py-3 rounded-md text-white font-semibold text-lg transition-colors ${
          isComplete ? 'bg-[#00ABE4] hover:bg-[#0093c4]' : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {isComplete ? 'Submit' : 'Answer All 6 Questions to Submit'}
      </button>
      {!isComplete && (
        <p className="text-sm text-red-500 mt-2">
          Please answer all questions before submitting.
        </p>
      )}

      {showDialog && (
        <ConfirmDialog
          onConfirm={() => {
            setShowDialog(false);
            onSubmit();
          }}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

const Tasks = () => {
  const { serialNumber } = useParams();
  const navigate = useNavigate();
  const annotator = 'Ibrahim';
  const filteredTasks = allTasks.filter((t) => t.annotator === annotator);
  const [answers, setAnswers] = useState({});
  const [showGuide, setShowGuide] = useState(false);
  const [time, setTime] = useState(0); // Timer state

  const currentIndex = filteredTasks.findIndex((t) => t.serialNumber === serialNumber);
  const task = filteredTasks[currentIndex];

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Optional: reset timer when question changes
  useEffect(() => {
    setTime(0);
  }, [serialNumber]);

  const goToTask = (index) => {
    if (index >= 0 && index < filteredTasks.length) {
      navigate(`/tasks/${filteredTasks[index].serialNumber}`);
    }
  };

  const handleSubmit = () => {
    alert('Annotation submitted successfully!');
    setAnswers({});
  };

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
      <Navbar active={true} />
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
        />
        <div className="grid grid-cols-12 gap-5" style={{ minHeight: '600px' }}>
          <div className="col-span-12 lg:col-span-7">
            <QuestionsPanel answers={answers} setAnswers={setAnswers} />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <SearchEngine query={task.question.text} />
          </div>
        </div>
        <SubmitSection answers={answers} onSubmit={handleSubmit} />
      </div>
      {showGuide && <InstructionGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
};

export default Tasks;
