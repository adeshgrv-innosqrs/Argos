import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchEngine from '../components/SearchEngine';
import ResponsePanel from '../components/ResponsePanel';
import { SubmitSection } from '../components/ResponseCompo';

function PMResponse() {
  const [response1Answers, setResponse1Answers] = useState({});
  const [response2Answers, setResponse2Answers] = useState({});
  const [response1Locked, setResponse1Locked] = useState(false);
  const [response2Locked, setResponse2Locked] = useState(false);

  const handleSubmit = () => {
    
  };

  return (
    <div className="bg-[#f5f9fc] min-h-screen">
      <Navbar active={false} />

      <div className="p-6 space-y-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h1 className="text-xl font-bold text-gray-800">PM Response Evaluation</h1>
          <div className="mt-2">
            <span className="bg-[#E0FFE0] px-3 py-1 rounded text-sm font-semibold text-black inline-block">
              Category: Product Management
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 min-h-[600px]">
          <div className="col-span-12 lg:col-span-4">
            <ResponsePanel
              title="Response 1 Evaluation"
              answers={response1Answers}
              setAnswers={setResponse1Answers}
              locked={response1Locked}
              setLocked={setResponse1Locked}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <ResponsePanel
              title="Response 2 Evaluation"
              answers={response2Answers}
              setAnswers={setResponse2Answers}
              locked={response2Locked}
              setLocked={setResponse2Locked}
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="h-full bg-white rounded p-4 shadow">
              <SearchEngine query="Product management best practices" />
            </div>
          </div>
        </div>

        <SubmitSection
          response1Answers={response1Answers}
          response2Answers={response2Answers}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default PMResponse;
