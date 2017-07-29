declare var process: any;
const { PRODUCTION } = process.env;

const BASE_URL = PRODUCTION ? '<ENTER_YOUR_URL>' : 'http://localhost';

export const BASE_API_URL = BASE_URL + (PRODUCTION ? ':443' : ':8000');
export const BASE_WS_URL = BASE_URL + ':8001';

export const CHATS_LIMIT_PER_REQUEST = 10;
export const MESSAGES_LIMIT_PER_REQUEST = 20;

export const DEFAULT_USER_AVATAR = 'assets/profile.png';
export const DEFAULT_CHAT_AVATAR = 'assets/chat.png'