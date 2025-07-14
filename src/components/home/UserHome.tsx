'use client';

import { appUrls } from '@/config/navigationConfig';
import { selectIsAuthenticated, selectUserProfile, selectUserType } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {  GoLocation } from 'react-icons/go';
import {  GiBackpack, } from 'react-icons/gi';
import { FaWallet, FaRegSmile, FaBed, FaUsers, FaMapMarkerAlt, FaLightbulb, FaArrowRight, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { useGetBookingList } from '@/services/bookingService/bookingService';
import moment from 'moment';

// Reusable Dashboard Card Component
interface DashboardCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="text-[#D29022] text-xl">{icon}</div>
                <h3 className="text-[#610E07] font-semibold text-lg">{title}</h3>
            </div>
            {children}
        </div>
    );
};

// Quick Action Component
interface QuickActionProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick }) => {
    return (
        <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 bg-[#D29022] text-white rounded-lg hover:bg-[#b8791e] transition-colors duration-200">
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
};

export default function UserHome() {
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userType = useSelector(selectUserType);
    const [isLoading, setIsLoading] = useState(true);
    const userProfile = useSelector(selectUserProfile);
    const {data: bookingsData , isLoading: isLoadingBookings} = useGetBookingList({userProfileId: userProfile?._id});
    const bookings = bookingsData?.results || [];
    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         router.push(appUrls.HOME);
    //     } else if (userType !== 'CRM_USER') {
    //         router.push(appUrls.COMMUNITY);
    //     } else {
    //         setIsLoading(false);
    //     }
    // }, [isAuthenticated, userType, router]);

    // Show loading or nothing until authentication checks are complete
    // if (isLoading || !isAuthenticated || userType !== 'CRM_USER') {
    //     return <div className="min-h-screen bg-gray-50"></div>;
    // }

    const handleExploreDestinations = () => {
        router.push(appUrls.PROPERTIES);
    };

    const handleBookings = () => {
        router.push(appUrls.MY_BOOKINGS);
    };

    const handleCredits = () => {
        router.push(appUrls.CREDITS);
    };

    const handleCommunity = () => {
        router.push(appUrls.COMMUNITY);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-[#610E07]">Hey {userProfile?.name?.first} 👋</h1>
                            <p className="text-gray-600 mt-1">Where's your next story taking you? 🎒</p>
                        </div>
                        <div className="flex gap-3">
                            <QuickAction icon={<FaMapMarkerAlt />} label="Explore" onClick={handleExploreDestinations} />
                            <QuickAction icon={<GiBackpack />} label="Plan Trip" onClick={() => router.push('/plan-trip')} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Upcoming Bookings */}
                    <DashboardCard title="Upcoming Bookings" icon={<FaBed />} className="lg:col-span-2">
                        <div className="space-y-4">
                            {/* <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#D29022] rounded-lg flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#610E07]">Zappotel Jaipur</h4>
                                        <p className="text-sm text-gray-600">Pink City Adventure</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-[#610E07]">Dec 15-18</p>
                                    <p className="text-xs text-gray-500">3 nights</p>
                                </div>
                            </div> */}
                            {isLoadingBookings ? (
                                <div className="text-center text-gray-500">Loading bookings...</div>
                            ) : (
                                bookings && bookings.length > 0 ? (
                                    bookings.map((booking) => (
                                        <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-[#D29022] rounded-lg flex items-center justify-center">
                                                    <FaMapMarkerAlt className="text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-[#610E07]">{booking.property?.name}</h4>
                                                    <p className="text-sm text-gray-600">{booking.property?.description || "Spiritual Journey"}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-[#610E07]">{moment(booking.checkIn).format("MMM DD")} - {moment(booking.checkOut).format("MMM DD")}</p>
                                                <p className="text-xs text-gray-500">{moment(booking.checkOut).diff(moment(booking.checkIn), 'days')} nights</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500">No upcoming bookings</div>
                                ))}
                            
                            {/* <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#D29022] rounded-lg flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#610E07]">Zappotel Rishikesh</h4>
                                        <p className="text-sm text-gray-600">Spiritual Journey</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-[#610E07]">Dec 22-25</p>
                                    <p className="text-xs text-gray-500">4 nights</p>
                                </div>
                            </div> */}
                        </div>

                        <button
                            onClick={handleBookings}
                            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-[#D29022] text-[#D29022] rounded-lg hover:bg-[#D29022] hover:text-white transition-colors duration-200"
                        >
                            View All Bookings
                            <FaArrowRight className="text-sm" />
                        </button>
                    </DashboardCard>

                    {/* My Credits */}
                    <DashboardCard title="My Credits" icon={<FaWallet />}>
                        <div className="text-center py-4">
                            <div className="text-3xl font-bold text-[#610E07] mb-2">₹0</div>
                            <p className="text-gray-600 text-sm mb-4">Available Balance</p>
                            <button onClick={handleCredits} className="w-full px-4 py-2 bg-[#D29022] text-white rounded-lg hover:bg-[#b8791e] transition-colors duration-200">
                                Add Credits
                            </button>
                        </div>
                    </DashboardCard>

                    {/* Your Community */}
                    <DashboardCard title="Your Community" icon={<FaUsers />} className="lg:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-[#610E07] mb-1">12</div>
                                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                                    <FaHeart className="text-red-500" />
                                    Kudos Received
                                </div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-[#610E07] mb-1">24</div>
                                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                                    <FaUsers className="text-[#D29022]" />
                                    Connections
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleCommunity}
                            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-[#D29022] text-[#D29022] rounded-lg hover:bg-[#D29022] hover:text-white transition-colors duration-200"
                        >
                            Join Community
                            <FaArrowRight className="text-sm" />
                        </button>
                    </DashboardCard>

                    {/* Explore More Destinations */}
                    <DashboardCard title="Explore More" icon={<GoLocation />}>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                    <FaMapMarkerAlt className="text-pink-600 text-sm" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#610E07]">Kasol</p>
                                    <p className="text-xs text-gray-500">Mini Israel</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaMapMarkerAlt className="text-blue-600 text-sm" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#610E07]">Goa</p>
                                    <p className="text-xs text-gray-500">Beach Paradise</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FaMapMarkerAlt className="text-green-600 text-sm" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#610E07]">Manali</p>
                                    <p className="text-xs text-gray-500">Hill Station</p>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>

                    {/* Backpacker Tips */}
                    <DashboardCard title="Backpacker Tips" icon={<FaLightbulb />} className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <HiSparkles className="text-yellow-600" />
                                    <h4 className="font-semibold text-[#610E07]">Pack Light</h4>
                                </div>
                                <p className="text-sm text-gray-600">Bring only essentials. Your back will thank you on those long treks!</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaUsers className="text-blue-600" />
                                    <h4 className="font-semibold text-[#610E07]">Connect Locally</h4>
                                </div>
                                <p className="text-sm text-gray-600">Join our community events and meet fellow backpackers in your destination.</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCalendarAlt className="text-green-600" />
                                    <h4 className="font-semibold text-[#610E07]">Book Early</h4>
                                </div>
                                <p className="text-sm text-gray-600">Best stays get booked fast. Plan ahead for better rates and availability.</p>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
}
