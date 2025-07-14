import { store } from '@/redux/store';
import { generateCallApi } from 'ui-helpers';

import { API_BASE_URL } from '@/services';

export const callApi = generateCallApi({ store, API_BASE_URL });
