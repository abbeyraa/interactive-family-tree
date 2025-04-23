import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk GET data
  const fetchTestData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get("http://localhost:5000/api/family");
      setData(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("GET Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk POST data
  const postTestData = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("http://localhost:5000/api/test", {
        name: inputValue,
        value: Math.random().toFixed(2),
      });
      setData(data);
      setInputValue("");
      fetchTestData(); // Refresh data setelah POST
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("POST Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Lifecycle untuk initial fetch
  useEffect(() => {
    fetchTestData();
  }, []);

  return (
    <section className="test-container">
      <header>
        <h1 className="text-2xl font-bold">MongoDB Connection Test</h1>
        <p className="text-gray-600">Testing FE-BE-MongoDB integration</p>
      </header>

      <div className="test-section">
        <h2 className="text-xl font-semibold">GET Test</h2>
        <button
          onClick={fetchTestData}
          disabled={isLoading}
          className={`btn ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>

      <div className="test-section">
        <h2 className="text-xl font-semibold">POST Test</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter test name"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={postTestData}
            disabled={isLoading || !inputValue.trim()}
            className={`btn ${
              isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isLoading ? "Sending..." : "Send Data"}
          </button>
        </div>
      </div>

      {/* Response Display */}
      <div className="response-container">
        <h2 className="text-xl font-semibold">API Response</h2>

        {error && (
          <div className="error-message">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        <pre className="response-data">{JSON.stringify(data, null, 2)}</pre>
      </div>

      {/* MongoDB Data Display */}
      {data?.data && (
        <div className="mongo-data">
          <h2 className="text-xl font-semibold">MongoDB Records</h2>
          <ul className="data-list">
            {data.data.map((item) => (
              <li key={item._id} className="data-item">
                <span>{item.name}</span>
                <span>Value: {item.value}</span>
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default App;
