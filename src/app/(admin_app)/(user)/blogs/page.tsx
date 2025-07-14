"use client";
import React, { useState, useMemo } from 'react';
import { MdOutlineDateRange, MdLocationOn, MdShare, MdArrowBack } from 'react-icons/md';
import { FaUserAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaSearch, FaFilter } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';

// Type Definitions
export interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: string;
  author: string;
  date: string; // ISO string
  excerpt: string;
  content: string;
  readTime: number;
  authorBio: string;
  authorImage: string;
  tags: string[];
}

// Mock Data
const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Hidden Gems of Rajasthan: Beyond the Golden Triangle",
    slug: "hidden-gems-rajasthan",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop",
    category: "Travel Guide",
    author: "Priya Sharma",
    date: "2025-01-15T10:00:00Z",
    excerpt: "Discover the lesser-known palaces, hidden lakes, and authentic cultural experiences that make Rajasthan truly magical beyond the tourist trail.",
    content: `<div class="prose max-w-none">
      <p>Rajasthan, the land of kings, offers far more than the well-trodden paths of Jaipur, Agra, and Delhi. Beyond the Golden Triangle lies a treasure trove of experiences waiting to be discovered.</p>
      
      <h2>The Forgotten Palaces of Shekhawati</h2>
      <p>The Shekhawati region, often called the "Open Art Gallery of Rajasthan," is home to stunning havelis adorned with intricate frescoes. Towns like Mandawa and Nawalgarh offer glimpses into the region's rich mercantile past.</p>
      
      <h2>Bundi: The Blue City's Hidden Cousin</h2>
      <p>While Jodhpur gets all the blue city fame, Bundi offers a more intimate experience with its step wells, palaces, and narrow lanes painted in various shades of blue.</p>
      
      <h2>Desert Camping in Khuri</h2>
      <p>Skip the crowded Sam dunes and head to Khuri for a more authentic desert experience. The golden sands here are less commercialized and offer stunning sunset views.</p>
      
      <h2>Ranakpur Jain Temple</h2>
      <p>This architectural marvel boasts 1,444 intricately carved pillars, each unique in its design. The temple's marble work is considered among the finest in India.</p>
    </div>`,
    readTime: 8,
    authorBio: "Priya is a travel writer and photographer who has been exploring India's hidden corners for over a decade. She specializes in off-the-beaten-path destinations and cultural immersion experiences.",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    tags: ["Rajasthan", "Hidden Gems", "Culture", "Desert"]
  },
  {
    id: 2,
    title: "Luxury Wellness Retreats: Finding Peace in the Himalayas",
    slug: "luxury-wellness-retreats-himalayas",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    category: "Wellness",
    author: "Dr. Rajesh Kumar",
    date: "2025-01-12T14:30:00Z",
    excerpt: "Escape to the serene mountains where luxury meets mindfulness. Discover world-class wellness retreats that rejuvenate both body and soul.",
    content: `<div class="prose max-w-none">
      <p>In our fast-paced world, finding moments of genuine peace has become a luxury in itself. The Himalayan region offers some of the world's most transformative wellness experiences.</p>
      
      <h2>Ananda in the Himalayas</h2>
      <p>Nestled in the Sal forests of Narendra Nagar, Ananda combines traditional Ayurveda with international spa therapies. The property overlooks the Ganges valley and offers panoramic views of the Himalayas.</p>
      
      <h2>Vana Malsi Estate</h2>
      <p>This 21-acre wellness retreat in Dehradun focuses on holistic healing through Ayurveda, Sowa Rigpa (Tibetan medicine), and modern wellness practices.</p>
      
      <h2>The Art of Mindful Living</h2>
      <p>These retreats don't just offer spa treatments; they provide comprehensive lifestyle transformation programs including meditation, yoga, nutrition counseling, and stress management.</p>
      
      <h2>Seasonal Wellness Programs</h2>
      <p>From spring detox programs to winter rejuvenation therapies, these retreats align their offerings with natural cycles to maximize healing benefits.</p>
    </div>`,
    readTime: 6,
    authorBio: "Dr. Rajesh Kumar is a wellness expert and Ayurvedic practitioner with over 15 years of experience in holistic healing. He regularly conducts wellness workshops across luxury resorts.",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    tags: ["Wellness", "Luxury", "Himalayas", "Ayurveda"]
  },
  {
    id: 3,
    title: "Culinary Journey: Street Food Adventures in Mumbai",
    slug: "mumbai-street-food-adventure",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=500&fit=crop",
    category: "Food & Culture",
    author: "Chef Meera Patel",
    date: "2025-01-10T18:00:00Z",
    excerpt: "From vada pav to gourmet fusion, Mumbai's street food scene is a gastronomic adventure waiting to be explored by food enthusiasts.",
    content: `<div class="prose max-w-none">
      <p>Mumbai's street food culture is legendary, offering an incredible variety of flavors, textures, and experiences that reflect the city's diverse population and rich culinary heritage.</p>
      
      <h2>The Iconic Vada Pav</h2>
      <p>Often called Mumbai's burger, vada pav is more than just a snack – it's a cultural symbol. The best ones are found at local stalls where the recipe has been perfected over generations.</p>
      
      <h2>Chowpatty Beach Delights</h2>
      <p>From bhel puri to pav bhaji, Chowpatty Beach offers a carnival of flavors. The sunset views combined with spicy chaats create an unforgettable dining experience.</p>
      
      <h2>Mohammad Ali Road's Ramadan Feast</h2>
      <p>During Ramadan, this street transforms into a food lover's paradise. From kebabs to biryanis, the variety and authenticity of Mughlai cuisine here is unmatched.</p>
      
      <h2>Crawford Market's Hidden Gems</h2>
      <p>Beyond the bustling market, hidden lanes offer everything from fresh fruit juices to traditional sweets that have been family recipes for decades.</p>
      
      <h2>Food Safety Tips</h2>
      <p>While exploring, choose busy stalls with high turnover, drink bottled water, and trust your instincts. The best street food often comes from the most crowded stalls.</p>
    </div>`,
    readTime: 5,
    authorBio: "Chef Meera Patel is a Mumbai-based culinary expert who has spent years documenting and celebrating India's street food culture. She conducts food tours and cooking workshops.",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    tags: ["Mumbai", "Street Food", "Culture", "Culinary"]
  },
  {
    id: 4,
    title: "Heritage Hotels: Sleeping in History",
    slug: "heritage-hotels-sleeping-in-history",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=500&fit=crop",
    category: "Heritage",
    author: "Vikram Singh",
    date: "2025-01-08T11:15:00Z",
    excerpt: "Experience India's royal past by staying in palaces and forts that have been converted into luxury hotels, where every room tells a story.",
    content: `<div class="prose max-w-none">
      <p>India's heritage hotels offer a unique opportunity to experience royal luxury while staying in properties that have witnessed centuries of history.</p>
      
      <h2>The Taj Lake Palace, Udaipur</h2>
      <p>This white marble palace floating on Lake Pichola is perhaps the most romantic hotel in the world. Built in 1746, it offers an otherworldly experience of living like royalty.</p>
      
      <h2>Umaid Bhawan Palace, Jodhpur</h2>
      <p>One of the world's largest private residences, this Art Deco masterpiece is still home to the royal family while offering guests a glimpse into princely life.</p>
      
      <h2>Rambagh Palace, Jaipur</h2>
      <p>Once the residence of the Maharaja of Jaipur, this palace seamlessly blends Mughal and Rajasthani architecture with modern luxury amenities.</p>
      
      <h2>Conservation Efforts</h2>
      <p>These heritage hotels play a crucial role in preserving India's architectural heritage, ensuring that these magnificent structures continue to tell their stories for future generations.</p>
      
      <h2>Authentic Experiences</h2>
      <p>From traditional welcome ceremonies to heritage walks, these hotels offer immersive experiences that transport guests back in time.</p>
    </div>`,
    readTime: 7,
    authorBio: "Vikram Singh is a heritage tourism consultant and former royal family member who now helps preserve and promote India's palace hotels and cultural heritage.",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    tags: ["Heritage", "Luxury", "Palaces", "History"]
  },
  {
    id: 5,
    title: "Monsoon Magic: Kerala's Backwaters During the Rains",
    slug: "kerala-backwaters-monsoon",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop",
    category: "Nature",
    author: "Arjun Nair",
    date: "2025-01-05T16:45:00Z",
    excerpt: "Discover why monsoon is the most magical time to experience Kerala's backwaters, when the landscape transforms into a lush, green paradise.",
    content: `<div class="prose max-w-none">
      <p>While many travelers avoid Kerala during monsoon season, those who venture during the rains discover a completely different, more magical side of God's Own Country.</p>
      
      <h2>The Transformation</h2>
      <p>The monsoon transforms Kerala's backwaters into a verdant paradise. The coconut palms become greener, the waterways fill up, and the entire landscape comes alive with the sound of rain.</p>
      
      <h2>Houseboat Experiences</h2>
      <p>Staying on a houseboat during monsoon offers a unique perspective. The gentle patter of rain on the roof, the misty waters, and the cooler temperatures create an incredibly romantic atmosphere.</p>
      
      <h2>Ayurvedic Treatments</h2>
      <p>Monsoon is considered the best time for Ayurvedic treatments in Kerala. The humidity opens up the pores, making the body more receptive to herbal therapies and massages.</p>
      
      <h2>Local Festivals</h2>
      <p>The famous Nehru Trophy Boat Race and various temple festivals take place during monsoon, offering visitors a chance to experience Kerala's rich cultural traditions.</p>
      
      <h2>What to Expect</h2>
      <p>While it does rain frequently, the showers are usually short and refreshing. The cooler temperatures make it perfect for exploring without the intense heat of summer.</p>
    </div>`,
    readTime: 6,
    authorBio: "Arjun Nair is a Kerala-based travel photographer and writer who specializes in capturing the natural beauty of South India during different seasons.",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    tags: ["Kerala", "Monsoon", "Backwaters", "Nature"]
  },
  {
    id: 6,
    title: "Adventure Tourism: Trekking the Himalayan Trails",
    slug: "himalayan-trekking-adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    category: "Adventure",
    author: "Captain Rohit Thakur",
    date: "2025-01-02T09:30:00Z",
    excerpt: "From beginner-friendly trails to challenging expeditions, discover the best Himalayan treks that offer breathtaking views and unforgettable experiences.",
    content: `<div class="prose max-w-none">
      <p>The Himalayas offer some of the world's most spectacular trekking experiences, from gentle walks through rhododendron forests to challenging high-altitude expeditions.</p>
      
      <h2>Popular Beginner Treks</h2>
      <p>The Valley of Flowers trek in Uttarakhand is perfect for beginners, offering stunning alpine meadows filled with colorful wildflowers during the monsoon season.</p>
      
      <h2>Intermediate Challenges</h2>
      <p>The Har Ki Dun trek takes you to the "Valley of Gods," offering magnificent views of Swargarohini peaks and ancient villages with traditional architecture.</p>
      
      <h2>Advanced Expeditions</h2>
      <p>For experienced trekkers, the Roopkund Lake trek offers mystery and challenge, leading to the famous "Skeleton Lake" with its intriguing historical significance.</p>
      
      <h2>Best Time to Trek</h2>
      <p>April to June and September to November are ideal for most Himalayan treks, offering clear weather and excellent visibility of the mountain peaks.</p>
      
      <h2>Essential Preparation</h2>
      <p>Proper acclimatization, fitness preparation, and quality gear are crucial for a successful and safe Himalayan trekking experience.</p>
    </div>`,
    readTime: 9,
    authorBio: "Captain Rohit Thakur is a mountaineering expert and adventure tourism guide with over 20 years of experience leading expeditions in the Himalayas.",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    tags: ["Adventure", "Himalayas", "Trekking", "Mountains"]
  }
];

// BlogCard Component
const BlogCard: React.FC<{ blog: Blog; onClick: (slug: string) => void }> = ({ blog, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-[1.02] border border-gray-100"
         onClick={() => onClick(blog.slug)}>
      <div className="relative overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-[#D29022] to-[#610E07] text-white px-3 py-1 rounded-full text-sm font-medium">
            {blog.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-600 flex items-center gap-1">
          <BiTime className="w-3 h-3" />
          {blog.readTime} min read
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#D29022] transition-colors duration-300">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={blog.authorImage} 
              alt={blog.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <FaUserAlt className="w-3 h-3" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MdOutlineDateRange className="w-3 h-3" />
                <span>{formatDate(blog.date)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <button className="w-full bg-gradient-to-r from-[#D29022] to-[#610E07] text-white py-2 px-4 rounded-lg font-medium hover:from-[#610E07] hover:to-[#D29022] transition-all duration-300 transform hover:scale-[1.02]">
          Read More
        </button>
      </div>
    </div>
  );
};

// BlogsPage Component
const BlogsPage: React.FC<{ onBlogClick: (slug: string) => void }> = ({ onBlogClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockBlogs.map(blog => blog.category)))];
  const allTags = ['All', ...Array.from(new Set(mockBlogs.flatMap(blog => blog.tags)))];

  const filteredBlogs = useMemo(() => {
    return mockBlogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesTag = selectedTag === 'All' || blog.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-l from-[#D29022] to-[#610E07] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-[100px]">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Stories from the Road</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover incredible destinations, local experiences, and travel insights from the Zappotel community
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search blogs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D29022] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D29022] focus:border-transparent appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div className="relative">
              <select
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D29022] focus:border-transparent appearance-none bg-white"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag === 'All' ? 'All Tags' : tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'story' : 'stories'} found
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onClick={onBlogClick} />
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No stories found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// BlogDetailPage Component
const BlogDetailPage: React.FC<{ slug: string; onBack: () => void }> = ({ slug, onBack }) => {
  const blog = mockBlogs.find(b => b.slug === slug);
  
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Blog post not found</p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-[#D29022] to-[#610E07] text-white px-6 py-3 rounded-lg font-medium hover:from-[#610E07] hover:to-[#D29022] transition-all duration-300"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const relatedBlogs = mockBlogs.filter(b => 
    b.id !== blog.id && 
    (b.category === blog.category || b.tags.some(tag => blog.tags.includes(tag)))
  ).slice(0, 3);

  const shareUrl = `https://zappotel.com/blogs/${slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#D29022] transition-colors duration-300"
        >
          <MdArrowBack className="w-5 h-5" />
          Back to Stories
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-gradient-to-r from-[#D29022] to-[#610E07] px-4 py-2 rounded-full text-sm font-medium">
                {blog.category}
              </span>
              <div className="flex items-center gap-2 text-sm">
                <BiTime className="w-4 h-4" />
                {blog.readTime} min read
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            
            <div className="flex items-center gap-4">
              <img 
                src={blog.authorImage} 
                alt={blog.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2 text-lg">
                  <FaUserAlt className="w-4 h-4" />
                  <span className="font-medium">{blog.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MdOutlineDateRange className="w-4 h-4" />
                  <span>{formatDate(blog.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              
              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MdShare className="w-5 h-5" />
                  Share this story
                </h3>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-300"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors duration-300"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Bio */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={blog.authorImage} 
                  alt={blog.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{blog.author}</h4>
                  <p className="text-sm text-gray-500">Travel Writer</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {blog.authorBio}
              </p>
            </div>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Related Stories</h3>
                <div className="space-y-4">
                  {relatedBlogs.map((relatedBlog) => (
                    <div 
                      key={relatedBlog.id}
                      className="cursor-pointer group"
                      onClick={() => window.location.href = `/blogs/${relatedBlog.slug}`}
                    >
                      <div className="flex gap-3">
                        <img 
                          src={relatedBlog.image} 
                          alt={relatedBlog.title}
                          className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-[#D29022] transition-colors duration-300">
                            {relatedBlog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(relatedBlog.date)}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <BiTime className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">{relatedBlog.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const BlogsApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [currentSlug, setCurrentSlug] = useState<string>('');

  const handleBlogClick = (slug: string) => {
    setCurrentSlug(slug);
    setCurrentView('detail');
  };

  const handleBackClick = () => {
    setCurrentView('list');
    setCurrentSlug('');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'list' ? (
        <BlogsPage onBlogClick={handleBlogClick} />
      ) : (
        <BlogDetailPage slug={currentSlug} onBack={handleBackClick} />
      )}
    </div>
  );
};

export default BlogsApp;