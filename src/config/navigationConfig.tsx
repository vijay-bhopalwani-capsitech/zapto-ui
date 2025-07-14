import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { MdContactSupport, MdHome } from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';
import { MailOutlined, UserOutlined, AppstoreOutlined, ScheduleOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUserStaffRoles } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import { TbReportAnalytics } from 'react-icons/tb';
import { BsBuildingGear } from 'react-icons/bs';

const userRoles = selectUserStaffRoles(store.getState());

export const appUrls = {
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    HOME: '/home',
    COMMUNITY: '/community',
    EXPLORE: '/explore',
    ABOUT: '/about',
    CONTACT: '/contact',
    PROPERTIES: '/properties',
    BLOGS: '/blogs',
    REVIEWS: '/reviews',
    BOOKINGS: '/bookings',
    CREDITS: '/credits',
    FAQ: '/faq',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    NOT_FOUND: '/not-found',
    PROFILE: '/profile',
    MY_BOOKINGS: '/my-bookings',
    COMPANIES: '/companies',
    FOR_BUSINESS: '/business/new',
    BUSINESS_PROFILE: '/business-profile',
    BUSINESS_PROFILE_PREVIEW: '/business-profile/preview',
    SETTING: {
        INDEX: '/settings',
        PROFILE: '/settings/profile',
        NOTIFICATIONS: '/settings   /notifications',
    },
    REPORT: '/report',

    DOCUMENTS: '/documents',
};

export const sidebarUrls = [
    // {
    //     key: 'dashboard',
    //     link: appUrls.HOME,
    //     label: 'Dashboard',
    //     activeUrls: [appUrls.HOME],
    //     Icon: <HomeOutlined />,
    //     partialMatch: false,
    //     type: 'item',
    // },
    // {
    //     key: 'home',
    //     link: appUrls.HOME,
    //     label: 'Home',
    //     activeUrls: [appUrls.HOME],
    //     // Icon: <MailOutlined />,
    //     partialMatch: true,
    //     type: 'item',
    // },
    // {
    //     key: 'community',
    //     link: appUrls.COMMUNITY,
    //     label: 'Community',
    //     activeUrls: [appUrls.COMMUNITY],
    //     // Icon: <MailOutlined />,
    //     partialMatch: true,
    //     type: 'item',
    // },
    {
        key: 'explore',
        link: appUrls.PROPERTIES,
        label: 'Explore',
        activeUrls: [appUrls.PROPERTIES],
        // Icon: <MailOutlined />,
        partialMatch: true,
        type: 'item',
    },
    {
        key: 'community',
        link: appUrls.COMMUNITY,
        label: 'Community',
        activeUrls: [appUrls.COMMUNITY],
        // Icon: <MailOutlined />,
        partialMatch: true,
        type: 'item',
    },
    // {
    //     key: 'properties',
    //     link: appUrls.PROPERTIES,
    //     label: 'Properties',
    //     activeUrls: [appUrls.PROPERTIES],
    //     // Icon: <MailOutlined />,
    //     partialMatch: true,
    //     type: 'item',
    // },
    {
        key: 'blogs',
        link: appUrls.BLOGS,
        label: 'Blogs',
        activeUrls: [appUrls.BLOGS],
        // Icon: <MailOutlined />,
        partialMatch: true,
        type: 'item',
    },
    {
        key: 'reviews',
        link: appUrls.REVIEWS,
        label: 'Reviews',
        activeUrls: [appUrls.REVIEWS],
        // Icon: <MailOutlined />,
        partialMatch: true,
        type: 'item',
    },

    // {
    //     key: 'Settings',
    //     link: appUrls.SETTING.INDEX,
    //     label: 'Settings',
    //     activeUrls: [appUrls.SETTING.INDEX, appUrls.SETTING.COURSE, appUrls.SETTING.SCHEMA_LIST],
    //     Icon: <SettingOutlined />,
    //     partialMatch: false,
    //     type: 'item',
    // },
];

export const documentsNavURLs = [
    {
        key: 'dashboard',
        link: appUrls.DOCUMENTS,
        label: 'Dashboard',
        activeUrls: [appUrls.DOCUMENTS],
        // Icon: <MailOutlined />,
        partialMatch: true,
        type: 'item',
    },
];

export const businessNavURls = [
    {
        key: 'community',
        link: appUrls.COMMUNITY,
        label: 'Community',
        activeUrls: [appUrls.COMMUNITY],
        // Icon: <MailOutlined />,
        partialMatch: true,
        type: 'item',
    },
];

export const crmNavUrls = [
    {
        key: 'dashboard',
        link: appUrls.HOME,
        label: 'Dashboard',
        activeUrls: [appUrls.HOME],
        Icon: <HomeOutlined />,
        partialMatch: false,
        type: 'item',
    },
    {
        key: 'companies',
        link: appUrls.COMPANIES,
        label: 'Companies',
        activeUrls: [appUrls.COMPANIES],
        Icon: <BsBuildingGear />,
        partialMatch: true,
        type: 'item',
    },
    {
        key: 'reports',
        link: appUrls.REPORT,
        label: 'Reports',
        activeUrls: [appUrls.REPORT],
        Icon: <TbReportAnalytics />,
        partialMatch: true,
        type: 'item',
    },
];

const formatSidebarItem = ({ item, router }: any) => {
    return {
        ...item,
        key: item.key,
        //@ts-ignore
        icon: typeof item.Icon === 'string' ? <Icon item={item} /> : item.Icon,
        label: item.label,
        onClick: () => {
            router.push(item.link);
        },
    };
};

export const useGetSidebarItems = ({ urls = sidebarUrls }: { urls?: any[] }) => {
    const router = useRouter();

    const items: any[] = useMemo(() => {
        // @ts-ignore
        const menuItems = [];
        urls.forEach((obj) => {
            if (obj.children) {
                const menuItem = {
                    ...obj,
                    //@ts-ignore
                    icon: typeof obj.Icon === 'string' ? <Icon item={obj} /> : obj.Icon,
                    children: [],
                };
                // @ts-ignore
                obj.children.forEach((item) => {
                    // if (item.models) {
                    //     // @ts-ignore
                    //     if (item.models.some((modelName) => ability.can('read', modelName) || ability.can('read_own_team', modelName) || ability.can('read_own', modelName))) {
                    //         // @ts-ignore
                    //         menuItem.children.push(formatSidebarItem({ item, router }));
                    //     }
                    // } else {
                    // @ts-ignore
                    menuItem.children.push(formatSidebarItem({ item, router }));
                    // }
                });

                if (menuItem.children.length > 0) {
                    menuItems.push(menuItem);
                }
            } else {
                menuItems.push(formatSidebarItem({ item: obj, router }));
            }
        });
        // @ts-ignore
        return menuItems;
    }, [router]);

    return items;
};
