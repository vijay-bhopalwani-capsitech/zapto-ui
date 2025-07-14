'use client';
import Homepage from '@/components/home/homepage';
import UserHome from '@/components/home/UserHome';
import { appUrls } from '@/config/navigationConfig';
import { selectIsAuthenticated, selectUserType } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Home() {
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userType = useSelector(selectUserType);
    console.log('isAuthenticated', isAuthenticated, userType);
    if (!isAuthenticated) {
        // router.push(appUrls.HOME);
        return <Homepage />;
    }
    if (isAuthenticated && userType !== 'CRM_USER') {
        // router.push(appUrls.HOME);
        return <UserHome />;
    }
}
