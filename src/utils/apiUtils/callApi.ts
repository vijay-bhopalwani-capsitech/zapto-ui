import { store } from '@/redux/store';


import { API_BASE_URL } from '@/services';
import { generateCallApi } from '../../../packages/ui-helpers';

export const callApi = generateCallApi({ store, API_BASE_URL });
