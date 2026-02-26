export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  FEATURE_FLAGS_ENABLED: process.env.NEXT_PUBLIC_FEATURE_FLAGS_ENABLED === 'true',
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
};
