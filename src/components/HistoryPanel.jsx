const HistoryPanel = () => (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-bold text-lg mb-2">Previous Responses</h3>
      <div className="space-y-2">
        <div className="border p-2 rounded bg-[#E9F1FA]">Annotation 1 - Pending</div>
        <div className="border p-2 rounded bg-green-100">Annotation 2 - Completed</div>
      </div>
    </div>
  );
  export default HistoryPanel;