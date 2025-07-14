'use client';
import React, { useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { AiFillStar } from 'react-icons/ai';
import { FaWifi, FaParking, FaCoffee, FaBed, FaUtensils, FaCar, FaSwimmingPool, FaGlassCheers } from 'react-icons/fa';
import { BiWifi, BiCoffee } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

// Type definitions
export interface Property {
    id: number;
    name: string;
    location: string;
    price: number;
    image: string;
    tagline: string;
    chain: string;
    tags: string[];
    rating: number;
    amenities: string[];
}

// Mock data
const mockProperties: Property[] = [
    {
        id: 1,
        name: 'Zappotel Jaipur',
        location: 'Jaipur, Rajasthan',
        price: 899,
        image: 'https://static.toiimg.com/img/115224983/Master.jpg',
        tagline: 'For the explorer in you',
        chain: 'Zappotel Heritage',
        tags: ['Backpacker', 'Group-friendly'],
        rating: 4.5,
        amenities: ['WiFi', 'Breakfast', 'Parking'],
    },
    {
        id: 2,
        name: 'Zappotel Rishikesh',
        location: 'Rishikesh, Uttarakhand',
        price: 1299,
        image: 'https://t4.ftcdn.net/jpg/12/45/31/73/360_F_1245317300_wYEe6TwI4ojLt0w9MRleFtPYKZgloUSY.jpg',
        tagline: 'Riverside serenity awaits',
        chain: 'Zappotel Select',
        tags: ['Luxury', 'Group-friendly'],
        rating: 4.7,
        amenities: ['WiFi', 'Breakfast', 'Parking'],
    },
    {
        id: 3,
        name: 'Zappotel Kasol',
        location: 'Kasol, Himachal Pradesh',
        price: 750,
        image: 'https://moxtain.s3.ap-south-1.amazonaws.com/blogs/Kasol/pravati-valley-kasol.jpg',
        tagline: 'Mountain vibes, backpacker tribe',
        chain: 'Zappotel Backpackers',
        tags: ['Backpacker', 'Group-friendly'],
        rating: 4.3,
        amenities: ['WiFi', 'Breakfast'],
    },
    {
        id: 4,
        name: 'Zappotel Goa',
        location: 'Anjuna, Goa',
        price: 1599,
        image: 'https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=iGV1Ue0Efj87dQirWnUpZVG1dNobUjfVvMGdKHTJ7Qg=',
        tagline: 'Beach vibes, party nights',
        chain: 'Zappotel Select',
        tags: ['Luxury', 'Group-friendly'],
        rating: 4.6,
        amenities: ['WiFi', 'Breakfast', 'Parking'],
    },
    {
        id: 5,
        name: 'Zappotel Manali',
        location: 'Old Manali, Himachal Pradesh',
        price: 950,
        image: 'https://static.toiimg.com/photo/115938932.cms',
        tagline: 'Snow-capped adventures',
        chain: 'Zappotel Heritage',
        tags: ['Backpacker', 'Group-friendly'],
        rating: 4.4,
        amenities: ['WiFi', 'Breakfast'],
    },
    {
        id: 6,
        name: 'Zappotel Udaipur',
        location: 'Lake Pichola, Udaipur',
        price: 1899,
        image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/udaipur.jpg',
        tagline: 'Royal luxury redefined',
        chain: 'Zappotel Select',
        tags: ['Luxury'],
        rating: 4.8,
        amenities: ['WiFi', 'Breakfast', 'Parking'],
    },
];

// Utility Components
const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    const getIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'wifi':
                return <FaWifi className="text-[#D29022]" />;
            case 'parking':
                return <FaParking className="text-[#D29022]" />;
            case 'breakfast':
                return <FaUtensils className="text-[#D29022]" />;
            case 'coffee':
                return <FaCoffee className="text-[#D29022]" />;
            case 'pool':
                return <FaSwimmingPool className="text-[#D29022]" />;
            case 'bar':
                return <FaGlassCheers className="text-[#D29022]" />;
            default:
                return <FaBed className="text-[#D29022]" />;
        }
    };

    return (
        <div className="flex items-center gap-1 text-sm text-gray-600">
            {getIcon(amenity)}
            <span>{amenity}</span>
        </div>
    );
};

const TagPill: React.FC<{ tag: string }> = ({ tag }) => {
    const getTagColor = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'luxury':
                return 'bg-gradient-to-r from-[#D29022] to-[#610E07] text-white';
            case 'backpacker':
                return 'bg-green-100 text-green-800';
            case 'group-friendly':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>{tag}</span>;
};

// PropertyCard Component
const PropertyCard: React.FC<{ property: Property; onViewDetails: (id: number) => void }> = ({ property, onViewDetails }) => {
    return (
        <div onClick={() => onViewDetails(property.id)} className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Image with Chain Badge */}
            <div className="relative overflow-hidden">
                <img src={property.image} alt={property.name} className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-[#D29022] to-[#610E07] text-white px-3 py-1 rounded-full text-xs font-medium">{property.chain}</div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Title & Location */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-[#610E07] hover:text-[#D29022] transition-colors"
                    >
                        <GoLocation className="text-[#610E07]" />
                        {property.location}
                    </a>
                </div>

                {/* Tagline */}
                <p className="text-gray-600 text-sm italic">{property.tagline}</p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <AiFillStar key={i} className={i < Math.floor(property.rating) ? 'text-[#D29022]' : 'text-gray-300'} />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">({property.rating})</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-3">
                    {property.amenities.map((amenity, index) => (
                        <AmenityIcon key={index} amenity={amenity} />
                    ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {property.tags.map((tag, index) => (
                        <TagPill key={index} tag={tag} />
                    ))}
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-2">
                    <div className="text-2xl font-bold text-[#610E07]">
                        ₹{property.price.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500">/night</span>
                    </div>
                    <button onClick={() => onViewDetails(property.id)} className="bg-gradient-to-r from-[#D29022] to-[#610E07] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow font-medium">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

// PropertiesPage Component
const PropertiesPage: React.FC<{ onPropertySelect: (id: number) => void }> = ({ onPropertySelect }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-l from-[#D29022] to-[#610E07] text-white py-16">
                <div className="container mx-auto px-4 text-center pt-[102px]">
                    <h1 className="text-4xl font-bold mb-4">Discover Amazing Destinations</h1>
                    <p className="text-xl opacity-90">Find your perfect stay with Zappotel</p>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} onViewDetails={onPropertySelect} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// PropertyDetailsPage Component
const PropertyDetailsPage: React.FC<{ propertyId: number; onBack: () => void }> = ({ propertyId, onBack }) => {
    const router = useRouter();
    const property = mockProperties.find((p) => p.id === propertyId);

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
                    <button onClick={onBack} className="bg-gradient-to-r from-[#D29022] to-[#610E07] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow">
                        Back to Properties
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Image */}
            <div className="relative h-96 overflow-hidden ">
                <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Back Button */}
                {/* <button onClick={onBack} className="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg transition-colors">
                    ← Back to Properties
                </button> */}

                {/* Chain Badge */}
                {/* <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D29022] to-[#610E07] text-white px-4 py-2 rounded-full font-medium">{property.chain}</div> */}
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-8 -mt-20 relative z-10">
                    {/* Title & Location */}
                    <div>
                        <div className="mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#610E07] hover:text-[#D29022] transition-colors text-lg"
                            >
                                <GoLocation />
                                {property.location}
                                <span className="text-sm bg-gray-100 px-2 py-1 rounded ml-2">Open in Google Maps</span>
                            </a>
                        </div>

                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D29022] to-[#610E07] text-white px-4 py-2 rounded-full font-medium">{property.chain}</div>
                    </div>

                    {/* Tagline */}
                    <p className="text-md text-gray-600 italic mb-6 bg-gray-100 px-4 py-2 rounded-full w-fit">#{property.tagline}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <AiFillStar key={i} className={i < Math.floor(property.rating) ? 'text-[#D29022] text-xl' : 'text-gray-300 text-xl'} />
                            ))}
                        </div>
                        <span className="text-lg text-gray-600 ml-1">({property.rating}/5)</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {property.tags.map((tag, index) => (
                            <TagPill key={index} tag={tag} />
                        ))}
                    </div>

                    {/* Amenities */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {property.amenities.map((amenity, index) => (
                                <AmenityIcon key={index} amenity={amenity} />
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    {/* <div className="text-center border-t pt-6">
                        <div className="text-4xl font-bold text-[#610E07] mb-2">
                            ₹{property.price.toLocaleString()}
                            <span className="text-lg font-normal text-gray-500">/night</span>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-20">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#610E07]">₹{property.price.toLocaleString()}/night</div>
                    <div className="flex items-center gap-4"> 
                        <button onClick={onBack} className=" bg-white/90 hover:bg-red text-gray-800 px-4 py-2 rounded-lg transition-colors">
                            ← Back
                        </button>
                        <button onClick={() => router.push(`/booking`)} className="bg-gradient-to-r from-[#D29022] to-[#610E07] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-shadow font-medium text-lg">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main App Component
const PropertiesApp: React.FC = () => {
    const [currentView, setCurrentView] = useState<'list' | 'details'>('list');
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

    const handlePropertySelect = (id: number) => {
        setSelectedPropertyId(id);
        setCurrentView('details');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedPropertyId(null);
    };

    return <div className="App">{currentView === 'list' ? <PropertiesPage onPropertySelect={handlePropertySelect} /> : <PropertyDetailsPage propertyId={selectedPropertyId!} onBack={handleBackToList} />}</div>;
};

export default PropertiesApp;
