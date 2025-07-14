import { getValueAtPathInObj } from '../index';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const downloadFile = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FileName.pdf`);
    link.setAttribute('target', `_blank`);
    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove the link
    link.parentNode?.removeChild(link);
};

export function base64ToBlob(base64 = '', type = 'application/octet-stream') {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type });
}

export const getYearsList = () => {
    const currentYear = +new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
        years.push({
            label: year.toString(),
            value: year.toString(),
        });
    }
    return years;
};

export const readFile = async (file: File) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
};

export const isServer = () => typeof window === 'undefined';

export const vibrateError = ({ parentSelector = 'body' } = {}) => {
    let elements: NodeListOf<Element>;
    let elementsArr: Array<Element>;
    setTimeout(() => {
        elements = document.querySelectorAll(`${parentSelector} .is-invalid`);
        elementsArr = Array.from(elements);

        if (Array.isArray(elementsArr) && elementsArr.length > 0) {
            elementsArr.forEach((item) => {
                if (item && item.classList && item.classList.add && typeof item.classList.add === 'function') {
                    item.classList.add('vibrate');
                }
            });
        }

        setTimeout(() => {
            if (Array.isArray(elementsArr) && elementsArr.length > 0) {
                elementsArr.forEach((item) => {
                    if (item && item.classList && item.classList.remove && typeof item.classList.remove === 'function') {
                        item.classList.remove('vibrate');
                    }
                });
            }
        }, 1200);
    }, 0);

    if (navigator && navigator.vibrate && typeof navigator.vibrate === 'function') {
        navigator.vibrate([101]);
    }
};

export const makeHashMapFromArray = (arr = [], idKey = '_id') => {
    const obj: Record<string, any> = {};
    arr.forEach((item) => {
        const key = getValueAtPathInObj({
            obj: item,
            path: idKey,
        });
        obj[key] = item;
    });
    return obj;
};

export const capitalizeFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const extractIdFromObject = ({ obj = {}, idKey = '_id' }: { obj?: any; idKey?: string } = {}) => {
    return obj[idKey];
};

export const extractIdsFromArray = ({ arr = [], idKey = '_id' }: { arr: Array<any>; idKey?: string }) => {
    return arr.map((obj) => extractIdFromObject({ obj, idKey })).filter(Boolean);
};

export const convertNameObjectToString = (nameObj: any) => {
    let name;
    name = nameObj?.first;
    if (nameObj?.middle) {
        name = `${name} ${nameObj?.middle}`;
    }
    name = `${name} ${nameObj?.last}`;
    return name;
};

export const convertNameStringToObject = (nameString: string) => {
    return {
        first: nameString.trim().split(' ')[0],
        middle:
            nameString
                .trim()
                .split(' ')
                .slice(1, nameString.trim().split(' ').length - 1)
                .join(' ')
                .trim() || '',
        last: (nameString.trim().split(' ').length > 1 && nameString.trim().split(' ').slice(-1)[0]) || '',
    };
};