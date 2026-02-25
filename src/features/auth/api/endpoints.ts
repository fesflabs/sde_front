/**
 * Authentication API endpoints
 */
export const AUTH_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  SELECT_ROLE: '/auth/change-role',
  ME: '/auth/me',

  // Password management
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',

  // Email verification
  VERIFY_EMAIL: '/auth/verify-email',
  SEND_VERIFICATION: '/auth/send-verification',

  // Permissions
  CHECK_PERMISSION: '/auth/check-permission',
  CHECK_PERMISSIONS_BATCH: '/auth/check-permissions/batch',

  // Info
  TOKEN_INFO: '/auth/token-info',
  MODULES: '/auth/modules',
};
