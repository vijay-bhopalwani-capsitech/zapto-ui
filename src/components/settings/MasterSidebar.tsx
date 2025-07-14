import { masterUrls, useGetSidebarItems } from '@/config/navigationConfig';
import { Menu, MenuProps } from 'antd';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { hexToRgba } from 'ui-helpers';

const MasterSidebar = () => {
    const theme = useTheme();
    const pathname = usePathname();

    const StyleMenu: typeof Menu = styled(Menu)`
        height: 100%;
        margin-top: 5px;
        padding-top: 15px;
        background: none;
    `;
    const items = useGetSidebarItems({ urls: masterUrls });
    const [openKeys, setOpenKeys] = useState(['basic']);
    const rootSubmenuKeys = ['basic', 'marketing', 'study'];

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const activeLinks = useMemo(() => {
        let urls: any[] = [];
        items.map((item) => {
            if (item.type === 'group') {
                // @ts-ignore
                urls.push(...item.children);
            } else {
                urls.push(item);
            }
        });

        const activeKeys: string[] = [];
        urls.forEach((item) => {
            item?.children?.forEach((subItem: any) => {
                if ((subItem?.partialMatch && subItem?.activeUrls?.some((url: string) => pathname?.includes(url))) || subItem?.activeUrls?.includes(pathname)) {
                    activeKeys?.push(subItem?.key);
                    setOpenKeys([item?.key]);
                }
            });
        });
        return activeKeys;
    }, [pathname, items]);

    return <StyleMenu mode="inline" theme={'light'} openKeys={openKeys} onOpenChange={onOpenChange} selectedKeys={activeLinks} items={items} />;
};

export default MasterSidebar;
