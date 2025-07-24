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
export default HistoryPanel;