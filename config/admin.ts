export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  // Tối ưu cho shared hosting
  watchIgnoreFiles: [
    '**/node_modules/**',
    '**/.git/**',
    '**/build/**',
    '**/.cache/**',
  ],
  // Giảm memory usage
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
  // Disable admin build nếu memory không đủ
  build: {
    backend: env('ADMIN_BACKEND_URL', '/admin'),
  },
});
