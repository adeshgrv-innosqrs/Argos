const SubmitSection = ({ onSubmit, locked }) => (
    <div className="mt-4 text-center">
      <button
        disabled={!locked}
        onClick={onSubmit}
        className={`px-6 py-2 rounded-md text-white font-semibold ${locked ? 'bg-[#00ABE4] hover:bg-#E0FFE0]' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        {locked ? 'Submit' : 'Lock your answers to submit'}
      </button>
    </div>
  );
  export default SubmitSection;