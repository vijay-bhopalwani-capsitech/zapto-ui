'use client';
import { selectUserProfileId } from '@/redux/slices/authSlice';
import { useGetBookingList } from '@/services/bookingService/bookingService';
import { difference } from 'next/dist/build/utils';
import React, { use, useState } from 'react';
import { FaBed, FaPlaneDeparture, FaCalendarAlt, FaUserFriends, FaRupeeSign } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { MdVpnKey, MdCheckCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';

interface Booking {
    hotelName: string;
    location: string;
    dates: string;
    guests: string;
    price: string;
    bookingId: string;
    status: string;
}

const bookings: Booking[] = [
    {
        hotelName: 'Zappotel Jaipur',
        location: 'Jaipur, Rajasthan',
        dates: '18 Aug 2025 - 21 Aug 2025',
        guests: '2 Adults',
        price: '₹3,999',
        bookingId: 'ZJPR001',
        status: 'Confirmed',
    },
    {
        hotelName: 'Zappotel Rishikesh',
        location: 'Rishikesh, Uttarakhand',
        dates: '02 Sep 2025 - 06 Sep 2025',
        guests: '1 Adult',
        price: '₹4,250',
        bookingId: 'ZRSH002',
        status: 'Confirmed',
    },
];

const BookingCard: React.FC<{ booking: any }> = ({ booking }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
            {/* Hotel Name */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-[#610E07] mb-1">{booking?.property?.name}</h3>
            </div>

            {/* Booking Details */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                    <GoLocation className="text-[#610E07] text-lg flex-shrink-0" />
                    <span className="text-sm">{booking?.property?.address}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                    <FaCalendarAlt className="text-[#610E07] text-lg flex-shrink-0" />
                    <span className="text-sm">{Math.ceil((new Date(booking?.checkOut).getTime() - new Date(booking?.checkIn).getTime()) / (1000 * 60 * 60 * 24))} days</span>{' '}
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                    <FaUserFriends className="text-[#610E07] text-lg flex-shrink-0" />
                    <span className="text-sm">{booking?.guests || '2 Adults'}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                    <FaRupeeSign className="text-[#610E07] text-lg flex-shrink-0" />
                    <span className="text-sm font-semibold">{booking?.totalPrice}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                    <MdVpnKey className="text-[#610E07] text-lg flex-shrink-0" />
                    <span className="text-sm font-mono">{booking?._id}</span>
                </div>

                <div className="flex items-center gap-3">
                    <MdCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">{booking?.status}</span>
                </div>
            </div>

            {/* View Details Button */}
            <button className="w-full bg-[#D29022] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#b37618] transition-colors duration-200">View Details</button>
        </div>
    );
};

const EmptyState: React.FC = () => {
    return (
        <div className="text-center py-16">
            <div className="relative">
                {/* Background Art */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <div className="text-9xl font-bold text-gray-400">Follow your ❤️</div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="mb-8">
                        <FaBed className="mx-auto text-6xl text-gray-300 mb-4" />
                    </div>

                    <h2 className="text-[#610E07] text-lg font-semibold mb-4">No Bookings Yet</h2>

                    <p className="text-gray-600 mb-6">
                        Start by exploring our{' '}
                        <a href="#" className="text-[#D29022] hover:text-[#b37618] font-medium underline">
                            destinations
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

const MyBookings: React.FC = () => {
    const userProfileId = useSelector(selectUserProfileId);
    const [activeTab, setActiveTab] = useState<'stays' | 'trips'>('stays');
    const { data: bookings, isLoading } = useGetBookingList({ userProfileId }); // Replace with actual user profile ID
    // Set to true to show empty state
    const showEmptyState = false;
    const currentBookings = showEmptyState ? [] : bookings?.results;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Title */}
                    <h1 className="text-3xl font-bold tracking-wide text-center mb-8">
                        <span className="text-[#610E07]">My</span> <span className="text-[#D29022]">Bookings</span>
                    </h1>

                    {/* Tabs */}
                    <div className="flex justify-center">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveTab('stays')}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                                    activeTab === 'stays' ? 'bg-[#D29022] text-white shadow-md' : 'border border-[#D29022] text-[#610E07] bg-transparent hover:bg-[#D29022] hover:text-white'
                                }`}
                            >
                                <FaBed className="text-lg" />
                                Stays
                            </button>
                            <button
                                onClick={() => setActiveTab('trips')}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                                    activeTab === 'trips' ? 'bg-[#D29022] text-white shadow-md' : 'border border-[#D29022] text-[#610E07] bg-transparent hover:bg-[#D29022] hover:text-white'
                                }`}
                            >
                                <FaPlaneDeparture className="text-lg" />
                                Trips
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {activeTab === 'stays' && (
                    <>
                        {currentBookings?.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentBookings?.map((booking, index) => (
                                    <BookingCard key={index} booking={booking} />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'trips' && (
                    <div className="text-center py-16">
                        <div className="mb-8">
                            <FaPlaneDeparture className="mx-auto text-6xl text-gray-300 mb-4" />
                        </div>
                        <h2 className="text-[#610E07] text-lg font-semibold mb-4">No Trip Bookings Found</h2>
                        <p className="text-gray-600">Start planning your next adventure!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
