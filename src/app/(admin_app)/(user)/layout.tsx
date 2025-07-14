'use client';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import HostelChainNavigation from '@/components/layouts/CRMLayout';
import { UnAuthLayout } from '@/components/layouts/UnAuthLayout';
import { appUrls } from '@/config/navigationConfig';
import { selectIsSidebarOpen, sidebarToggled } from '@/redux/slices/appConfigSlice';
import { selectInitialAuthLoading, selectIsAuthenticated, selectUserProfile, selectUserType } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';
import { Spin } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function UserLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const authLoading = useSelector(selectInitialAuthLoading);
    const userType = useSelector(selectUserType);
    const userProfile = useSelector(selectUserProfile);
    console.log({userProfile})
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const dispatch = useDispatch<AppDispatch>();
    const toggleSidebar = () => dispatch(sidebarToggled());

    // if (authLoading) {
    //     return (
    //         <div style={{ height: '100vh', width: '100vw' }} className="flex justify-center items-center">
    //             <div className="text-center">
    //                 <Spin size="default">
    //                     <div className="content" />
    //                 </Spin>
    //             </div>
    //         </div>
    //     );
    // }
    const pathname = usePathname();

    const nestedLayoutRoutes = ['/documents'];

    const isUsingDocumentLayout = useMemo(() => {
        return nestedLayoutRoutes?.some((name) => pathname?.includes(name));
    }, [pathname]);

    if (!isAuthenticated) {
        // router.push(appUrls.HOME);
        return <UnAuthLayout>{children}</UnAuthLayout>;
    }
    if (isAuthenticated && userType !== 'CRM_USER') {
        // router.push(appUrls.HOME);
        return <AuthLayout>{children}</AuthLayout>;
    }
    
    if( isAuthenticated && userType === 'CRM_USER' && !isUsingDocumentLayout) {
        return <HostelChainNavigation >{children}</HostelChainNavigation>;
    }
}
