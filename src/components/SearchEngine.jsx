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

export default SearchEngine;