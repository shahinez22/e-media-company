import React, { useState } from 'react';
import { Calendar, Folder, FolderOpen, Newspaper, Eye, ArrowLeft, Clock, User, Search, Filter, ChevronDown, Download, BookOpen } from 'lucide-react';

const MonthlyNewspaperArchive = () => {
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWeek, setFilterWeek] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const generateArticlesForDay = (date, isWeekend) => {
    const dayOfMonth = date.getDate();
    const baseArticles = [
      {
        id: `${dayOfMonth}-1`,
        title: `City Council Approves New Park Development - Day ${dayOfMonth}`,
        category: 'Local News',
        author: 'douaa',
        readTime: '4 min read',
        preview: 'The city council approved plans for a new community park designed to provide more green space for residents...',
        content: `
          In a unanimous decision, the city council voted yesterday to allocate funds for the construction of a new community park in the downtown area. 
          The project, estimated at $4 million, aims to provide residents with more recreational spaces, walking paths, and playgrounds. 

          Mayor Thomas highlighted that the park will serve as a "green lung" for the city, helping reduce air pollution while also offering families a safe place to gather. 

          Construction is expected to begin in early spring, with the park scheduled to open to the public by late 2025. 
          City officials also promised to consult with local residents during the design phase to ensure the park reflects community needs.
        `,
        page: 'A1',
        imageUrl: '/placeholder-park.jpg'
      },
      {
        id: `${dayOfMonth}-2`,
        title: 'Local Bakery Wins National Award for Innovation',
        category: 'Business',
        author: 'fatima',
        readTime: '3 min read',
        preview: 'A family-owned bakery has gained national recognition for its unique approach to sustainable baking...',
        content: `
          Sweet Crumbs Bakery, located on Main Street, has been awarded the National Small Business Innovation Award for its eco-friendly baking methods. 
          The bakery, run by the Lopez family, has replaced traditional ovens with energy-efficient models that cut energy usage by 40%. 

          Customers have praised not only the bakery’s delicious pastries but also its commitment to sustainability. 
          Owner Maria Lopez said the recognition will help expand their reach and inspire other small businesses to adopt greener practices. 

          The bakery now plans to introduce a new product line using locally sourced organic ingredients.
        `,
        page: 'B3',
        imageUrl: '/placeholder-bakery.jpg'
      },
      {
        id: `${dayOfMonth}-3`,
        title: 'High School Robotics Team Qualifies for International Competition',
        category: 'Education',
        author: 'adam',
        readTime: '5 min read',
        preview: 'Lincoln High School’s robotics team has advanced to the world stage after winning a state-wide championship...',
        content: `
          Lincoln High School students are celebrating after their robotics team secured first place at the annual state robotics championship. 
          Their innovative robot, designed to complete complex obstacle challenges, impressed judges with both precision and creativity. 

          The team, made up of 12 students from diverse backgrounds, will now represent the state at the International Robotics Competition in Tokyo this summer. 

          Coach Rebecca Miller expressed pride in her students, noting that many had worked long nights and weekends preparing for the event. 
          "This isn’t just about winning," she said. "It’s about teamwork, problem-solving, and believing in their potential." 

          The team has started a fundraising campaign to cover travel expenses and hopes the community will support their journey to Japan.
        `,
        page: 'C1',
        imageUrl: '/placeholder-robotics.jpg'
      }
    ];

    // Weekend article
    if (isWeekend) {
      baseArticles.push({
        id: `${dayOfMonth}-4`,
        title: 'Weekend Music Festival Brings Thousands Downtown',
        category: 'Culture',
        author: 'aicha',
        readTime: '4 min read',
        preview: 'Music fans gathered this weekend for a festival featuring both local talent and international artists...',
        content: `
          Downtown came alive this weekend as more than 20,000 people attended the annual Summer Music Festival. 
          The event featured performances from both local bands and international stars, turning the city into a hub of energy and excitement. 

          Food vendors lined the streets, offering cuisine from around the world, while art stalls showcased handmade crafts. 
          Families, students, and tourists all joined in the celebration, making it one of the city’s most successful events of the year. 

          City officials reported no major incidents, praising the organizers for their planning and security measures. 
          Plans are already underway for an even larger event next year.
        `,
        page: 'D1',
        imageUrl: '/placeholder-festival.jpg'
      });
    }

    return baseArticles;
  };


  const generateMonthData = () => {
    const editions = [];
    const currentDate = new Date(2024, 0, 1); 
    
    for (let day = 1; day <= 31; day++) {
      const date = new Date(2024, 0, day);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      // Skip Sundays
      if (dayName === 'Sunday') continue;
      
      const isWeekend = dayName === 'Saturday';
      const edition = {
        id: `edition-${day}`,
        date: date.toISOString().split('T')[0],
        dayName,
        editionType: isWeekend ? 'Weekend Edition' : 'Daily Edition',
        totalPages: isWeekend ? 32 : 24,
        week: Math.ceil(day / 7),
        articles: generateArticlesForDay(date, isWeekend)
      };
      
      editions.push(edition);
    }
    
    return editions;
  };

  const editions = generateMonthData();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredEditions = editions.filter(edition => {
    const matchesSearch = searchTerm === '' || 
      edition.articles.some(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesWeek = filterWeek === 'all' || edition.week.toString() === filterWeek;
    
    return matchesSearch && matchesWeek;
  });

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-yellow-300 hover:text-yellow-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </button>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                {selectedArticle.category}
              </span>
              <span>Page {selectedArticle.page}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedArticle.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By {selectedArticle.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-gray-800">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-yellow-700">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                  <BookOpen className="w-4 h-4" />
                  Print Article
                </button>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }

  if (selectedEdition) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <button
              onClick={() => setSelectedEdition(null)}
              className="flex items-center gap-2 text-yellow-300 hover:text-yellow-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Archive
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">The Daily Herald</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">{formatDate(selectedEdition.date)}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedEdition.editionType}</span>
                  <span>•</span>
                  <span>{selectedEdition.totalPages} Pages</span>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">
                <Download className="w-4 h-4" />
                Download Full Edition
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Articles in this Edition</h2>
            <p className="text-gray-600">{selectedEdition.articles.length} articles available</p>
          </div>

          <div className="grid gap-6">
            {selectedEdition.articles.map(article => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">Page {article.page}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-yellow-600 cursor-pointer">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <User className="w-4 h-4" />
                      <span>By {article.author}</span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {article.preview}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="flex items-center gap-2 bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Read Full Article
                      </button>
                      <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b  gap-8 flex">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">The Daily Herald Archive</h1>
          <p className="text-lg text-gray-600">January 2026 - Complete Monthly Archive</p>
        </div>

<div className="flex-1 relative">

              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
                       <div className="relative">
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 appearance-none bg-white min-w-32"
                value={filterWeek}
                onChange={(e) => setFilterWeek(e.target.value)}
              >
                <option value="all">All Weeks</option>
                <option value="1">Week 1</option>
                <option value="2">Week 2</option>
                <option value="3">Week 3</option>
                <option value="4">Week 4</option>
                <option value="5">Week 5</option>
              </select>
            </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
         <div className="w-full px-4 py-8">
         

         
{/* Archive Grid/List */}
<div
  className={
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      : "space-y-2"
  }
>
  {filteredEditions.map((edition) => (
    <div
      key={edition.id}
      onClick={() => setSelectedEdition(edition)}
      className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-yellow-200 ${
        viewMode === "list" ? "p-4 flex items-center gap-4" : "p-6"
      }`}
    >
      <div className={viewMode === "list" ? "flex-shrink-0" : "text-center"}>
        <div
          className={`${
            viewMode === "list" ? "w-16 h-16" : "w-20 h-20"
          } mx-auto mb-3 bg-yellow-600 rounded-lg flex items-center justify-center`}
        >
          <Newspaper className="w-8 h-8 text-black" />
        </div>
      </div>

      <div className={viewMode === "list" ? "flex-1" : ""}>
        <h3
          className={`font-bold text-gray-900 mb-2 ${
            viewMode === "list" ? "text-lg" : "text-xl"
          }`}
        >
          {new Date(edition.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{edition.dayName}</p>
        <p className="text-xs text-yellow-600 font-medium mb-3">
          {edition.editionType}
        </p>

        <div className="space-y-1 text-xs text-gray-500">
          <div className="flex items-center justify-between">
            <span>Articles:</span>
            <span>{edition.articles.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Pages:</span>
            <span>{edition.totalPages}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center text-yellow-600 text-sm font-medium">
            <span>Open Edition</span>
            <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


{filteredEditions.length === 0 && (
  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      No editions found
    </h3>
    <p className="text-gray-600">
      Try adjusting your search terms or filters
    </p>
  </div>
)}



            </div>
          </div>

          <div className="text-sm text-gray-600">
            Found {filteredEditions.length} edition{filteredEditions.length !== 1 ? 's' : ''}
          </div>
        </div>

      {filteredEditions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No editions found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Archive Statistics */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Archive Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{editions.length}</div>
              <div className="text-gray-600">Total Editions</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {editions.reduce((total, edition) => total + edition.articles.length, 0)}
              </div>
              <div className="text-gray-600">Total Articles</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {editions.reduce((total, edition) => total + edition.totalPages, 0)}
              </div>
              <div className="text-gray-600">Total Pages</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">31</div>
              <div className="text-gray-600">Days Covered</div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default MonthlyNewspaperArchive;




