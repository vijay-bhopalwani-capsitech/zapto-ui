import { useMedia } from 'react-use';
import { isServer } from '../utils';

export const useIsMobile = () => {
    return useMedia('(max-width: 575px)', isServer());
};
