'use client';
import MasterSidebar from '@/components/settings/MasterSidebar';
import StaffModule from '@/components/settings/staff/StaffModule';
import { appUrls } from '@/config/navigationConfig';
import { ATabs } from 'ant-ui';
import { Col, Row } from 'antd';
import { TabsProps } from 'antd/lib';
import { useRouter } from 'next/navigation';
export default function SettingHome() {
    const navigate = useRouter();

    const settingsTabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Masters',
            children: (
                <Row gutter={10}>
                    <Col span={4}>
                        <MasterSidebar />,
                    </Col>
                    {/* <Col>
                        <div>Masters for the system</div>
                    </Col> */}
                </Row>
            ),
        },
        {
            key: '2',
            label: 'Users',
        },
    ];
    return (
        <>
            <div>
                {/* <ATabs
                    style={{ marginTop: -20 }}
                    defaultActiveKey="1"
                    onTabClick={(e) => {
                        if (e === '2') navigate.push(appUrls.SETTING.STAFF);
                    }}
                    items={settingsTabItems}
                /> */}
            </div>
        </>
    );
}
