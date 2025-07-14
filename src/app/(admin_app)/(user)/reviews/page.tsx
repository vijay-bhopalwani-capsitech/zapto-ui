"use client";
import React, { useState } from 'react';
import { FaStar, FaRegStar, FaUserCircle, FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaFilter, FaChevronDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// Type Definitions
export interface Review {
  id: string;
  guestName: string;
  date: string; // ISO format
  rating: number; // 1 to 5
  review: string;
  property: {
    name: string;
    location: string;
  };
  tags?: string[];
}

// Mock Data
const mockReviews: Review[] = [
  {
    id: '1',
    guestName: 'Sarah Johnson',
    date: '2024-12-15T10:00:00Z',
    rating: 5,
    review: 'Absolutely stunning experience at Zappotel! The staff went above and beyond to make our stay memorable. The room was immaculate, the view was breathtaking, and the amenities were top-notch. Every detail was carefully thought out, from the welcome drinks to the personalized service. I would definitely recommend this place to anyone looking for a luxury getaway.',
    property: {
      name: 'Zappotel Marina Bay',
      location: 'Singapore'
    },
    tags: ['Luxury', 'Solo Traveler']
  },
  {
    id: '2',
    guestName: 'Mike Chen',
    date: '2024-12-10T14:30:00Z',
    rating: 4,
    review: 'Great location and excellent service. The hotel staff were very friendly and accommodating. The breakfast buffet was impressive with a wide variety of options. The only minor issue was the Wi-Fi connectivity in some areas, but overall a fantastic stay.',
    property: {
      name: 'Zappotel City Center',
      location: 'Bangkok, Thailand'
    },
    tags: ['Business Trip', 'Group Trip']
  },
  {
    id: '3',
    guestName: 'Emma Rodriguez',
    date: '2024-12-08T09:15:00Z',
    rating: 5,
    review: 'Perfect honeymoon destination! The romantic atmosphere, beautiful architecture, and exceptional dining made our stay unforgettable. The spa services were divine, and the sunset views from our balcony were magical. Thank you for making our special moment even more special.',
    property: {
      name: 'Zappotel Beachfront Resort',
      location: 'Bali, Indonesia'
    },
    tags: ['Romantic', 'Honeymoon']
  },
  {
    id: '4',
    guestName: 'David Thompson',
    date: '2024-12-05T16:45:00Z',
    rating: 4,
    review: 'Solid choice for a family vacation. The kids loved the pool area and the entertainment activities. The family suite was spacious and comfortable. Food quality was good, though could use more variety in the kids menu.',
    property: {
      name: 'Zappotel Family Resort',
      location: 'Gold Coast, Australia'
    },
    tags: ['Family Trip', 'Kids Friendly']
  },
  {
    id: '5',
    guestName: 'Lisa Park',
    date: '2024-12-02T11:20:00Z',
    rating: 5,
    review: 'As a solo female traveler, I felt completely safe and welcomed. The concierge team provided excellent local recommendations, and the rooftop bar was the perfect spot to meet other travelers. The attention to detail in room amenities was impressive.',
    property: {
      name: 'Zappotel Urban Retreat',
      location: 'Tokyo, Japan'
    },
    tags: ['Solo Traveler', 'Adventure']
  },
  {
    id: '6',
    guestName: 'Robert Wilson',
    date: '2024-11-28T13:30:00Z',
    rating: 3,
    review: 'Decent stay overall. The location was convenient and the room was clean. However, the check-in process took longer than expected, and the restaurant service was a bit slow during peak hours. The gym facilities were well-maintained though.',
    property: {
      name: 'Zappotel Business Hub',
      location: 'New York, USA'
    },
    tags: ['Business Trip', 'Backpacker']
  }
];

// ReviewCard Component
const ReviewCard: React.FC<{ review: Review; onReadMore: (review: Review) => void }> = ({ review, onReadMore }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              {getInitials(review.guestName)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{review.guestName}</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <FaCalendarAlt className="w-3 h-3 mr-1" />
                {formatDate(review.date)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(review.rating)}
          </div>
        </div>

        {/* Property Info */}
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="w-3 h-3 mr-1 text-[#D29022]" />
          <span className="text-sm font-medium">{review.property.name}</span>
          <span className="text-sm text-gray-400 ml-1">• {review.property.location}</span>
        </div>

        {/* Review Text */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {truncateText(review.review)}
          </p>
          {review.review.length > 150 && (
            <button
              onClick={() => onReadMore(review)}
              className="text-[#D29022] hover:text-[#610E07] text-sm font-medium mt-2 transition-colors duration-200"
            >
              Read more
            </button>
          )}
        </div>

        {/* Tags */}
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {review.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-[#D29022] to-[#610E07] text-white text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ReviewDetailModal Component
const ReviewDetailModal: React.FC<{ review: Review | null; onClose: () => void }> = ({ review, onClose }) => {
  if (!review) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400 text-lg" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 text-lg" />
        )
      );
    }
    return stars;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <MdClose className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {getInitials(review.guestName)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{review.guestName}</h2>
              <div className="flex items-center text-gray-500 mt-1">
                <FaCalendarAlt className="w-4 h-4 mr-2" />
                {formatDate(review.date)}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center space-x-1">
              {renderStars(review.rating)}
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {review.rating}.0 out of 5 stars
            </span>
          </div>

          {/* Property Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="w-4 h-4 mr-2 text-[#D29022]" />
              <span className="font-semibold text-lg">{review.property.name}</span>
            </div>
            <p className="text-gray-600 ml-6">{review.property.location}</p>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Review</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {review.review}
            </p>
          </div>

          {/* Tags */}
          {review.tags && review.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {review.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-[#D29022] to-[#610E07] text-white rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main ReviewsPage Component
const ReviewsPage: React.FC = () => {
  const [reviews] = useState<Review[]>(mockReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  const properties = Array.from(new Set(reviews.map(r => r.property.name)));

  const applyFilters = () => {
    let filtered = reviews;

    if (selectedProperty !== 'all') {
      filtered = filtered.filter(r => r.property.name === selectedProperty);
    }

    if (selectedRating > 0) {
      filtered = filtered.filter(r => r.rating >= selectedRating);
    }

    // Sort by newest first
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredReviews(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [selectedProperty, selectedRating]);

  const handleReadMore = (review: Review) => {
    setSelectedReview(review);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-l from-[#D29022] to-[#610E07] text-white py-16">
        <div className="container mx-auto px-4 pt-[100px]" >
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">What Our Guests Are Saying</h1>
            <p className="text-xl opacity-90">
              Discover authentic experiences from travelers who've stayed with Zappotel
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-gray-700 hover:text-[#D29022] transition-colors duration-200 mb-4"
          >
            <FaFilter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
            <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Property Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property
                </label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D29022] focus:border-transparent"
                >
                  <option value="all">All Properties</option>
                  {properties.map(property => (
                    <option key={property} value={property}>
                      {property}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D29022] focus:border-transparent"
                >
                  <option value={0}>All Ratings</option>
                  <option value={4}>4+ Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onReadMore={handleReadMore}
            />
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Review Detail Modal */}
      <ReviewDetailModal
        review={selectedReview}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ReviewsPage;