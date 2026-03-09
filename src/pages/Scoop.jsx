import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import SignInPage from "./SignIn";



const  Scoop = () => {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [contentType, setContentType] = useState("text");
  const [editingArticle, setEditingArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Demo user information
  const user = { 
    name: "", 
    email: "", 
    accountType: "journalist",
   
  };
  
  const logout = () => {
    console.log("User logged out");
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: user?.name || "",
    images: [],
    videos: [],
    tags: ""
  });

  const categories = [
    { value: "general", label: "General", icon: "📝", color:  "from-yellow-300 to-yellow-600" },
    { value: "tech", label: "Technology", icon: "💻", color:  "from-yellow-300 to-yellow-600" },
    { value: "education", label: "Education", icon: "📚", color:  "from-yellow-300 to-yellow-600"},
    { value: "political", label: "Political", icon: "🏛️", color: "from-yellow-300 to-yellow-600" },
    { value: "historical", label: "Historical", icon: "🏺", color: "from-yellow-300 to-yellow-600" },
    { value: "cultural", label: "Cultural", icon: "🎭", color:  "from-yellow-300 to-yellow-600" },
    { value: "social", label: "Social", icon: "👥", color:  "from-yellow-300 to-yellow-600"}
  ];

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData(prev => ({ 
      ...prev, 
      [type]: [...prev[type], ...fileUrls] 
    }));
  };

  const removeFile = (index, type) => {
    URL.revokeObjectURL(formData[type][index]);
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    formData.images.forEach(url => URL.revokeObjectURL(url));
    formData.videos.forEach(url => URL.revokeObjectURL(url));
    
    setFormData({
      title: "",
      content: "",
      category: "",
      author: user?.name || "",
      images: [],
      videos: [],
      tags: ""
    });
    setContentType("text");
    setEditingArticle(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    const articleData = {
      ...formData,
      title: formData.title.trim(),
      content: formData.content.trim(),
      author: formData.author || user?.name || "Anonymous",
      authorId: user?.email,
      publishedAt: new Date().toLocaleDateString('en-US'),
      updatedAt: editingArticle ? new Date().toLocaleDateString('en-US') : null
    };

    if (editingArticle) {
      setArticles(prev =>
        prev.map(article =>
          article.id === editingArticle.id
            ? { ...articleData, id: editingArticle.id }
            : article
        )
      );
      alert(" Scoop updated successfully!");
    } else {
      const newArticle = {
        ...articleData,
        id: Date.now()
      };
      setArticles(prev => [newArticle, ...prev]);
      alert(" Scoop published successfully!");
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      author: article.author,
      images: article.images || [],
      videos: article.videos || [],
      tags: article.tags || ""
    });
    setEditingArticle(article);
    setContentType((article.images?.length > 0 || article.videos?.length > 0) ? "media" : "text");
    setShowForm(true);
  };

  const handleDelete = (articleId) => {
    if (window.confirm("Are you sure you want to delete this  Scoop?")) {
      const articleToDelete = articles.find(a => a.id === articleId);
      
      if (articleToDelete) {
        articleToDelete.images?.forEach(url => URL.revokeObjectURL(url));
        articleToDelete.videos?.forEach(url => URL.revokeObjectURL(url));
      }
      
      setArticles(prev => prev.filter(article => article.id !== articleId));
      alert(" Scoop deleted successfully!");
    }
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0];
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesUser = user?.accountType === "journalist" ? article.authorId === user?.email : true;
    
    return matchesSearch && matchesCategory && matchesUser;
  });

  return (
   
    <div className="min-h-screen bg-white">
      {/* Animated Background Elements */}
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Add Article & Search */}
          <div className="flex-1 ">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {user?.accountType === "journalist" && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-yellow-300 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center space-x-2"
                >
                  <span className="text-2xl">✨</span>
                  <span>Create New Scoop</span>
                </button>
              )}
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search articles, tags, content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-300/20 focus:border-yellow-300/50 transition-all duration-300 shadow-sm"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
          </div>

          {/* Filters & View Controls */}
          <div className=" rounded-2xl p-2 ">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-300/20 focus:border-yellow-300/50 transition-all duration-300 shadow-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>

           
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                    <span className="text-4xl">{editingArticle ? "✏️" : "✨"}</span>
                    <span>{editingArticle ? "Edit  Scoop" : "Create New Scoop"}</span>
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Content Type Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Content Type
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setContentType("text")}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                        contentType === "text"
                          ? "bg-yellow-300 text-black shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      📝 Text Only
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentType("media")}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                        contentType === "media"
                          ? "bg-yellow-300 text-black shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      🎨 Text + Media
                    </button>
                  </div>
                </div>

                <div onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                         Scoop Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-yellow-300/20 focus:border-yellow-300/50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm"
                        placeholder="Enter an engaging title..."
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-yellow-300/20 focus:border-yellow-300/50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm"
                        required
                      >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full border border-gray-200/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-yellow-300/20 focus:border-yellow-300/50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm"
                      />
                    </div>

                  
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                      Scoop Content *
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows="8"
                      className="w-full border border-gray-200/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-yellow-300/20 focus:border-yellow-300/50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm resize-none"
                      placeholder="Write your article content here..."
                      required
                    />
                  </div>

                  {contentType === "media" && (
                    <div className="space-y-6 bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                        <span>🎨</span>
                        <span>Media Files</span>
                      </h3>
                      
                      <div>
                        <label htmlFor="images" className="block text-sm font-semibold text-gray-700 mb-3">
                          Upload Images
                        </label>
                        <input
                          type="file"
                          id="images"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileChange(e, "images")}
                          className="w-full border border-gray-200/50 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm"
                        />
                        {formData.images.length > 0 && (
                          <div className="flex flex-wrap gap-3 mt-4">
                            {formData.images.map((img, i) => (
                              <div key={i} className="relative group">
                                <img
                                  src={img}
                                  alt={`Image ${i + 1}`}
                                  className="w-24 h-24 object-cover rounded-xl shadow-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFile(i, "images")}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="videos" className="block text-sm font-semibold text-gray-700 mb-3">
                          Upload Videos
                        </label>
                        <input
                          type="file"
                          id="videos"
                          accept="video/*"
                          multiple
                          onChange={(e) => handleFileChange(e, "videos")}
                          className="w-full border border-gray-200/50 rounded-xl px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm"
                        />
                        {formData.videos.length > 0 && (
                          <div className="flex flex-wrap gap-3 mt-4">
                            {formData.videos.map((vid, i) => (
                              <div key={i} className="relative group">
                                <video
                                  src={vid}
                                  className="w-32 h-24 object-cover rounded-xl shadow-md"
                                  controls
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFile(i, "videos")}
                                  className="absolute -top-2 -right-2 bg-yellow-300 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-yellow-600 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-6">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-yellow-300 from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-black py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                    >
                      <span>{editingArticle ? "💾" : "🚀"}</span>
                      <span>{editingArticle ? "Update  Scoop" : "Publish  Scoop"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                      className="px-8 bg-gray-500 hover:bg-gray-600 text-black py-4 rounded-xl transition-all duration-300 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Section */}
        <div className="backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-black/20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white-900 flex items-center space-x-3">
              <span className="text-4xl">📚</span>
              <span>{user?.accountType === "journalist" ? "My  Scoops" : "All  Scoops"}</span>
              <span className="bg-yellow-300 text-black px-4 py-2 rounded-full text-lg font-bold">
                {filteredArticles.length}
              </span>
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6 opacity-50">📝</div>
              <h3 className="text-2xl font-bold text-white-700 mb-4">No  Scoops Found</h3>
              <p className="text-white text-lg mb-8">
                {searchTerm || selectedCategory !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "No  Scoops have been published yet"}
              </p>
              {user?.accountType === "journalist" && !searchTerm && selectedCategory === "all" && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-yellow-300  to-purple-500 hover:from-yellow-600 hover:to-yellow-600 text-black px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Create Your First  Scoop
                </button>
              )}
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-6"
            }>
              {filteredArticles.map((article) => {
                const categoryInfo = getCategoryInfo(article.category);
                return (
                  <div key={article.id} className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/30 overflow-hidden transform hover:scale-[1.02] ${
                    viewMode === "list" ? "flex" : ""
                  }`}>
                    {/* Category Header */}
                    <div className={`bg-gradient-to-r ${categoryInfo.color} p-4 ${viewMode === "list" ? "w-2" : ""}`}>
                      {viewMode !== "list" && (
                        <div className="flex items-center justify-between text-white">
                          <span className="text-2xl">{categoryInfo.icon}</span>
                          <span className="text-sm font-semibold opacity-90">{categoryInfo.label}</span>
                        </div>
                      )}
                    </div>

                    <div className={`p-6 flex-1 ${viewMode === "list" ? "flex items-center space-x-6" : ""}`}>
                      {viewMode === "list" && (
                        <div className="flex-shrink-0">
                          <div className={`w-16 h-16 bg-gradient-to-r ${categoryInfo.color} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg`}>
                            {categoryInfo.icon}
                          </div>
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors ${
                          viewMode === "list" ? "text-xl" : "text-xl"
                        }`}>
                          {article.title}
                        </h3>

                        <div className={`text-sm text-gray-600 space-y-1 ${viewMode === "list" ? "mb-2" : "mb-4"}`}>
                          <p className="flex items-center space-x-2">
                            <span>👤</span>
                            <span>By {article.author}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <span>📅</span>
                            <span>Published {article.publishedAt}</span>
                          </p>
                          {article.updatedAt && (
                            <p className="flex items-center space-x-2">
                              <span>🔄</span>
                              <span>Updated {article.updatedAt}</span>
                            </p>
                          )}
                          {article.tags && (
                            <p className="flex items-center space-x-2">
                              <span>🏷️</span>
                              <span>{article.tags}</span>
                            </p>
                          )}
                        </div>

                        <p className={`text-gray-700 line-clamp-3 ${viewMode === "list" ? "mb-2" : "mb-4"}`}>
                          {article.content}
                        </p>

                        {/* Media Preview */}
                        {(article.images?.length > 0 || article.videos?.length > 0) && viewMode !== "list" && (
                          <div className="mb-4">
                            {article.images?.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-2">
                                {article.images.slice(0, 3).map((img, i) => (
                                  <img
                                    key={i}
                                    src={img}
                                    alt={`Image ${i + 1}`}
                                    className="w-20 h-16 object-cover rounded-lg shadow-md"
                                  />
                                ))}
                                {article.images.length > 3 && (
                                  <div className="w-20 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-600 font-medium">
                                    +{article.images.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                            {article.videos?.length > 0 && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>🎥</span>
                                <span>{article.videos.length} video{article.videos.length > 1 ? 's' : ''}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Media indicator for list view */}
                        {(article.images?.length > 0 || article.videos?.length > 0) && viewMode === "list" && (
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            {article.images?.length > 0 && (
                              <span className="flex items-center space-x-1">
                                <span>🖼️</span>
                                <span>{article.images.length}</span>
                              </span>
                            )}
                            {article.videos?.length > 0 && (
                              <span className="flex items-center space-x-1">
                                <span>🎥</span>
                                <span>{article.videos.length}</span>
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        {user?.accountType === "journalist" && article.authorId === user.email && (
                          <div className={`flex space-x-3 pt-4 border-t border-gray-200/50 ${viewMode === "list" ? "" : ""}`}>
                            <button
                              onClick={() => handleEdit(article)}
                              className="flex-1 bg-yellow-300 hover:from-amber-500 hover:to-yellow-500 text-black py-2 px-4 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-1"
                            >
                              <span>✏️</span>
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="flex-1 bg-red-500  hover:to-red-600 text-black py-2 px-4 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-1"
                            >
                              <span>🗑️</span>
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scoop;