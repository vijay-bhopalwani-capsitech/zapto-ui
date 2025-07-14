'use client';
import React, { useState } from 'react';
import { Col, Row, TabsProps } from 'antd';
import { useTheme } from 'styled-components';
import MasterSidebar from './MasterSidebar';
import { ATabs } from 'ant-ui';
import StaffModule from './staff/StaffModule';
import { appUrls } from '@/config/navigationConfig';
import { useRouter } from 'next/navigation';

function MastersContainer({ children }: { children: JSX.Element }) {
    const navigate = useRouter();

    const theme = useTheme();
    console.log('-> theme', theme);  
    const [activeKey, setActiveKey] = useState('1');
    const settingsTabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Masters',
        },
        {
            key: '2',
            label: 'Users',
        },
    ];
    return (
        <Row>
            <Col xs={24}>
                <ATabs
                    style={{ marginTop: -20 }}
                    defaultActiveKey="1"
                    onTabClick={(e) => {
                        if (e === '2') navigate.push(appUrls.SETTING.STAFF);
                    }}
                    items={settingsTabItems}
                />
            </Col>
            {activeKey === '1' && (
                <Col>
                    <Row
                        style={{
                            height: '100%',
                        }}
                    >
                        <Col
                            span={3}
                            style={{
                                height: '100%',
                            }}
                        >
                            <MasterSidebar />
                        </Col>
                        <Col
                            span={21}
                            style={{
                                padding: theme.paddingSM,
                            }}
                        >
                            {children}
                        </Col>
                    </Row>
                </Col>
            )}
        </Row>
    );
}

export default MastersContainer;
