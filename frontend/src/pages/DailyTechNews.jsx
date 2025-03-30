import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DailyTechNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [imageLoading, setImageLoading] = useState({});
  const navigate = useNavigate();

  // Expanded categories relevant to internet evolution and cyber content
  const categories = [
    { id: "all", name: "All News" },
    { id: "426193634", name: "Artificial Intelligence" },
    { id: "449557044", name: "Cybersecurity" },
    { id: "449557028", name: "Digital Media" },
    { id: "449223024", name: "Internet" },
    { id: "20429", name: "TC" },
    { id: "17396", name: "Social Media" },
    { id: "576602980", name: "Blockchain" },
    { id: "424613844", name: "Virtual Reality" },
    { id: "426637499", name: "Data Privacy" },
    { id: "21587494", name: "Mobile" },
    { id: "577111630", name: "Cloud Computing" }
  ];

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "https://techcrunch.com/wp-json/wp/v2/posts?per_page=12";
      
      // Add category filter if not "all"
      if (category !== "all") {
        url += `&categories=${category}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      
      const data = await response.json();
      
      // Initialize image loading state for all items
      const newImageLoading = {};
      data.forEach(item => {
        newImageLoading[item.id] = true;
      });
      setImageLoading(newImageLoading);
      
      setNews(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news. Please try again later.");
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [])
  

  useEffect(() => {
    fetchNews();
  }, [category]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Remove HTML tags from content
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Truncate text to a specific length
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Handle image load complete
  const handleImageLoaded = (id) => {
    setImageLoading(prev => ({
      ...prev,
      [id]: false
    }));
  };

  // Handle card click
  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };

  // Get category name from id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === String(categoryId));
    return category ? category.name : "Technology";
  };

  // Filter news based on search term
  const filteredNews = news.filter(item => 
    item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stripHtml(item.excerpt.rendered).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br mt-0 from-gray-900 to-black text-white">
      
      {/* Header Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-400">
            Daily Tech & Internet News
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest developments in internet technology, 
            cybersecurity, and digital innovation.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                  category === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-56 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button 
                onClick={() => setSearchTerm("")} 
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white ${!searchTerm && "hidden"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center p-6 mb-6 bg-red-900 bg-opacity-30 rounded-lg border border-red-700">
            <p className="text-red-400 font-medium text-sm">{error}</p>
            <button 
              onClick={fetchNews}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors duration-200 text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col space-y-4 w-full">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-40 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-row h-40 animate-pulse">
                <div className="w-1/3 bg-gray-700"></div>
                <div className="w-2/3 p-4 flex flex-col">
                  <div className="h-4 bg-gray-700 rounded mb-2 w-1/3"></div>
                  <div className="h-5 bg-gray-700 rounded mb-2"></div>
                  <div className="h-5 bg-gray-700 rounded mb-2 w-3/4"></div>
                  <div className="space-y-1 mt-auto">
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* News Items - Now using flex-col instead of grid */}
            {filteredNews.length > 0 ? (
              <div className="flex flex-col space-y-4 w-full">
                {filteredNews.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-gray-800 px-4 bg-opacity-40 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-row h-40 cursor-pointer"
                    onClick={() => handleCardClick(item.id)}
                  >
                    {/* Featured Image */}
                    <div className="w-40 h-40 overflow-hidden relative">
                      {imageLoading[item.id] && (
                        <div className="absolute flex items-center justify-center mt-10 inset-0 w-40 h-20 bg-gray-700 animate-pulse"></div>
                      )}
                      {item.jetpack_featured_media_url && (
                        <img
                          src={item.jetpack_featured_media_url}
                          alt={stripHtml(item.title.rendered)}
                          className={`w-full h-full object-contain object-center ${
                            imageLoading[item.id] ? 'opacity-0' : 'opacity-100'
                          }`}
                          onLoad={() => handleImageLoaded(item.id)}
                          onError={(e) => {
                            handleImageLoaded(item.id);
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/640x320/1a202c/718096?text=TechNews";
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Content Section - Increased width and padding */}
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      {/* Category Tag */}
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-0.5 bg-blue-600 bg-opacity-50 rounded-full text-xs text-white">
                          {getCategoryName(item.categories?.[0])}
                        </span>
                      </div>
                      
                      {/* Title - Increased font size, removed line clamp limit */}
                      <h2 className="text-sm md:text-base font-bold text-white mb-2 overflow-ellipsis">
                        {stripHtml(item.title.rendered)}
                      </h2>
                      
                      {/* Excerpt - Increased line limit and length */}
                      <p className="text-xs md:text-sm text-gray-400 line-clamp-3">
                        {truncateText(stripHtml(item.excerpt.rendered), 140)}
                      </p>
                      
                      {/* Date - at the bottom */}
                      <div className="mt-auto">
                        <span className="text-xs text-gray-500">
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-800 bg-opacity-30 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-sm text-gray-400">
                  {searchTerm ? (
                    <>
                      No articles match "<span className="text-blue-400">{searchTerm}</span>" 
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="text-blue-400 hover:underline ml-2"
                      >
                        Clear search
                      </button>
                    </>
                  ) : (
                    "No articles available for this category at the moment."
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DailyTechNews;