import React, { useState, useEffect } from "react";
import { databases, appwriteConfig } from "../../lib/appwrite/config";
import { Models } from "appwrite";
const Trends = () => {
  const [content, setContent] = useState("");
  const [trends, setTrends] = useState<Models.Document[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await databases.createDocument(
        appwriteConfig.databaseId, // Database ID
        appwriteConfig.TrendsCollectionId, // Trends Collection ID
        "unique()", // Auto-generate unique ID
        { content } // Match schema with the required field
      );
      console.log("Trend posted:", response);
      setSuccess("Trend posted successfully!");
      setContent(""); // Clear the input field
      fetchTrends();
    } catch (err: any) {
      console.error("Error posting trend:", err);
      setError("Failed to post the trend. Please try again.");
    }
  };
  const fetchTrends = async () => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.TrendsCollectionId
      );
      setTrends(response.documents);
    } catch (err) {
      console.error("Error fetching trends:", err);
    }
  };
  useEffect(() => {
    fetchTrends();
  }, []);
  return (
    <div className="trends-container p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Post a Trend</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form
        onSubmit={handleSubmit}
        className="trend-form bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={4}
            placeholder="What's trending?"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Post Trend
        </button>
      </form>
      <h2 className="text-xl font-bold text-gray-800 mt-6">Recent Trends</h2>
      <div className="trends-list mt-4">
        {trends.length > 0 ? (
          trends.map((trend) => (
            <div
              key={trend.$id}
              className="trend-item p-4 bg-gray-100 rounded-lg shadow-md mb-4"
            >
              <p className="text-gray-600">{trend.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No trends posted yet.</p>
        )}
      </div>
    </div>
  );
};
export default Trends;
