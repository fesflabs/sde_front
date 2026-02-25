type EnvVar = {
  name: string;
  required: boolean;
  development?: boolean;
  production?: boolean;
};

/**
 * Validates that required environment variables are set
 * @param envVars Array of environment variables to validate
 * @throws Error if a required environment variable is missing
 */
export function validateEnv(envVars: EnvVar[]): void {
  const missingVars: string[] = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  envVars.forEach((envVar) => {
    // Skip variables that are only required in specific environments
    if ((envVar.development && !isDevelopment) || (envVar.production && !isProduction)) {
      return;
    }

    if (envVar.required && !process.env[envVar.name]) {
      missingVars.push(envVar.name);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}
