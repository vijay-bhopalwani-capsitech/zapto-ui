'use client';
import React, { useState, useEffect } from 'react';
import { GoLocation } from 'react-icons/go';
import { GiBackpack, GiMountainCave, GiCastle, GiTreehouse } from 'react-icons/gi';
import { FaFilter, FaTags, FaHeart, FaRupeeSign, FaMapMarkerAlt, FaRegHeart, FaUsers, FaStar, FaWifi, FaCoffee, FaParking } from 'react-icons/fa';
import { MdLocationOn, MdFilterList, MdClose, MdRefresh } from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { selectIsAuthenticated, selectUserProfile } from '@/redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { Collapse, Row, Col, Select, Button, Typography, Space, theme } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;

// Mock user data
// const mockUser = {
//   name: 'Mahipal',
//   role: 'CRM_USER'
// };

// Mock data
const mockProperties = [
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

const mockChains = [
    {
        id: 1,
        name: 'Zappotel Heritage',
        icon: <GiCastle className="text-2xl" />,
        description: 'Historic properties with cultural immersion',
        count: 12,
        color: 'bg-amber-100 text-amber-800',
    },
    {
        id: 2,
        name: 'Zappotel Backpackers',
        icon: <GiBackpack className="text-2xl" />,
        description: 'Budget-friendly stays for adventurers',
        count: 18,
        color: 'bg-green-100 text-green-800',
    },
    {
        id: 3,
        name: 'Zappotel Select',
        icon: <GiTreehouse className="text-2xl" />,
        description: 'Premium comfort meets local charm',
        count: 8,
        color: 'bg-purple-100 text-purple-800',
    },
    {
        id: 4,
        name: 'Zappotel Mountain',
        icon: <GiMountainCave className="text-2xl" />,
        description: 'High-altitude retreats and hill stations',
        count: 15,
        color: 'bg-blue-100 text-blue-800',
    },
];

const locations = [
    'All Destinations',
    'Jaipur, Rajasthan',
    'Rishikesh, Uttarakhand',
    'Kasol, Himachal Pradesh',
    'Goa',
    'Manali, Himachal Pradesh',
    'Udaipur, Rajasthan',
    'Delhi',
    'Mumbai, Maharashtra',
    'Bangalore, Karnataka',
];

const tags = ['Backpacker', 'Luxury', 'Group-friendly'];
const chains = ['Zappotel Heritage', 'Zappotel Backpackers', 'Zappotel Select', 'Zappotel Mountain'];

const ExploreHeader = ({ user }: { user: any }) => (
    // <div className="  bg-white border-b border-gray-200 shadow-sm">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //         <div className="flex items-center justify-between">
    //             <div>
    //                 <h1 className="text-2xl sm:text-3xl font-bold">
    //                     <span style={{ color: '#610E07' }}>Explore</span> <span style={{ color: '#D29022' }}>Zappotel</span> <span className="text-gray-800">Stays</span>
    //                 </h1>
    //                 <p className="text-gray-600 mt-1">Discover your next adventure</p>
    //             </div>
    //             <div className="hidden sm:block">
    //                 <p className="text-gray-700">
    //                     👋 Welcome back, <span className="font-semibold">{user?.name?.first}</span>!
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div className=" text-white py-16">
        <div className="container mx-auto px-4 pt-[100px]">
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    <span style={{ color: '#610E07' }}>Explore</span> <span style={{ color: '#D29022' }}>Zappotel</span> <span className="text-gray-800">Stays</span>
                    {' '}
                </h1>
                <p className="text-xl opacity-90">Discover authentic experiences from travelers who've stayed with Zappotel</p>
            </div>
        </div>
    </div>
);

type FilterBarProps = {
    filters: any;
    onFilterChange: (key: string, value: any) => void;
    onClearFilters: () => void;
};
const FilterBar = ({ filters, onFilterChange, onClearFilters }: FilterBarProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { token } = theme.useToken();

    return (
        <div className="sticky top-[100px] z-40 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between ">
                    <Space size="middle">
                        <FaFilter className="text-[#610E07]" />
                        <Typography.Text strong style={{ color: '#610E07' }}>
                            Filters
                        </Typography.Text>
                    </Space>

                    <Button type="text" icon={isExpanded ? <MdClose /> : <MdFilterList />} className="sm:hidden" onClick={() => setIsExpanded((prev) => !prev)} />
                </div>

                <Collapse ghost activeKey={isExpanded ? ['1'] : []} onChange={() => setIsExpanded(!isExpanded)}>
                    <Panel key="1" showArrow={false} header={null}>
                        <Row gutter={[16, 16]}>
                            {/* Location Filter */}
                            <Col xs={24} sm={12} lg={6}>
                                <Typography.Text className="block text-sm font-medium text-gray-700">
                                    <MdLocationOn className="inline mr-1" />
                                    Location
                                </Typography.Text>
                                <Select style={{ width: '100%' }} placeholder="Select location" value={filters.location} onChange={(val) => onFilterChange('location', val)} allowClear>
                                    {locations.map((location) => (
                                        <Option key={location} value={location}>
                                            {location}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>

                            {/* Vibe Filter */}
                            <Col xs={24} sm={12} lg={6}>
                                <Typography.Text className="block text-sm font-medium text-gray-700">
                                    <FaTags className="inline mr-1" />
                                    Vibe
                                </Typography.Text>
                                <Select style={{ width: '100%' }} placeholder="Select vibe" value={filters.tag} onChange={(val) => onFilterChange('tag', val)} allowClear>
                                    {tags.map((tag) => (
                                        <Option key={tag} value={tag}>
                                            {tag}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>

                            {/* Price Range Filter */}
                            <Col xs={24} sm={12} lg={6}>
                                <Typography.Text className="block text-sm font-medium text-gray-700">
                                    <FaRupeeSign className="inline mr-1" />
                                    Price Range
                                </Typography.Text>
                                <Select style={{ width: '100%' }} placeholder="Select price range" value={filters.priceRange} onChange={(val) => onFilterChange('priceRange', val)} allowClear>
                                    <Option value="0-1000">₹0 - ₹1,000</Option>
                                    <Option value="1000-1500">₹1,000 - ₹1,500</Option>
                                    <Option value="1500-2000">₹1,500 - ₹2,000</Option>
                                    <Option value="2000+">₹2,000+</Option>
                                </Select>
                            </Col>

                            {/* Chain Filter */}
                            <Col xs={24} sm={12} lg={6}>
                                <Typography.Text className="block text-sm font-medium text-gray-700">Chain</Typography.Text>
                                <Select style={{ width: '100%' }} placeholder="Select chain" value={filters.chain} onChange={(val) => onFilterChange('chain', val)} allowClear>
                                    {chains.map((chain) => (
                                        <Option key={chain} value={chain}>
                                            {chain}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>

                        <div className="mt-4 flex justify-end">
                            <Button icon={<MdRefresh />} onClick={onClearFilters} className="border-[#D29022] text-[#D29022] hover:bg-[#fff5e6]">
                                Reset Filters
                            </Button>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
};

const PropertyCard = ({ property, onSave, isSaved }: { property: any; onSave: (id: number) => void; isSaved: boolean }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="relative">
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
            <div className="absolute top-3 right-3">
                <button onClick={() => onSave(property.id)} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110">
                    {isSaved ? <FaHeart className="text-red-500 text-lg" /> : <FaRegHeart className="text-gray-600 text-lg" />}
                </button>
            </div>
            <div className="absolute top-3 left-3">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.chain === 'Zappotel Heritage'
                            ? 'bg-amber-100 text-amber-800'
                            : property.chain === 'Zappotel Backpackers'
                            ? 'bg-green-100 text-green-800'
                            : property.chain === 'Zappotel Select'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                    }`}
                >
                    {property.chain}
                </span>
            </div>
        </div>

        <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-lg text-gray-800">{property.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FaStar className="text-yellow-500" />
                    <span>{property.rating}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 text-gray-600 mb-2">
                <FaMapMarkerAlt className="text-sm" />
                <span className="text-sm">{property.location}</span>
            </div>

            <p className="text-gray-600 text-sm mb-3">{property.tagline}</p>

            <div className="flex items-center gap-2 mb-3">
                {property.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-2 mb-3">
                {property.amenities.map((amenity: string) => (
                    <span key={amenity} className="text-gray-500 text-xs">
                        {amenity === 'WiFi' && <FaWifi />}
                        {amenity === 'Breakfast' && <FaCoffee />}
                        {amenity === 'Parking' && <FaParking />}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <FaRupeeSign className="text-lg font-bold" style={{ color: '#D29022' }} />
                    <span className="text-xl font-bold" style={{ color: '#D29022' }}>
                        {property.price}
                    </span>
                    <span className="text-sm text-gray-500">/ night</span>
                </div>
                <button className="px-4 py-2 rounded-lg font-medium text-white hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#D29022' }}>
                    Book Now
                </button>
            </div>
        </div>
    </div>
);

const ChainCard = ({ chain }: { chain: any }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 min-w-[280px]">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${chain.color}`}>{chain.icon}</div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">{chain.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{chain.description}</p>
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{chain.count} properties</span>
            <button className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm">
                View Properties
                <IoIosArrowForward />
            </button>
        </div>
    </div>
);

const EmptyState = ({ onResetFilters }: { onResetFilters: () => void }) => (
    <div className="text-center py-16">
        <GiBackpack className="mx-auto text-6xl text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No stays match your vibe 😕</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters to discover more amazing stays</p>
        <button onClick={onResetFilters} className="px-6 py-3 rounded-lg font-medium text-white hover:shadow-md transition-all duration-200" style={{ backgroundColor: '#D29022' }}>
            <MdRefresh className="inline mr-2" />
            Reset Filters
        </button>
    </div>
);

const ZappotelExplore = () => {
    const [savedProperties, setSavedProperties] = useState<number[]>([]);
    const [filters, setFilters] = useState({
        location: 'All Destinations',
        tag: '',
        priceRange: '',
        chain: '',
    });
    const [filteredProperties, setFilteredProperties] = useState(mockProperties);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userProfile = useSelector(selectUserProfile);
    useEffect(() => {
        if (!isAuthenticated) {
            // In a real app, you'd redirect to /auth/login
            console.log('Redirecting to /auth/login');
            return;
        }
    }, [isAuthenticated]);

    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            let filtered = mockProperties;

            if (filters.location !== 'All Destinations') {
                filtered = filtered.filter((p) => p.location === filters.location);
            }

            if (filters.tag) {
                filtered = filtered.filter((p) => p.tags.includes(filters.tag));
            }

            if (filters.priceRange) {
                const [min, max] = filters.priceRange.split('-').map((p) => p.replace('+', '').replace('₹', '').replace(',', ''));
                filtered = filtered.filter((p) => {
                    if (filters.priceRange === '2000+') return p.price >= 2000;
                    return p.price >= parseInt(min) && p.price <= parseInt(max);
                });
            }

            if (filters.chain) {
                filtered = filtered.filter((p) => p.chain === filters.chain);
            }

            setFilteredProperties(filtered);
            setIsLoading(false);
        }, 500);
    }, [filters]);

    const handleFilterChange = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters({
            location: 'All Destinations',
            tag: '',
            priceRange: '',
            chain: '',
        });
    };

    const handleSaveProperty = (id: number) => {
        setSavedProperties((prev) => (prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]));
    };

    // if (!isAuthenticated) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-gray-50">
    //             <div className="text-center">
    //                 <GiBackpack className="mx-auto text-6xl text-gray-400 mb-4" />
    //                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
    //                 <p className="text-gray-600 mb-6">Please log in to explore Zappotel stays</p>
    //                 <button className="px-6 py-3 rounded-lg font-medium text-white" style={{ backgroundColor: '#D29022' }}>
    //                     Go to Login
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-gray-50">
            <ExploreHeader user={userProfile} />

            <FilterBar filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Properties Grid */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">{filteredProperties.length} stays found</h2>
                        <div className="text-sm text-gray-600">{savedProperties.length} saved</div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                                    <div className="h-48 bg-gray-300"></div>
                                    <div className="p-4">
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-3 bg-gray-300 rounded mb-4"></div>
                                        <div className="h-6 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <EmptyState onResetFilters={handleClearFilters} />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} onSave={handleSaveProperty} isSaved={savedProperties.includes(property.id)} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Chain Showcase */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore by Chain</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {mockChains.map((chain) => (
                            <ChainCard key={chain.id} chain={chain} />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center py-8 border-t border-gray-200">
                    <p className="text-gray-600">Made with ❤️ for backpackers and luxury seekers alike</p>
                </div>
            </div>
        </div>
    );
};

export default ZappotelExplore;
