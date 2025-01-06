import { FaCheckCircle, FaHeart, FaCommentDots } from "react-icons/fa";
import { useState, useEffect } from "react";
import CredenzaModal from "@/components/forms/CredenzaModal";
import CredenzaModalTrends from "@/components/forms/CredenzaModalTrends";
import { ITrend } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/lib/appwrite/api";
import axios from "axios";

const Trends = () => {
  const [isFabHovered, setIsFabHovered] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isTrendModalOpen, setIsTrendModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState([
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
  ]);
  const [trends, setTrends] = useState<ITrend[]>([]);
  const { toast } = useToast();

  // Fetch all trends when the component loads
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/get-trends/"
        );
        setTrends(data);
      } catch (error: any) {
        console.error("Error fetching trends:", error);
        toast({
          title: "Error fetching trends",
          description: error.response?.data?.message || "An error occurred",
          variant: "destructive",
        });
      }
    };

    fetchTrends();
  }, [toast]);

  const handleNewPost = (postContent: string) => {
    setPosts([
      {
        id: posts.length + 1,
        sender: "You",
        username: "@yourusername",
        verified: false,
        time: "Just Now",
        content: postContent,
      },
      ...posts,
    ]);
    setIsPostModalOpen(false); // Close post modal after posting
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          throw new Error("Failed to fetch current user");
        }
        setUserId(user.account_id);
        console.log(user);
        console.log(userId);
      } catch (error: any) {
        console.error("Error fetching user info:", error);
        toast({
          title: "Error fetching user info",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchUserInfo();
  }, [toast]);

  // Handle adding a new trend
  const handleNewTrend = async (
    media: File | null,
    caption: string,
    location: string
  ) => {
    console.log("handleNewTrend triggered");
    if (!userId) {
      return toast({
        title: "User not authenticated",
        description: "Please log in to add a trend.",
        variant: "destructive",
      });
    }
    if (!media || !caption || !location) {
      console.log("Missing data", { media, caption, location });
      return toast({
        title: "Incomplete data",
        description: "Please provide a media file, caption, and location.",
        variant: "destructive",
      });
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("media", media);
    formData.append("caption", caption);
    formData.append("location", location);

    console.log("FormData content:");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/add-trend/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTrends((prevTrends) => [data, ...prevTrends]);

      toast({ title: "Trend posted successfully" });
      setIsTrendModalOpen(false); // Close modal after posting
    } catch (error: any) {
      console.error("Error posting trend:", error);
      toast({
        title: "Error creating trend",
        description: error.response?.data?.error || "Failed to create trend",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Trends Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Trends</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trends.map((trend: ITrend) => (
            <div
              key={trend.media_url}
              className="bg-white rounded-lg shadow-md overflow-hidden relative flex flex-col"
            >
              <div className="bg-blue-700 text-white text-center py-1 font-bold">
                {trend.user_name}
              </div>
              <img
                src={trend.media_url}
                alt={trend.user_name}
                className="object-cover w-full h-48"
              />
              <div className="px-4 py-2">
                <p className="text-gray-700 text-sm">{trend.caption}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Location: {trend.location}
                </p>
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

      {/* Floating Action Button with Side Menu */}
      <div
        className="fixed bottom-4 right-4 flex items-center"
        onMouseEnter={() => setIsFabHovered(true)}
        onMouseLeave={() => setIsFabHovered(false)}
      >
        {isFabHovered && (
          <div className="flex flex-col items-end mr-16 space-y-2">
            <button
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-100"
              onClick={() => setIsTrendModalOpen(true)}
            >
              Add Trend
            </button>
            <button
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-100"
              onClick={() => setIsPostModalOpen(true)}
            >
              Add Post
            </button>
          </div>
        )}
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
          +
        </button>
      </div>

      {/* Modal for Adding Post */}
      <CredenzaModal
        open={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onConfirm={handleNewPost}
      />

      {/* Modal for Adding Trend */}
      <CredenzaModalTrends
        open={isTrendModalOpen}
        onClose={() => setIsTrendModalOpen(false)}
        onConfirm={handleNewTrend}
      />
    </div>
  );
};

export default Trends;
