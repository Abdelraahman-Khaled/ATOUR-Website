/** Install once on the axiosInstance used by the existing ATOUR React app. */
export function installAtourBridge(api) {
  const key = (purpose, target) => `atour:${purpose}:${String(target).trim().toLowerCase()}`;
  api.interceptors.request.use((config) => {
    const path = String(config.url || '').split('?')[0];
    if (path === '/register' && config.data) {
      config.data.verification_token =
        sessionStorage.getItem(key('register', config.data.email)) || '';
    }
    if (path === '/confirm-reset' && config.data) {
      config.data.reset_token = sessionStorage.getItem(key('reset', config.data.username)) || '';
    }
    if (['/booking-trip', '/booking-gift', '/booking-effectivene'].includes(path)) {
      config.headers = config.headers || {};
      config.headers['Idempotency-Key'] ||= crypto.randomUUID();
      if (config.data?.headers?.language) config.headers.lang = config.data.headers.language;
      if (config.data?.headers) delete config.data.headers;
    }
    return config;
  });
  api.interceptors.response.use((response) => {
    const path = String(response.config.url || '').split('?')[0];
    let request = response.config.data;
    if (typeof request === 'string') {
      try {
        request = JSON.parse(request);
      } catch {
        request = {};
      }
    }
    const data = response.data?.data;
    if (path === '/verify-otp' && data?.verification_token) {
      sessionStorage.setItem(key('register', request.email), data.verification_token);
    }
    if (path === '/check-code' && data?.reset_token) {
      sessionStorage.setItem(key('reset', request.username), data.reset_token);
    }
    if (path === '/register' && response.data?.success)
      sessionStorage.removeItem(key('register', request.email));
    if (path === '/confirm-reset' && response.data?.success)
      sessionStorage.removeItem(key('reset', request.username));
    return response;
  });
}
