import React, { useState, useEffect } from 'react';

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

// Navbar Component
const Navbar = ({ active }) => (
    <nav className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-[#00ABE4]">Argos</div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">Active Session</span>
                </div>
                <button className="px-4 py-2 bg-[#00ABE4] text-white rounded hover:bg-[#0093c4]">
                    Profile
                </button>
            </div>
        </div>
    </nav>
);


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

// Index Panel Component
// const IndexPanel = ({ tasks, currentSerial, onSerialSelect }) => (
//     <div className="bg-white p-4 rounded shadow h-full">
//         <h3 className="font-bold text-lg mb-4 text-gray-800">Index</h3>
//         <div className="space-y-1 text-sm max-h-96 overflow-y-auto">
//             {tasks.map((task) => (
//                 <div
//                     key={task.serialNumber}
//                     onClick={() => onSerialSelect(task.serialNumber)}
//                     className={`px-2 py-1 rounded cursor-pointer transition-colors ${task.serialNumber === currentSerial
//                             ? 'bg-[#00ABE4] text-white font-semibold'
//                             : 'bg-[#E9F1FA] hover:bg-gray-200'
//                         }`}
//                 >
//                     {task.serialNumber}
//                 </div>
//             ))}
//         </div>
//     </div>
// );

// Questions Panel Component
const QuestionsPanel = ({ answers, setAnswers, locked, setLocked }) => {
    const questions = [
        { id: 'intelligible', text: 'Is the query intelligible?' },
        { id: 'infoSeeking', text: 'Is the query info-seeking?' },
        { id: 'ambiguous', text: 'Is the query ambiguous?' },
        { id: 'timeSensitive', text: 'Is the query time sensitive?' },
        { id: 'trending', text: 'Is the query currently trending in the news?' },
        { id: 'harmful', text: 'Does the query have harmful intent or ask about sensitive topics?' }
    ];

    const handleAnswerChange = (questionId, field, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                [field]: value
            }
        }));
    };

    const allAnswered = questions.every(q =>
        answers[q.id]?.answer && answers[q.id]?.remark?.trim()
    );

    return (
        <div className="bg-white p-6 rounded shadow h-full">
            <div className="mb-4">
                <h3 className="font-bold text-lg text-gray-800 bg-[#E9F1FA] p-3 rounded">
                    Conversation History
                </h3>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto">
                {questions.map((question) => (
                    <div key={question.id} className="border-b pb-4">
                        <p className="font-bold text-gray-800 mb-3">{question.text}</p>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-4">
                                <span className="text-red-500 font-bold">*</span>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={`${question.id}_answer`}
                                        value="yes"
                                        checked={answers[question.id]?.answer === 'yes'}
                                        onChange={(e) => handleAnswerChange(question.id, 'answer', e.target.value)}
                                        disabled={locked}
                                        className="text-[#00ABE4]"
                                    />
                                    <span className="font-semibold">Yes</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={`${question.id}_answer`}
                                        value="no"
                                        checked={answers[question.id]?.answer === 'no'}
                                        onChange={(e) => handleAnswerChange(question.id, 'answer', e.target.value)}
                                        disabled={locked}
                                        className="text-[#00ABE4]"
                                    />
                                    <span className="font-semibold">No</span>
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <span className="text-red-500 font-bold">*</span>
                                <span className="font-semibold text-gray-700">Remarks:</span>
                                <input
                                    type="text"
                                    placeholder="Enter your remarks..."
                                    value={answers[question.id]?.remark || ''}
                                    onChange={(e) => handleAnswerChange(question.id, 'remark', e.target.value)}
                                    disabled={locked}
                                    className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00ABE4] disabled:bg-gray-100"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t">
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        checked={locked}
                        onChange={(e) => setLocked(e.target.checked)}
                        disabled={!allAnswered}
                        className="w-5 h-5 text-[#00ABE4] rounded focus:ring-[#00ABE4]"
                    />
                    <span className="font-semibold text-gray-800">
                        Lock your answers {!allAnswered && <span className="text-red-500">*</span>}
                    </span>
                </label>
                {!allAnswered && (
                    <p className="text-sm text-red-500 mt-2 ml-8">
                        Please answer all questions and provide remarks before locking.
                    </p>
                )}
            </div>
        </div>
    );
};

// Search Engine Component
const SearchEngine = ({ query }) => (
    <div className="bg-white p-4 rounded shadow h-full">
        <div className="mb-4">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Search Engine</h3>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Paste your question here to search..."
                    defaultValue={query}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ABE4] text-sm"
                />
                <button className="absolute right-2 top-2 px-4 py-1 bg-[#00ABE4] text-white rounded text-sm hover:bg-[#0093c4]">
                    Search
                </button>
            </div>
        </div>

        <div className="bg-[#E9F1FA] h-80 rounded-lg p-4 overflow-y-auto">
            <div className="space-y-4">
                <div className="bg-white p-3 rounded shadow-sm border-l-4 border-[#00ABE4]">
                    <h4 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                        Sample Search Result 1
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                        This is a sample search result that would appear when you search for your query...
                    </p>
                    <span className="text-xs text-green-600">www.example1.com</span>
                </div>

                <div className="bg-white p-3 rounded shadow-sm border-l-4 border-[#00ABE4]">
                    <h4 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                        Sample Search Result 2
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                        Another sample search result with relevant information about your query...
                    </p>
                    <span className="text-xs text-green-600">www.example2.com</span>
                </div>

                <div className="bg-white p-3 rounded shadow-sm border-l-4 border-[#00ABE4]">
                    <h4 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                        Sample Search Result 3
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                        Additional search result providing more context and information...
                    </p>
                    <span className="text-xs text-green-600">www.example3.com</span>
                </div>

                <div className="text-center text-gray-400 italic mt-6">
                    Search results will appear here when integrated with actual search API
                </div>
            </div>
        </div>
    </div>
);

// History Panel Component
const HistoryPanel = () => (
    <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Previous Responses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">Annotation 1</span>
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                        Pending
                    </span>
                </div>
                <p className="text-sm text-gray-600">
                    Previous annotation details will be displayed here...
                </p>
                <div className="text-xs text-gray-500 mt-2">2 hours ago</div>
            </div>

            <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">Annotation 2</span>
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                        Completed
                    </span>
                </div>
                <p className="text-sm text-gray-600">
                    Completed annotation with all responses submitted...
                </p>
                <div className="text-xs text-gray-500 mt-2">1 day ago</div>
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
                    <div className="col-span-12 lg:col-span-5">
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