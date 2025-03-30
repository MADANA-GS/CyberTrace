import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);
  
  useEffect(() => {
    const fetchArticleDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://techcrunch.com/wp-json/wp/v2/posts/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch article details");
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article details:", err);
        setError("Failed to load article. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticleDetails();
    }
  }, [id]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle clicking on links within article content
  const handleContentClick = (e) => {
    // Check if the clicked element is an anchor tag or has an anchor tag parent
    const isLink = e.target.tagName === 'A' || e.target.closest('a');
    
    if (isLink) {
      e.preventDefault();
    }

    // Handle images in the content
    const isImage = e.target.tagName === 'IMG';
    if (isImage) {
      e.preventDefault();
      setSelectedImage(e.target.src);
      setShowFullImage(true);
    }
  };

  // Handle featured image click
  const handleImageClick = () => {
    setSelectedImage(article.jetpack_featured_media_url);
    setShowFullImage(true);
  };
  
  // Close modal when clicking outside the image
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setShowFullImage(false);
    }
  };

  // Handle image load completion
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate('/news');
  };

  // Create sanitized HTML for article content
  const getSanitizedContent = () => {
    if (!article || !article.content || !article.content.rendered) return '';
    
    // Create a temporary element to manipulate the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = article.content.rendered;
    
    // Find all links and modify them
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
      link.setAttribute('data-external-link', 'true');
      link.removeAttribute('href');
      link.style.cursor = 'pointer';
      link.style.textDecoration = 'underline';
      link.style.color = '#63b3ed'; // blue-400
    });
    
    // Find all images and add special class for styling
    const images = tempDiv.querySelectorAll('img');
    images.forEach(img => {
      img.classList.add('cursor-pointer');
      img.classList.add('hover:opacity-90');
      img.classList.add('transition-opacity');
      img.classList.add('duration-200');
      // Add proper margin
      img.style.margin = '2rem 0';
    });
    
    return tempDiv.innerHTML;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 ">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center px-3 py-2 md:ml-12 lg:ml-24 xl:ml-12  bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 mb-6 group w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out">News</span>
        </button>

        {loading ? (
          <div className="max-w-4xl mx-auto">
            {/* Title Skeleton */}
            <div className="h-10 bg-gray-800 rounded-md mb-4 animate-pulse"></div>
            
            {/* Date Skeleton */}
            <div className="h-6 bg-gray-800 rounded-md w-48 mb-8 animate-pulse"></div>
            
            {/* Featured Image Skeleton */}
            <div className="h-80 bg-gray-800 rounded-lg mb-8 animate-pulse"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-800 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-900 bg-opacity-30 rounded-lg border border-red-700 max-w-4xl mx-auto">
            <p className="text-red-400 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : article ? (
          <article className="max-w-4xl mx-auto">
            {/* Title */}
            <h1 
              className="text-3xl md:text-4xl font-bold mb-4 text-blue-400"
              dangerouslySetInnerHTML={{ __html: article.title.rendered }}
            />
            
            {/* Date */}
            <div className="text-gray-400 mb-8">
              {formatDate(article.date)}
            </div>
            
            {/* Featured Image with loading state */}
            {article.jetpack_featured_media_url && (
              <div className="mb-8 rounded-xl overflow-hidden relative cursor-pointer transform hover:scale-[1.01] transition-transform duration-300" onClick={handleImageClick}>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={article.jetpack_featured_media_url}
                  alt=""
                  className="w-full h-auto transition-opacity duration-300"
                  style={{ opacity: imageLoading ? 0.5 : 1 }}
                  onLoad={handleImageLoaded}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/1200x600/1a202c/718096?text=TechCrunch";
                    setImageLoading(false);
                  }}
                />
              </div>
            )}
            
            {/* Content with click handler to prevent external redirects */}
            <div 
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: getSanitizedContent() }}
              onClick={handleContentClick}
            />
            
            {/* End of article indicator */}
            <div className="mt-12 pt-6 border-t border-gray-800 flex justify-center items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
          </article>
        ) : (
          <div className="text-center p-12 bg-gray-800 bg-opacity-30 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-medium mb-2">Article not found</h3>
            <p className="text-gray-400">
              The article you're looking for might have been removed or is temporarily unavailable.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showFullImage && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-6xl max-h-screen">
            <img
              src={selectedImage}
              alt=""
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
              onClick={() => setShowFullImage(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;