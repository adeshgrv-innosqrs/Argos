import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchEngine from '../components/SearchEngine';
import QuestionsPanel from '../components/QuestionPanel';

// Mock data - replace with your actual imports
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
 

// Timer Component
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
            <div className="text-2xl font-bold text-[#00ABE4]">{formatTime(time)}</div>
        </div>
    );
};

// Info Panel Component
const InfoPanel = ({ question, category }) => (
    <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between">
            <Timer />
            <div className="flex-1 text-center px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{question}</h1>
            </div>
            <div className="bg-[#E9F1FA] px-4 py-2 rounded">
                <span className="text-sm font-semibold text-[#00ABE4]">Category: {category}</span>
            </div>
        </div>
    </div>
);




// Submit Section Component
const SubmitSection = ({ locked, onSubmit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!locked) return;

        setIsSubmitting(true);
        // Simulate API call
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
                        className={`px-8 py-3 rounded-md text-white font-semibold text-lg transition-colors ${locked
                                ? 'bg-[#00ABE4] hover:bg-[#0093c4] cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        {locked ? 'Submit Annotation' : 'Complete All Responses to Submit'}
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

// Main Task Component
const Tasks = () => {
    // Mock serial number - replace with actual routing logic
    const currentSerial = 1;
    const task = tasks.find(t => t.serialNumber === currentSerial);

    const [answers, setAnswers] = useState({});
    const [locked, setLocked] = useState(false);

    const handleSubmit = () => {
        alert('Annotation submitted successfully!');
        // Reset form if needed
        setAnswers({});
        setLocked(false);
    };

    const handleSerialSelect = (serial) => {
        // In a real app, you'd use navigate here
        console.log(`Navigate to task ${serial}`);
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
                {/* Info Panel */}
                <InfoPanel
                    question={task.question.text}
                    category={task.question.category}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6" style={{ minHeight: '600px' }}>
                    {/* Index Panel - 10% width */}
                    {/* <div className="col-span-12 lg:col-span-1">
                        <IndexPanel
                            tasks={tasks}
                            currentSerial={currentSerial}
                            onSerialSelect={handleSerialSelect}
                        />
                    </div> */}

                    {/* Questions Panel - 50% width */}
                    <div className="col-span-12 lg:col-span-6">
                        <QuestionsPanel
                            answers={answers}
                            setAnswers={setAnswers}
                            locked={locked}
                            setLocked={setLocked}
                        />
                    </div>

                    {/* Search Engine - 40% width */}
                    <div className="col-span-12 lg:col-span-6">
                        <SearchEngine query={task.question.text} />
                    </div>
                </div>

                {/* History Panel */}
                {/* <HistoryPanel /> */}

                {/* Submit Section */}
                <SubmitSection locked={locked} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default Tasks;