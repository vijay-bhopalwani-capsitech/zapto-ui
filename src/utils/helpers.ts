import { useResponsive } from 'ahooks';
import { ISkillZod } from 'api-definitions';
import { parsePhoneNumber } from 'awesome-phonenumber';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isObject = (arg: any) => typeof arg === 'object' && !Array.isArray(arg);

export const downloadFile = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FileName.pdf`);
    link.setAttribute('target', '_blank');
    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove the link
    link.parentNode?.removeChild(link);
};

export function base64ToBlob(base64: string, type = 'application/octet-stream') {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type });
}

export const downloadBase64File = ({ base64, mimeType, fileName }: { base64: string; mimeType: string; fileName: string }) => {
    const base64Data = base64.replace(/-/g, '+').replace(/_/g, '/');
    if (base64Data) {
        const blob = base64ToBlob(base64Data, mimeType);
        const uri = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = uri;
        a.download = fileName;
        a.click();
    }
};

export const formatContactNumber = (countryCode: string | number, number: string) => {
    return `${countryCode} ${number}`;
};

export const convertContactNumberStringToObject = (phone: string) => {
    let number = phone;
    if (number.includes('+')) {
        number = number.replace('+', '');
    }
    const parsedNumber = parsePhoneNumber('+' + number);

    if (!parsedNumber?.valid) {
        return false;
    }

    return {
        countryCode: parsedNumber?.countryCode,
        number: parsedNumber?.number?.significant,
        remarks: '',
        type: 'MOBILE',
    };
};

export const convertLabelValueToIdNameObject = (obj: any) => {
    if (obj?.label && obj?.value)
        return {
            id: obj?.value,
            name: obj?.label,
        };
    else return obj;
};

/**
 * Converts an array of ISkillZod objects to an array of objects with
 * 'skillId' property, which is the _id of the skill.
 * @param skills The array of ISkillZod objects
 * @returns Array of objects with skillId property
 */
export const convertSkillsToSkillIdObj = (skills: ISkillZod[]) => {
    const data =
        skills && skills.length > 0
            ? skills.map((skill: ISkillZod) => ({
                  skillId: skill._id,
              }))
            : [];
    return data;
};

export const getIsCollapsibleView = () => {
    const breakpoint = useResponsive();
    const { xs, sm, md, lg, xl, xxl } = breakpoint;
    const isTablet = xs && sm && md && !lg && !xl && !xxl;
    const isPhone = xs && !md && !lg && !xl && !xxl;
    const isCollapsedView = isPhone || isTablet;
    return isCollapsedView;
};

const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + 'y';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + 'm';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + 'd';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + 'hr';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + 'min';
    }
    return Math.floor(seconds) + 's';
};
export const getEntityCreatedTime = (createdAt) => {
    return timeSince(new Date(createdAt));
};

export const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
};

export const scrollToForm = (formId: string) => {
    const element = document.getElementById(formId)
    element?.scrollIntoView({ behavior: 'smooth' })
}

