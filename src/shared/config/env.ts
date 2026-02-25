import { validateEnv } from '@/shared/lib/utils/env-validation';

// Define required environment variables
const requiredEnvVars = [
  { name: 'NEXT_PUBLIC_API_URL', required: true },
  { name: 'NEXT_PUBLIC_FEATURE_FLAGS_ENABLED', required: false },
  { name: 'NEXT_PUBLIC_URL', required: false },
  { name: 'JWT_SECRET', required: true },
  // Add more environment variables as needed
];

// Validate environment variables
try {
  validateEnv(requiredEnvVars);
} catch (error) {
  console.error(error);
  // Only throw in server context to avoid breaking client-side rendering
  if (typeof window === 'undefined') {
    throw error;
  }
}

// Export environment variables with types
export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  FEATURE_FLAGS_ENABLED: process.env.NEXT_PUBLIC_FEATURE_FLAGS_ENABLED === 'true',
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
