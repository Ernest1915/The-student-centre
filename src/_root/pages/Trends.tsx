import { FaCheckCircle, FaHeart, FaCommentDots } from "react-icons/fa";

const RTrends = () => {
  const trends = [
    { id: 1, media: "https://via.placeholder.com/150", name: "John Doe" },
    { id: 2, media: "https://via.placeholder.com/150", name: "Jane Smith" },
    { id: 3, media: "https://via.placeholder.com/150", name: "Alice Brown" },
  ];

  const posts = [
    {
      id: 1,
      sender: "CITY DIGEST.",
      username: "@city_digest",
      verified: true,
      time: "9h",
      content: "BREAKING",
    },
    {
      id: 2,
      sender: "John Doe",
      username: "@johndoe",
      verified: false,
      time: "2d",
      content: "This is a sample post!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      {/* Trends Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Trends</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {trends.map((trend) => (
            <div
              key={trend.id}
              className="w-32 h-48 bg-white rounded-lg shadow-md flex flex-col items-center justify-end overflow-hidden relative"
            >
              <img
                src={trend.media}
                alt={trend.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="bg-black bg-opacity-50 w-full text-white text-sm text-center py-1">
                {trend.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Posts Section */}
      <section>
        <h2 className="text-xl font-bold text-blue-700 mb-4">Posts</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 border border-blue-100"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  CD
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-gray-900">
                      {post.sender}
                    </span>
                    {post.verified && (
                      <FaCheckCircle className="text-blue-500 text-sm" />
                    )}
                    <span className="text-sm text-gray-500">
                      {post.username}
                    </span>
                    <span className="text-sm text-gray-500">• {post.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-gray-800 mb-3">{post.content}</div>
              <div className="flex items-center space-x-6 text-gray-500">
                <button className="flex items-center space-x-1 hover:text-blue-600">
                  <FaHeart className="text-lg" />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-600">
                  <FaCommentDots className="text-lg" />
                  <span className="text-sm">Comment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => alert("Post something!")}
      >
        +
      </button>
    </div>
  );
};

export default RTrends;
