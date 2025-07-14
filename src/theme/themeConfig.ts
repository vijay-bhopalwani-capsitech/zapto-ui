// theme/themeConfig.ts
import { theme, type ThemeConfig } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '@/redux/slices/appConfigSlice';
const { defaultAlgorithm, darkAlgorithm } = theme;

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimaryText: 'rgba(0, 0, 0, 0.85)',
        colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
        colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
        colorPrimary: '#1677FF',
        colorBgContainer: '#F7F8F9',
        colorBgLayout: '#F0F2F5',
        colorBorderBg: '#E8E9EA',
        fontFamily: "'Outfit Variable',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    },
    components: {
        Typography: {
            colorText: 'rgba(0, 0, 0, 0.85)',
            colorTextDescription: 'rgba(0, 0, 0, 0.65)',
            colorTextDisabled: 'rgba(0, 0, 0, 0.45)',
        },
        Card: {
            colorBgContainer: '#FFFFFF',
            headerBg: '#FAFAFA',
            boxShadowTertiary: '0px 1px 2px 0px #00000008,0px 1px 6px -1px #000000050px,2px 4px 0px #00000005',
        },
        Table: {
            colorBgContainer: '#fff',
        },
        Input: {
            colorBgContainer: '#fff',
        },
        InputNumber: {
            colorBgContainer: '#fff',
        },
        Calendar: {
            colorBgContainer: '#FFFFFF',
        },
        Radio: {
            colorBgContainer: '#fff',
        },
        Select: {
            colorBgContainer: '#fff',
        },
    },
};

export const useGenerateAntTheme = () => {
    const currentConfigTheme = useSelector(selectCurrentTheme);
    const theme = useMemo(() => {
        switch (currentConfigTheme) {
            case 'red': {
                return {
                    token: {
                        fontSize: 15,
                        // colorPrimary: '#d62828',
                        colorPrimary: '#b11818',
                        colorError: '#b82525',
                        fontFamily: `Outfit Variable`,
                        colorSuccess: '#52c41a',
                        colorWarning: '#faad14',
                        colorInfo: '#b11818',
                        colorLink: '#b11818',
                        colorTextBase: '#2f0f0f',
                        colorBgBase: '#fff',
                        colorBgLayout: '#fff',
                    },
                };
            }
            case 'blue': {
                return {
                    algorithm: defaultAlgorithm,
                    token: {
                        // fontSize: 15,
                        colorPrimary: '#D29022',
                        colorSuccess: '#52c41a',
                        colorWarning: '#ffa266',
                        colorError: '#cc363e',
                        fontFamily: `Outfit Variable`,
                        colorTextBase: '#000',
                        colorBgBase: '#fff',
                        colorBgLayout: '#fff',
                        colorBorder: '#F0F0F0',
                    },
                };
            }
            case 'dark': {
                return {
                    algorithm: darkAlgorithm,
                    token: {
                        // fontSize: 15,
                        colorPrimary: '#D29022',
                        colorSuccess: '#52c41a',
                        colorWarning: '#ffa266',
                        colorError: '#cc363e',
                        fontFamily: `Outfit Variable`,
                        colorTextBase: '#E9EEF9',
                        colorBorder: '#50505D',
                        colorBgBase: '#26262C',
                        colorBgLayout: '#131316',
                    },
                };
            }
            default: {
                return {
                    token: {
                        fontSize: 15,
                        colorPrimary: '#0076B4',
                        fontFamily: `Outfit Variable`,
                        colorBgBase: '#fff',
                        colorTextBase: '#3C494F',
                    },
                };
            }
        }
    }, [currentConfigTheme]);
    return theme;
};

const defaultTheme = {
    blue: '#1677ff',
    purple: '#722ED1',
    cyan: '#13C2C2',
    green: '#52C41A',
    magenta: '#EB2F96',
    pink: '#eb2f96',
    red: '#F5222D',
    orange: '#FA8C16',
    yellow: '#FADB14',
    volcano: '#FA541C',
    geekblue: '#2F54EB',
    gold: '#FAAD14',
    lime: '#A0D911',
    colorPrimary: '#d62828',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorLink: '#1677ff',
    colorTextBase: '#000',
    colorBgBase: '#fff',
    fontFamily: 'Nunito Sans Variable',
    fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    fontSize: 12,
    lineWidth: 1,
    lineType: 'solid',
    motionUnit: 0.1,
    motionBase: 0,
    motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    borderRadius: 6,
    sizeUnit: 4,
    sizeStep: 4,
    sizePopupArrow: 16,
    controlHeight: 32,
    zIndexBase: 0,
    zIndexPopupBase: 1000,
    opacityImage: 1,
    wireframe: false,
    motion: true,
    'blue-1': '#e6f4ff',
    blue1: '#e6f4ff',
    'blue-2': '#bae0ff',
    blue2: '#bae0ff',
    'blue-3': '#91caff',
    blue3: '#91caff',
    'blue-4': '#69b1ff',
    blue4: '#69b1ff',
    'blue-5': '#4096ff',
    blue5: '#4096ff',
    'blue-6': '#1677ff',
    blue6: '#1677ff',
    'blue-7': '#0958d9',
    blue7: '#0958d9',
    'blue-8': '#003eb3',
    blue8: '#003eb3',
    'blue-9': '#002c8c',
    blue9: '#002c8c',
    'blue-10': '#001d66',
    blue10: '#001d66',
    'purple-1': '#f9f0ff',
    purple1: '#f9f0ff',
    'purple-2': '#efdbff',
    purple2: '#efdbff',
    'purple-3': '#d3adf7',
    purple3: '#d3adf7',
    'purple-4': '#b37feb',
    purple4: '#b37feb',
    'purple-5': '#9254de',
    purple5: '#9254de',
    'purple-6': '#722ed1',
    purple6: '#722ed1',
    'purple-7': '#531dab',
    purple7: '#531dab',
    'purple-8': '#391085',
    purple8: '#391085',
    'purple-9': '#22075e',
    purple9: '#22075e',
    'purple-10': '#120338',
    purple10: '#120338',
    'cyan-1': '#e6fffb',
    cyan1: '#e6fffb',
    'cyan-2': '#b5f5ec',
    cyan2: '#b5f5ec',
    'cyan-3': '#87e8de',
    cyan3: '#87e8de',
    'cyan-4': '#5cdbd3',
    cyan4: '#5cdbd3',
    'cyan-5': '#36cfc9',
    cyan5: '#36cfc9',
    'cyan-6': '#13c2c2',
    cyan6: '#13c2c2',
    'cyan-7': '#08979c',
    cyan7: '#08979c',
    'cyan-8': '#006d75',
    cyan8: '#006d75',
    'cyan-9': '#00474f',
    cyan9: '#00474f',
    'cyan-10': '#002329',
    cyan10: '#002329',
    'green-1': '#f6ffed',
    green1: '#f6ffed',
    'green-2': '#d9f7be',
    green2: '#d9f7be',
    'green-3': '#b7eb8f',
    green3: '#b7eb8f',
    'green-4': '#95de64',
    green4: '#95de64',
    'green-5': '#73d13d',
    green5: '#73d13d',
    'green-6': '#52c41a',
    green6: '#52c41a',
    'green-7': '#389e0d',
    green7: '#389e0d',
    'green-8': '#237804',
    green8: '#237804',
    'green-9': '#135200',
    green9: '#135200',
    'green-10': '#092b00',
    green10: '#092b00',
    'magenta-1': '#fff0f6',
    magenta1: '#fff0f6',
    'magenta-2': '#ffd6e7',
    magenta2: '#ffd6e7',
    'magenta-3': '#ffadd2',
    magenta3: '#ffadd2',
    'magenta-4': '#ff85c0',
    magenta4: '#ff85c0',
    'magenta-5': '#f759ab',
    magenta5: '#f759ab',
    'magenta-6': '#eb2f96',
    magenta6: '#eb2f96',
    'magenta-7': '#c41d7f',
    magenta7: '#c41d7f',
    'magenta-8': '#9e1068',
    magenta8: '#9e1068',
    'magenta-9': '#780650',
    magenta9: '#780650',
    'magenta-10': '#520339',
    magenta10: '#520339',
    'pink-1': '#fff0f6',
    pink1: '#fff0f6',
    'pink-2': '#ffd6e7',
    pink2: '#ffd6e7',
    'pink-3': '#ffadd2',
    pink3: '#ffadd2',
    'pink-4': '#ff85c0',
    pink4: '#ff85c0',
    'pink-5': '#f759ab',
    pink5: '#f759ab',
    'pink-6': '#eb2f96',
    pink6: '#eb2f96',
    'pink-7': '#c41d7f',
    pink7: '#c41d7f',
    'pink-8': '#9e1068',
    pink8: '#9e1068',
    'pink-9': '#780650',
    pink9: '#780650',
    'pink-10': '#520339',
    pink10: '#520339',
    'red-1': '#fff1f0',
    red1: '#fff1f0',
    'red-2': '#ffccc7',
    red2: '#ffccc7',
    'red-3': '#ffa39e',
    red3: '#ffa39e',
    'red-4': '#ff7875',
    red4: '#ff7875',
    'red-5': '#ff4d4f',
    red5: '#ff4d4f',
    'red-6': '#f5222d',
    red6: '#f5222d',
    'red-7': '#cf1322',
    red7: '#cf1322',
    'red-8': '#a8071a',
    red8: '#a8071a',
    'red-9': '#820014',
    red9: '#820014',
    'red-10': '#5c0011',
    red10: '#5c0011',
    'orange-1': '#fff7e6',
    orange1: '#fff7e6',
    'orange-2': '#ffe7ba',
    orange2: '#ffe7ba',
    'orange-3': '#ffd591',
    orange3: '#ffd591',
    'orange-4': '#ffc069',
    orange4: '#ffc069',
    'orange-5': '#ffa940',
    orange5: '#ffa940',
    'orange-6': '#fa8c16',
    orange6: '#fa8c16',
    'orange-7': '#d46b08',
    orange7: '#d46b08',
    'orange-8': '#ad4e00',
    orange8: '#ad4e00',
    'orange-9': '#873800',
    orange9: '#873800',
    'orange-10': '#612500',
    orange10: '#612500',
    'yellow-1': '#feffe6',
    yellow1: '#feffe6',
    'yellow-2': '#ffffb8',
    yellow2: '#ffffb8',
    'yellow-3': '#fffb8f',
    yellow3: '#fffb8f',
    'yellow-4': '#fff566',
    yellow4: '#fff566',
    'yellow-5': '#ffec3d',
    yellow5: '#ffec3d',
    'yellow-6': '#fadb14',
    yellow6: '#fadb14',
    'yellow-7': '#d4b106',
    yellow7: '#d4b106',
    'yellow-8': '#ad8b00',
    yellow8: '#ad8b00',
    'yellow-9': '#876800',
    yellow9: '#876800',
    'yellow-10': '#614700',
    yellow10: '#614700',
    'volcano-1': '#fff2e8',
    volcano1: '#fff2e8',
    'volcano-2': '#ffd8bf',
    volcano2: '#ffd8bf',
    'volcano-3': '#ffbb96',
    volcano3: '#ffbb96',
    'volcano-4': '#ff9c6e',
    volcano4: '#ff9c6e',
    'volcano-5': '#ff7a45',
    volcano5: '#ff7a45',
    'volcano-6': '#fa541c',
    volcano6: '#fa541c',
    'volcano-7': '#d4380d',
    volcano7: '#d4380d',
    'volcano-8': '#ad2102',
    volcano8: '#ad2102',
    'volcano-9': '#871400',
    volcano9: '#871400',
    'volcano-10': '#610b00',
    volcano10: '#610b00',
    'geekblue-1': '#f0f5ff',
    geekblue1: '#f0f5ff',
    'geekblue-2': '#d6e4ff',
    geekblue2: '#d6e4ff',
    'geekblue-3': '#adc6ff',
    geekblue3: '#adc6ff',
    'geekblue-4': '#85a5ff',
    geekblue4: '#85a5ff',
    'geekblue-5': '#597ef7',
    geekblue5: '#597ef7',
    'geekblue-6': '#2f54eb',
    geekblue6: '#2f54eb',
    'geekblue-7': '#1d39c4',
    geekblue7: '#1d39c4',
    'geekblue-8': '#10239e',
    geekblue8: '#10239e',
    'geekblue-9': '#061178',
    geekblue9: '#061178',
    'geekblue-10': '#030852',
    geekblue10: '#030852',
    'gold-1': '#fffbe6',
    gold1: '#fffbe6',
    'gold-2': '#fff1b8',
    gold2: '#fff1b8',
    'gold-3': '#ffe58f',
    gold3: '#ffe58f',
    'gold-4': '#ffd666',
    gold4: '#ffd666',
    'gold-5': '#ffc53d',
    gold5: '#ffc53d',
    'gold-6': '#faad14',
    gold6: '#faad14',
    'gold-7': '#d48806',
    gold7: '#d48806',
    'gold-8': '#ad6800',
    gold8: '#ad6800',
    'gold-9': '#874d00',
    gold9: '#874d00',
    'gold-10': '#613400',
    gold10: '#613400',
    'lime-1': '#fcffe6',
    lime1: '#fcffe6',
    'lime-2': '#f4ffb8',
    lime2: '#f4ffb8',
    'lime-3': '#eaff8f',
    lime3: '#eaff8f',
    'lime-4': '#d3f261',
    lime4: '#d3f261',
    'lime-5': '#bae637',
    lime5: '#bae637',
    'lime-6': '#a0d911',
    lime6: '#a0d911',
    'lime-7': '#7cb305',
    lime7: '#7cb305',
    'lime-8': '#5b8c00',
    lime8: '#5b8c00',
    'lime-9': '#3f6600',
    lime9: '#3f6600',
    'lime-10': '#254000',
    lime10: '#254000',
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
    colorFill: 'rgba(0, 0, 0, 0.15)',
    colorFillSecondary: 'rgba(0, 0, 0, 0.06)',
    colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
    colorFillQuaternary: 'rgba(0, 0, 0, 0.02)',
    colorBgLayout: '#ffffff',
    colorBgContainer: '#E2F4FD',
    // "colorBgContainer": "#ffffff",
    colorBgElevated: '#E2F4FD',
    // "colorBgElevated": "#ffffff",
    colorBgSpotlight: 'rgba(0, 0, 0, 0.85)',
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    colorPrimaryBg: '#fff2f0',
    colorPrimaryBgHover: '#ffd9d4',
    colorPrimaryBorder: '#fcb1a9',
    colorPrimaryBorderHover: '#f0827a',
    colorPrimaryHover: '#e3544f',
    colorPrimaryActive: '#b0191e',
    colorPrimaryTextHover: '#e3544f',
    colorPrimaryText: '#d62828',
    colorPrimaryTextActive: '#b0191e',
    colorSuccessBg: '#f6ffed',
    colorSuccessBgHover: '#d9f7be',
    colorSuccessBorder: '#b7eb8f',
    colorSuccessBorderHover: '#95de64',
    colorSuccessHover: '#95de64',
    colorSuccessActive: '#389e0d',
    colorSuccessTextHover: '#73d13d',
    colorSuccessText: '#52c41a',
    colorSuccessTextActive: '#389e0d',
    colorErrorBg: '#fff2f0',
    colorErrorBgHover: '#fff1f0',
    colorErrorBorder: '#ffccc7',
    colorErrorBorderHover: '#ffa39e',
    colorErrorHover: '#ff7875',
    colorErrorActive: '#d9363e',
    colorErrorTextHover: '#ff7875',
    colorErrorText: '#ff4d4f',
    colorErrorTextActive: '#d9363e',
    colorWarningBg: '#fffbe6',
    colorWarningBgHover: '#fff1b8',
    colorWarningBorder: '#ffe58f',
    colorWarningBorderHover: '#ffd666',
    colorWarningHover: '#ffd666',
    colorWarningActive: '#d48806',
    colorWarningTextHover: '#ffc53d',
    colorWarningText: '#faad14',
    colorWarningTextActive: '#d48806',
    colorInfoBg: '#e6f4ff',
    colorInfoBgHover: '#bae0ff',
    colorInfoBorder: '#91caff',
    colorInfoBorderHover: '#69b1ff',
    colorInfoHover: '#69b1ff',
    colorInfoActive: '#0958d9',
    colorInfoTextHover: '#4096ff',
    colorInfoText: '#1677ff',
    colorInfoTextActive: '#0958d9',
    colorLinkHover: '#69b1ff',
    colorLinkActive: '#0958d9',
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
    colorWhite: '#fff',
    fontSizeSM: 10,
    fontSizeLG: 14,
    fontSizeXL: 16,
    fontSizeHeading1: 32,
    fontSizeHeading2: 26,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    lineHeight: 1.6666666666666667,
    lineHeightLG: 1.5714285714285714,
    lineHeightSM: 1.8,
    lineHeightHeading1: 1.25,
    lineHeightHeading2: 1.3076923076923077,
    lineHeightHeading3: 1.4,
    lineHeightHeading4: 1.5,
    lineHeightHeading5: 1.5714285714285714,
    sizeXXL: 48,
    sizeXL: 32,
    sizeLG: 24,
    sizeMD: 20,
    sizeMS: 16,
    size: 16,
    sizeSM: 12,
    sizeXS: 8,
    sizeXXS: 4,
    controlHeightSM: 24,
    controlHeightXS: 16,
    controlHeightLG: 40,
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
    lineWidthBold: 2,
    borderRadiusXS: 2,
    borderRadiusSM: 4,
    borderRadiusLG: 8,
    borderRadiusOuter: 4,
    colorFillContent: 'rgba(0, 0, 0, 0.06)',
    colorFillContentHover: 'rgba(0, 0, 0, 0.15)',
    colorFillAlter: 'rgba(0, 0, 0, 0.02)',
    colorBgContainerDisabled: 'rgba(0, 0, 0, 0.04)',
    colorBorderBg: '#ffffff',
    colorSplit: 'rgba(5, 5, 5, 0.06)',
    colorTextPlaceholder: 'rgba(0, 0, 0, 0.25)',
    colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
    colorTextHeading: 'rgba(0, 0, 0, 0.88)',
    colorTextLabel: 'rgba(0, 0, 0, 0.65)',
    colorTextDescription: 'rgba(0, 0, 0, 0.45)',
    colorTextLightSolid: '#fff',
    colorHighlight: '#ff4d4f',
    colorBgTextHover: 'rgba(0, 0, 0, 0.06)',
    colorBgTextActive: 'rgba(0, 0, 0, 0.15)',
    colorIcon: 'rgba(0, 0, 0, 0.45)',
    colorIconHover: 'rgba(0, 0, 0, 0.88)',
    colorErrorOutline: 'rgba(255, 38, 5, 0.06)',
    colorWarningOutline: 'rgba(255, 215, 5, 0.1)',
    fontSizeIcon: 10,
    lineWidthFocus: 4,
    controlOutlineWidth: 2,
    controlInteractiveSize: 16,
    controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
    controlItemBgActive: '#fff2f0',
    controlItemBgActiveHover: '#ffd9d4',
    controlItemBgActiveDisabled: 'rgba(0, 0, 0, 0.15)',
    controlTmpOutline: 'rgba(0, 0, 0, 0.02)',
    controlOutline: 'rgba(255, 38, 5, 0.06)',
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: 'none',
    linkHoverDecoration: 'none',
    linkFocusDecoration: 'none',
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: 4,
    paddingXS: 8,
    paddingSM: 12,
    padding: 16,
    paddingMD: 20,
    paddingLG: 24,
    paddingXL: 32,
    paddingContentHorizontalLG: 24,
    paddingContentVerticalLG: 16,
    paddingContentHorizontal: 16,
    paddingContentVertical: 12,
    paddingContentHorizontalSM: 16,
    paddingContentVerticalSM: 8,
    marginXXS: 4,
    marginXS: 8,
    marginSM: 12,
    margin: 16,
    marginMD: 20,
    marginLG: 24,
    marginXL: 32,
    marginXXL: 48,
    boxShadow: '\n      0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)\n    ',
    boxShadowSecondary: '\n      0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)\n    ',
    boxShadowTertiary: '\n      0 1px 2px 0 rgba(0, 0, 0, 0.03),\n      0 1px 6px -1px rgba(0, 0, 0, 0.02),\n      0 2px 4px 0 rgba(0, 0, 0, 0.02)\n    ',
    screenXS: 480,
    screenXSMin: 480,
    screenXSMax: 575,
    screenSM: 576,
    screenSMMin: 576,
    screenSMMax: 767,
    screenMD: 768,
    screenMDMin: 768,
    screenMDMax: 991,
    screenLG: 992,
    screenLGMin: 992,
    screenLGMax: 1199,
    screenXL: 1200,
    screenXLMin: 1200,
    screenXLMax: 1599,
    screenXXL: 1600,
    screenXXLMin: 1600,
    boxShadowPopoverArrow: '2px 2px 5px rgba(0, 0, 0, 0.05)',
    boxShadowCard: '\n      0 1px 2px -2px rgba(0, 0, 0, 0.16),\n      0 3px 6px 0 rgba(0, 0, 0, 0.12),\n      0 5px 12px 4px rgba(0, 0, 0, 0.09)\n    ',
    boxShadowDrawerRight: '\n      -6px 0 16px 0 rgba(0, 0, 0, 0.08),\n      -3px 0 6px -4px rgba(0, 0, 0, 0.12),\n      -9px 0 28px 8px rgba(0, 0, 0, 0.05)\n    ',
    boxShadowDrawerLeft: '\n      6px 0 16px 0 rgba(0, 0, 0, 0.08),\n      3px 0 6px -4px rgba(0, 0, 0, 0.12),\n      9px 0 28px 8px rgba(0, 0, 0, 0.05)\n    ',
    boxShadowDrawerUp: '\n      0 6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 9px 28px 8px rgba(0, 0, 0, 0.05)\n    ',
    boxShadowDrawerDown: '\n      0 -6px 16px 0 rgba(0, 0, 0, 0.08),\n      0 -3px 6px -4px rgba(0, 0, 0, 0.12),\n      0 -9px 28px 8px rgba(0, 0, 0, 0.05)\n    ',
    boxShadowTabsOverflowLeft: 'inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)',
    boxShadowTabsOverflowRight: 'inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)',
    boxShadowTabsOverflowTop: 'inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)',
    boxShadowTabsOverflowBottom: 'inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)',
    _tokenKey: '7jrx05',
    _hashId: 'css-dev-only-do-not-override-3pok47',
};

export interface IAntTheme {
    blue: string;
    purple: string;
    cyan: string;
    green: string;
    magenta: string;
    pink: string;
    red: string;
    orange: string;
    yellow: string;
    volcano: string;
    geekblue: string;
    gold: string;
    lime: string;
    colorPrimary: string;
    colorSuccess: string;
    colorWarning: string;
    colorError: string;
    colorInfo: string;
    colorLink: string;
    colorTextBase: string;
    colorBgBase: string;
    fontFamily: string;
    fontFamilyCode: string;
    fontSize: number;
    lineWidth: number;
    lineType: string;
    motionUnit: number;
    motionBase: number;
    motionEaseOutCirc: string;
    motionEaseInOutCirc: string;
    motionEaseOut: string;
    motionEaseInOut: string;
    motionEaseOutBack: string;
    motionEaseInBack: string;
    motionEaseInQuint: string;
    motionEaseOutQuint: string;
    borderRadius: number;
    sizeUnit: number;
    sizeStep: number;
    sizePopupArrow: number;
    controlHeight: number;
    zIndexBase: number;
    zIndexPopupBase: number;
    opacityImage: number;
    wireframe: boolean;
    motion: boolean;
    'blue-1': string;
    blue1: string;
    'blue-2': string;
    blue2: string;
    'blue-3': string;
    blue3: string;
    'blue-4': string;
    blue4: string;
    'blue-5': string;
    blue5: string;
    'blue-6': string;
    blue6: string;
    'blue-7': string;
    blue7: string;
    'blue-8': string;
    blue8: string;
    'blue-9': string;
    blue9: string;
    'blue-10': string;
    blue10: string;
    'purple-1': string;
    purple1: string;
    'purple-2': string;
    purple2: string;
    'purple-3': string;
    purple3: string;
    'purple-4': string;
    purple4: string;
    'purple-5': string;
    purple5: string;
    'purple-6': string;
    purple6: string;
    'purple-7': string;
    purple7: string;
    'purple-8': string;
    purple8: string;
    'purple-9': string;
    purple9: string;
    'purple-10': string;
    purple10: string;
    'cyan-1': string;
    cyan1: string;
    'cyan-2': string;
    cyan2: string;
    'cyan-3': string;
    cyan3: string;
    'cyan-4': string;
    cyan4: string;
    'cyan-5': string;
    cyan5: string;
    'cyan-6': string;
    cyan6: string;
    'cyan-7': string;
    cyan7: string;
    'cyan-8': string;
    cyan8: string;
    'cyan-9': string;
    cyan9: string;
    'cyan-10': string;
    cyan10: string;
    'green-1': string;
    green1: string;
    'green-2': string;
    green2: string;
    'green-3': string;
    green3: string;
    'green-4': string;
    green4: string;
    'green-5': string;
    green5: string;
    'green-6': string;
    green6: string;
    'green-7': string;
    green7: string;
    'green-8': string;
    green8: string;
    'green-9': string;
    green9: string;
    'green-10': string;
    green10: string;
    'magenta-1': string;
    magenta1: string;
    'magenta-2': string;
    magenta2: string;
    'magenta-3': string;
    magenta3: string;
    'magenta-4': string;
    magenta4: string;
    'magenta-5': string;
    magenta5: string;
    'magenta-6': string;
    magenta6: string;
    'magenta-7': string;
    magenta7: string;
    'magenta-8': string;
    magenta8: string;
    'magenta-9': string;
    magenta9: string;
    'magenta-10': string;
    magenta10: string;
    'pink-1': string;
    pink1: string;
    'pink-2': string;
    pink2: string;
    'pink-3': string;
    pink3: string;
    'pink-4': string;
    pink4: string;
    'pink-5': string;
    pink5: string;
    'pink-6': string;
    pink6: string;
    'pink-7': string;
    pink7: string;
    'pink-8': string;
    pink8: string;
    'pink-9': string;
    pink9: string;
    'pink-10': string;
    pink10: string;
    'red-1': string;
    red1: string;
    'red-2': string;
    red2: string;
    'red-3': string;
    red3: string;
    'red-4': string;
    red4: string;
    'red-5': string;
    red5: string;
    'red-6': string;
    red6: string;
    'red-7': string;
    red7: string;
    'red-8': string;
    red8: string;
    'red-9': string;
    red9: string;
    'red-10': string;
    red10: string;
    'orange-1': string;
    orange1: string;
    'orange-2': string;
    orange2: string;
    'orange-3': string;
    orange3: string;
    'orange-4': string;
    orange4: string;
    'orange-5': string;
    orange5: string;
    'orange-6': string;
    orange6: string;
    'orange-7': string;
    orange7: string;
    'orange-8': string;
    orange8: string;
    'orange-9': string;
    orange9: string;
    'orange-10': string;
    orange10: string;
    'yellow-1': string;
    yellow1: string;
    'yellow-2': string;
    yellow2: string;
    'yellow-3': string;
    yellow3: string;
    'yellow-4': string;
    yellow4: string;
    'yellow-5': string;
    yellow5: string;
    'yellow-6': string;
    yellow6: string;
    'yellow-7': string;
    yellow7: string;
    'yellow-8': string;
    yellow8: string;
    'yellow-9': string;
    yellow9: string;
    'yellow-10': string;
    yellow10: string;
    'volcano-1': string;
    volcano1: string;
    'volcano-2': string;
    volcano2: string;
    'volcano-3': string;
    volcano3: string;
    'volcano-4': string;
    volcano4: string;
    'volcano-5': string;
    volcano5: string;
    'volcano-6': string;
    volcano6: string;
    'volcano-7': string;
    volcano7: string;
    'volcano-8': string;
    volcano8: string;
    'volcano-9': string;
    volcano9: string;
    'volcano-10': string;
    volcano10: string;
    'geekblue-1': string;
    geekblue1: string;
    'geekblue-2': string;
    geekblue2: string;
    'geekblue-3': string;
    geekblue3: string;
    'geekblue-4': string;
    geekblue4: string;
    'geekblue-5': string;
    geekblue5: string;
    'geekblue-6': string;
    geekblue6: string;
    'geekblue-7': string;
    geekblue7: string;
    'geekblue-8': string;
    geekblue8: string;
    'geekblue-9': string;
    geekblue9: string;
    'geekblue-10': string;
    geekblue10: string;
    'gold-1': string;
    gold1: string;
    'gold-2': string;
    gold2: string;
    'gold-3': string;
    gold3: string;
    'gold-4': string;
    gold4: string;
    'gold-5': string;
    gold5: string;
    'gold-6': string;
    gold6: string;
    'gold-7': string;
    gold7: string;
    'gold-8': string;
    gold8: string;
    'gold-9': string;
    gold9: string;
    'gold-10': string;
    gold10: string;
    'lime-1': string;
    lime1: string;
    'lime-2': string;
    lime2: string;
    'lime-3': string;
    lime3: string;
    'lime-4': string;
    lime4: string;
    'lime-5': string;
    lime5: string;
    'lime-6': string;
    lime6: string;
    'lime-7': string;
    lime7: string;
    'lime-8': string;
    lime8: string;
    'lime-9': string;
    lime9: string;
    'lime-10': string;
    lime10: string;
    colorText: string;
    colorTextSecondary: string;
    colorTextTertiary: string;
    colorTextQuaternary: string;
    colorFill: string;
    colorFillSecondary: string;
    colorFillTertiary: string;
    colorFillQuaternary: string;
    colorBgLayout: string;
    colorBgContainer: string;
    colorBgElevated: string;
    colorBgSpotlight: string;
    colorBorder: string;
    colorBorderSecondary: string;
    colorPrimaryBg: string;
    colorPrimaryBgHover: string;
    colorPrimaryBorder: string;
    colorPrimaryBorderHover: string;
    colorPrimaryHover: string;
    colorPrimaryActive: string;
    colorPrimaryTextHover: string;
    colorPrimaryText: string;
    colorPrimaryTextActive: string;
    colorSuccessBg: string;
    colorSuccessBgHover: string;
    colorSuccessBorder: string;
    colorSuccessBorderHover: string;
    colorSuccessHover: string;
    colorSuccessActive: string;
    colorSuccessTextHover: string;
    colorSuccessText: string;
    colorSuccessTextActive: string;
    colorErrorBg: string;
    colorErrorBgHover: string;
    colorErrorBorder: string;
    colorErrorBorderHover: string;
    colorErrorHover: string;
    colorErrorActive: string;
    colorErrorTextHover: string;
    colorErrorText: string;
    colorErrorTextActive: string;
    colorWarningBg: string;
    colorWarningBgHover: string;
    colorWarningBorder: string;
    colorWarningBorderHover: string;
    colorWarningHover: string;
    colorWarningActive: string;
    colorWarningTextHover: string;
    colorWarningText: string;
    colorWarningTextActive: string;
    colorInfoBg: string;
    colorInfoBgHover: string;
    colorInfoBorder: string;
    colorInfoBorderHover: string;
    colorInfoHover: string;
    colorInfoActive: string;
    colorInfoTextHover: string;
    colorInfoText: string;
    colorInfoTextActive: string;
    colorLinkHover: string;
    colorLinkActive: string;
    colorBgMask: string;
    colorWhite: string;
    fontSizeSM: number;
    fontSizeLG: number;
    fontSizeXL: number;
    fontSizeHeading1: number;
    fontSizeHeading2: number;
    fontSizeHeading3: number;
    fontSizeHeading4: number;
    fontSizeHeading5: number;
    lineHeight: number;
    lineHeightLG: number;
    lineHeightSM: number;
    lineHeightHeading1: number;
    lineHeightHeading2: number;
    lineHeightHeading3: number;
    lineHeightHeading4: number;
    lineHeightHeading5: number;
    sizeXXL: number;
    sizeXL: number;
    sizeLG: number;
    sizeMD: number;
    sizeMS: number;
    size: number;
    sizeSM: number;
    sizeXS: number;
    sizeXXS: number;
    controlHeightSM: number;
    controlHeightXS: number;
    controlHeightLG: number;
    motionDurationFast: string;
    motionDurationMid: string;
    motionDurationSlow: string;
    lineWidthBold: number;
    borderRadiusXS: number;
    borderRadiusSM: number;
    borderRadiusLG: number;
    borderRadiusOuter: number;
    colorFillContent: string;
    colorFillContentHover: string;
    colorFillAlter: string;
    colorBgContainerDisabled: string;
    colorBorderBg: string;
    colorSplit: string;
    colorTextPlaceholder: string;
    colorTextDisabled: string;
    colorTextHeading: string;
    colorTextLabel: string;
    colorTextDescription: string;
    colorTextLightSolid: string;
    colorHighlight: string;
    colorBgTextHover: string;
    colorBgTextActive: string;
    colorIcon: string;
    colorIconHover: string;
    colorErrorOutline: string;
    colorWarningOutline: string;
    fontSizeIcon: number;
    lineWidthFocus: number;
    controlOutlineWidth: number;
    controlInteractiveSize: number;
    controlItemBgHover: string;
    controlItemBgActive: string;
    controlItemBgActiveHover: string;
    controlItemBgActiveDisabled: string;
    controlTmpOutline: string;
    controlOutline: string;
    fontWeightStrong: number;
    opacityLoading: number;
    linkDecoration: string;
    linkHoverDecoration: string;
    linkFocusDecoration: string;
    controlPaddingHorizontal: number;
    controlPaddingHorizontalSM: number;
    paddingXXS: number;
    paddingXS: number;
    paddingSM: number;
    padding: number;
    paddingMD: number;
    paddingLG: number;
    paddingXL: number;
    paddingContentHorizontalLG: number;
    paddingContentVerticalLG: number;
    paddingContentHorizontal: number;
    paddingContentVertical: number;
    paddingContentHorizontalSM: number;
    paddingContentVerticalSM: number;
    marginXXS: number;
    marginXS: number;
    marginSM: number;
    margin: number;
    marginMD: number;
    marginLG: number;
    marginXL: number;
    marginXXL: number;
    boxShadow: string;
    boxShadowSecondary: string;
    boxShadowTertiary: string;
    screenXS: number;
    screenXSMin: number;
    screenXSMax: number;
    screenSM: number;
    screenSMMin: number;
    screenSMMax: number;
    screenMD: number;
    screenMDMin: number;
    screenMDMax: number;
    screenLG: number;
    screenLGMin: number;
    screenLGMax: number;
    screenXL: number;
    screenXLMin: number;
    screenXLMax: number;
    screenXXL: number;
    screenXXLMin: number;
    boxShadowPopoverArrow: string;
    boxShadowCard: string;
    boxShadowDrawerRight: string;
    boxShadowDrawerLeft: string;
    boxShadowDrawerUp: string;
    boxShadowDrawerDown: string;
    boxShadowTabsOverflowLeft: string;
    boxShadowTabsOverflowRight: string;
    boxShadowTabsOverflowTop: string;
    boxShadowTabsOverflowBottom: string;
    _tokenKey: string;
    _hashId: string;
}
