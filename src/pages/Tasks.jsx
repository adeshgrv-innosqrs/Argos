import { useEffect, useState } from 'react';
import InstructionGuide from '../components/InstructionGuide';
import Navbar from '../components/Navbar';
import QuestionsPanel from '../components/QuestionPanel';
import SearchEngine from '../components/SearchEngine';

const tasks = [
  {
    serialNumber: 1,
    question: {
      text: "What are the latest developments in artificial intelligence for healthcare applications?",
      category: "Technology"
    }
  },
  {
    serialNumber: 2,
    question: {
      text: "How does climate change affect ocean currents?",
      category: "Science"
    }
  },
  {
    serialNumber: 3,
    question: {
      text: "What are the economic implications of cryptocurrency adoption?",
      category: "Finance"
    }
  }
];

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-3 rounded shadow text-center">
      <div className="text-sm font-medium text-gray-600">Timer</div>
      <div className="text-2xl font-bold text-gray-700">{formatTime(time)}</div>
    </div>
  );
};

const InfoPanel = ({ question, category, onShowInstructions }) => (
  <div className="bg-white p-4 rounded shadow">
    <div className="flex items-start justify-between">
      <Timer />

      <div className="flex-1 text-center px-4">
        <h1 className="text-xl font-bold text-gray-800">{question}</h1>
      </div>

      <div className="flex flex-col items-end justify-between h-full space-y-2">
        <div className="bg-[#E0FFE0] px-2 py-1 rounded text-xs font-semibold text-black">
          Category: {category}
        </div>

        <button
          onClick={onShowInstructions}
          className="text-xs font-semibold bg-[#E0FFE0] px-3 py-1 rounded-full shadow transition-colors"
        >
          Show Instructions
        </button>

        <div className="flex space-x-1 pt-2">
          <button className="p-1 rounded-full bg-[#E9F1FA] hover:bg-[#00ABE4] hover:text-white transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-1 rounded-full bg-[#E9F1FA] hover:bg-[#00ABE4] hover:text-white transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SubmitSection = ({ locked, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!locked) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onSubmit();
  };

  return (
    <div className="bg-white p-6 rounded shadow text-center">
      {isSubmitting ? (
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00ABE4]"></div>
          <span className="text-[#00ABE4] font-semibold">Submitting...</span>
        </div>
      ) : (
        <>
          <button
            disabled={!locked}
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-md text-white font-semibold text-lg transition-colors ${
              locked ? 'bg-[#00ABE4] hover:bg-[#0093c4] cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {locked ? 'Submit' : 'Complete All Responses to Submit'}
          </button>
          {!locked && (
            <p className="text-sm text-red-500 mt-2">
              Please answer all questions and lock your responses before submitting.
            </p>
          )}
        </>
      )}
    </div>
  );
};

const Tasks = () => {
  const currentSerial = 1;
  const task = tasks.find(t => t.serialNumber === currentSerial);

  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleSubmit = () => {
    alert('Annotation submitted successfully!');
    setAnswers({});
    setLocked(false);
  };

  if (!task) {
    return (
      <div className="bg-[#E9F1FA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Task Not Found</h1>
          <p className="text-gray-600">The requested task could not be found.</p>
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
        />

        <div className="grid grid-cols-12 gap-5" style={{ minHeight: '600px' }}>
          <div className="col-span-12 lg:col-span-7">
            <QuestionsPanel
              answers={answers}
              setAnswers={setAnswers}
              locked={locked}
              setLocked={setLocked}
            />
          </div>

          <div className="col-span-12 lg:col-span-5">
            <SearchEngine query={task.question.text} />
          </div>
        </div>

        <SubmitSection locked={locked} onSubmit={handleSubmit} />
      </div>

      {showGuide && <InstructionGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
};

export default Tasks;
