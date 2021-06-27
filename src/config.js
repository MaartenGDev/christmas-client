const isDevelopmentBuild = process.env.NODE_ENV === 'development';

export const API_ENDPOINT = isDevelopmentBuild ? 'http://127.0.0.1:8000/api/v1' : 'https://christmas-maarten.azurewebsites.net/api/v1';
