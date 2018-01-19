const isDevelopmentBuild = process.env.NODE_ENV === 'development';

export const API_ENDPOINT = isDevelopmentBuild ? 'https://christmas-api.dev/api/v1' : 'https://christmas-api.maartendev.me/api/v1';