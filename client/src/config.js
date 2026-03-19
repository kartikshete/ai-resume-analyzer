// Simple config to manage API endpoints
const CONFIG = {
    API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB limit check later?
};

export default CONFIG;
