// API Configuration
const getApiBaseUrl = () => {
  // Check if we're in a web environment
  if (typeof window !== 'undefined') {
    return 'http://localhost:8080';
  }
  
  // For React Native environment
  if (typeof Platform !== 'undefined') {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8080';
    }
    return 'http://localhost:8080';
  }
  
  // Default fallback
  return 'http://localhost:8080';
};

export const API_BASE_URL = getApiBaseUrl();

// Other configuration constants can be added here
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['application/pdf']; 