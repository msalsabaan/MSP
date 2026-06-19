import { environment } from '../../../environments/environment';

/** Base URL for all backend API calls. */
export const API_URL = environment.apiUrl;

/** localStorage keys used across the app. */
export const STORAGE_KEYS = {
  theme: 'msp-theme',
  lang: 'msp-lang',
  token: 'msp-token',
  refresh: 'msp-refresh',
  role: 'msp-role',
  user: 'msp-user',
} as const;
