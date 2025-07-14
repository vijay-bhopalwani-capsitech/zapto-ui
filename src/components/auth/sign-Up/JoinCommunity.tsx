import { SIGN_UP_BUSINESS, SIGN_UP_INDIVIDUAL } from '@/assets/images/imgAssets';
import { AButton, ACard } from 'ant-ui';
import { Space, Typography } from 'antd';
import React from 'react';

const JoinCommunity = ({ userType, handleNextStep }: { userType: String; handleNextStep: () => void }) => {
    return (
        <>
            <div className="flex justify-center items-center">
                <Typography.Title level={4} className="col-span-1 " style={{ color: '#265ABF' }}>
                    Join the community
                </Typography.Title>
            </div>
            <div className="flex justify-center items-center gap-x-5">
                <ACard style={{ height: '245px', width: '255px', border: '2px solid #265ABF' }} className="cursor-pointer">
                    <div className="flex flex-col justify-center items-center gap-y-5">
                        <img src={SIGN_UP_INDIVIDUAL} height={'147px'} width={'147px'} />
                        <Typography.Title level={5} style={{ color: '#265ABF' }}>
                            Personal Account
                        </Typography.Title>
                    </div>
                </ACard>
                <ACard style={{ height: '245px', width: '255px' }} className="cursor-pointer">
                    <div className="flex flex-col justify-center items-center gap-y-5">
                        <img src={SIGN_UP_BUSINESS} height={'147px'} width={'147px'} />
                        <Typography.Title level={5}>Business Account</Typography.Title>
                    </div>
                </ACard>
            </div>
            <AButton className="flex items-center mt-5" type="primary" onClick={handleNextStep}>
                Next
            </AButton>
        </>
    );
};

export default JoinCommunity;
