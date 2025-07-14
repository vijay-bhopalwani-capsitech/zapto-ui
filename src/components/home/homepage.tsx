'use client';

import BookingEngine from '@/app/(admin_app)/(user)/booking/page';
import { appUrls } from '@/config/navigationConfig';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaUsers, FaHeart, FaStar, FaArrowRight, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { GiBackpack, GiFountainPen, GiTrample, GiBeech } from 'react-icons/gi';
import { HiSparkles } from 'react-icons/hi';

interface DestinationCardProps {
    name: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    color: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ name, description, image, icon, color }) => {
    return (
        <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-105">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative" style={{ backgroundImage: `url(${image})` , backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300"></div>
                <div className="absolute top-4 left-4 p-2 bg-white bg-opacity-90 rounded-lg">
                    <div className={`${color} text-xl`}>{icon}</div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{name}</h3>
                    <p className="text-sm opacity-90">{description}</p>
                </div>
            </div>
        </div>
    );
};

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl text-[#D29022] mb-4 flex justify-center">{icon}</div>
            <h3 className="text-xl font-semibold text-[#610E07] mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default function Homepage() {
    const router = useRouter();

    const handleExploreDestinations = () => {
        router.push(appUrls.PROPERTIES);
    };

    const handleLogin = () => {
        router.push('/login');
    };

    const destinations = [
        {
            name: 'Jaipur',
            description: 'Pink City Palaces',
            image: 'https://static.toiimg.com/img/115224983/Master.jpg',
            icon: <GiTrample />,
            color: 'text-pink-600',
        },
        {
            name: 'Rishikesh',
            description: 'Spiritual Ganges',
            image: 'https://t4.ftcdn.net/jpg/12/45/31/73/360_F_1245317300_wYEe6TwI4ojLt0w9MRleFtPYKZgloUSY.jpg',
            icon: <GiFountainPen />,
            color: 'text-blue-600',
        },
        {
            name: 'Kasol',
            description: 'Mini Israel Vibes',
            image: 'https://moxtain.s3.ap-south-1.amazonaws.com/blogs/Kasol/pravati-valley-kasol.jpg',
            icon: <GiFountainPen />,
            color: 'text-green-600',
        },
        {
            name: 'Goa',
            description: 'Beach Paradise',
            image: 'https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=iGV1Ue0Efj87dQirWnUpZVG1dNobUjfVvMGdKHTJ7Qg=',
            icon: <GiBeech />,
            color: 'text-orange-600',
        },
        {
            name: 'Manali',
            description: 'Hill Station Haven',
            image: 'https://static.toiimg.com/photo/115938932.cms',
            icon: <GiFountainPen />,
            color: 'text-purple-600',
        },
        {
            name: 'Udaipur',
            description: 'City of Lakes',
            image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/udaipur.jpg',
            icon: <GiTrample />,
            color: 'text-indigo-600',
        },
    ];

    const features = [
        {
            icon: <FaUsers />,
            title: 'Community First',
            description: 'Connect with like-minded backpackers and share your adventures with a vibrant community.',
        },
        {
            icon: <HiSparkles />,
            title: 'Curated Vibes',
            description: 'Each stay is handpicked for its unique character and authentic local experience.',
        },
        {
            icon: <FaHeart />,
            title: 'Stories Over Stays',
            description: 'Every booking is a chapter in your travel story. Collect memories, not just stamps.',
        },
    ];

    return (
        <div className="min-h-screen bg-white   ">
            {/* Navigation */}
            {/* <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <GiBackpack className="text-[#D29022] text-2xl" />
              <span className="text-xl font-bold text-[#610E07]">Zappotel</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#destinations" className="text-gray-600 hover:text-[#610E07] transition-colors">Destinations</a>
              <a href="#about" className="text-gray-600 hover:text-[#610E07] transition-colors">About</a>
              <a href="#community" className="text-gray-600 hover:text-[#610E07] transition-colors">Community</a>
              <button 
                onClick={handleLogin}
                className="px-4 py-2 border border-[#D29022] text-[#D29022] rounded-lg hover:bg-[#D29022] hover:text-white transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav> */}

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                {/* 🔹 Background Video */}
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
                    <source src="https://video.wixstatic.com/video/904e61_569587112c0d48eab8d0bdc27c5c0b0a/1080p/mp4/file.mp4" type="video/mp4" />
                    {/* Fallback text or image */}
                    Your browser does not support the video tag.
                </video>

                {/* 🔹 Optional dark overlay for text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

                {/* 🔹 Existing Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Discover India Through Stays That Speak <span className="text-[#D29022]">Stories</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">From forts in Jaipur to rivers in Rishikesh – find your vibe.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleExploreDestinations}
                            className="px-8 py-3 bg-[#D29022] text-white rounded-lg hover:bg-[#b8791e] transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-semibold"
                        >
                            <GiBackpack />
                            Explore Destinations
                        </button>
                        <button onClick={handleLogin} className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#610E07] transition-colors duration-200 text-lg font-semibold">
                            Login
                        </button>
                    </div>
                    {/* <BookingEngine/> */}
                </div>
            </section>

            {/* Top Destinations Grid */}
            <section id="destinations" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#610E07] mb-4">Top Destinations</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore our handpicked destinations that offer unique experiences and unforgettable memories.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((destination, index) => (
                            <DestinationCard key={index} name={destination.name} description={destination.description} image={destination.image} icon={destination.icon} color={destination.color} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Zappotel Section */}
            <section id="about" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#610E07] mb-4">Why Zappotel?</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">We're not just another booking platform. We're your gateway to authentic Indian adventures.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section id="community" className="py-16 bg-gradient-to-r from-[#610E07] to-[#8B1A0A] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
                        <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">Connect with 10,000+ backpackers who've discovered their perfect vibe across India.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#D29022] mb-2">10K+</div>
                                <div className="text-sm text-gray-300">Active Backpackers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#D29022] mb-2">50+</div>
                                <div className="text-sm text-gray-300">Unique Stays</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#D29022] mb-2">15</div>
                                <div className="text-sm text-gray-300">Cities Covered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Call to Action */}
            <footer className="bg-[#610E07] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-4">Backpack India, one story at a time.</h3>
                        <button
                            onClick={handleExploreDestinations}
                            className="px-8 py-3 bg-[#D29022] text-white rounded-lg hover:bg-[#b8791e] transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-semibold mx-auto"
                        >
                            Start Your Journey
                            <FaArrowRight />
                        </button>
                    </div>

                    <div className="border-t border-gray-600 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-2 mb-4 md:mb-0">
                                <GiBackpack className="text-[#D29022] text-2xl" />
                                <span className="text-xl font-bold">Zappotel</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <FaInstagram />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <FaTwitter />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <FaFacebookF />
                                </a>
                            </div>
                        </div>
                        <div className="text-center text-gray-400 text-sm mt-6">© 2024 Zappotel. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
