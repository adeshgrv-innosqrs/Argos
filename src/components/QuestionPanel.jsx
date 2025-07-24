const QuestionPanel = ({ question, category }) => (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h2 className="text-xl font-bold text-[#00ABE4]">{question}</h2>
      <span className="text-sm font-medium text-gray-500">Category: {category}</span>
    </div>
  );
  export default QuestionPanel;