import { describe, it, expect } from 'vitest';
import { routes } from '../route-config';

describe('Route Configuration', () => {
  it('should have dashboard as public route', () => {
    const dashboardRoute = routes.find((route) => route.path === '/dashboard');
    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute?.requiredRoles).toBeUndefined();
  });

  it('should require admin role for users route', () => {
    const usersRoute = routes.find((route) => route.path === '/users');
    expect(usersRoute?.requiredRoles).toContain('admin');
  });

  it('should have nested routes for reports', () => {
    const reportsRoute = routes.find((route) => route.path === '/reports');
    expect(reportsRoute?.children?.length).toBeGreaterThan(0);
  });

  it('should apply feature flag to analytics route', () => {
    const reportsRoute = routes.find((route) => route.path === '/reports');
    const analyticsRoute = reportsRoute?.children?.find(
      (route) => route.path === '/reports/analytics'
    );
    expect(analyticsRoute?.featureFlags).toContain('ENABLE_ANALYTICS');
  });
});
