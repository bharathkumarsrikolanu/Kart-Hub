// ============================================
// KartHub — Client-Side Router (Hash-based)
// ============================================

const routes = {};
let currentRoute = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return currentRoute;
}

export function getRouteParams() {
  const hash = window.location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);
  return parts;
}

export function getQueryParams() {
  const hash = window.location.hash.slice(1) || '/';
  const queryIndex = hash.indexOf('?');
  if (queryIndex === -1) return {};
  const queryString = hash.slice(queryIndex + 1);
  const params = {};
  queryString.split('&').forEach(param => {
    const [key, value] = param.split('=');
    if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });
  return params;
}

function matchRoute(hash) {
  const path = hash.split('?')[0]; // Remove query params
  
  // Exact match first
  if (routes[path]) return { handler: routes[path], params: {} };

  // Pattern matching (e.g., /product/:id)
  for (const [pattern, handler] of Object.entries(routes)) {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) continue;

    const params = {};
    let match = true;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
      } else if (patternParts[i] !== pathParts[i]) {
        match = false;
        break;
      }
    }

    if (match) return { handler, params };
  }

  return null;
}

export function handleRoute() {
  const hash = window.location.hash.slice(1) || '/';
  const match = matchRoute(hash);
  
  if (match) {
    currentRoute = hash;
    match.handler(match.params, getQueryParams());
  } else {
    // 404 - redirect to home
    navigate('/');
  }
}

export function initRouter() {
  window.addEventListener('hashchange', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    handleRoute();
  });
  
  // Handle initial load
  handleRoute();
}

