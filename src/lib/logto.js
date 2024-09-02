import LogtoClient from '@logto/next';

export const logtoClient = new LogtoClient({
    endpoint: 'https://auth.tzpro.xyz/oidc/auth',
    appId: '607i5yfqohw99j66f1p3a',
    appSecret: '9zXP71NQN3D8goUXqHpG6eIyo9aFr7yn',
    baseUrl: 'http://localhost:3000', // Change to your own base URL
    cookieSecret: 'bCmw8bo3gtSLrEurCkHQ0aOYnmFs9iso', // Auto-generated 32 digit secret
    cookieSecure: process.env.NODE_ENV === 'production',
});