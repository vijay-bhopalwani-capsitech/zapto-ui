'use client';
import UserHome from '@/components/home/UserHome';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';

const CommunityPage = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    console.log('isAuthenticated:', isAuthenticated);
    if (!isAuthenticated) {
        return (
            <div>
                <div className="bg-gradient-to-l from-[#D29022] to-[#610E07] h-screen text-white py-16">
                    <div className="container mx-auto px-4 pt-[100px] h-full">
                        <div className="flex items-center justify-center flex-col text-center h-full">
                            <h1 className="text-5xl font-bold mb-4">Coming Soon...</h1>
                            <p className="text-xl opacity-90">Zappotel Community</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <UserHome />;
};

export default CommunityPage;
