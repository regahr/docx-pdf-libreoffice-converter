export const protocol = {
  HTTP: 'http://',
  HTTPS: 'https://'
};

export const API_PATH = '/api/v1/finance';
export const ADMIN_API_PATH = '/api/v1/admin';
export const INTEGRATION_API_PATH = '/api/v1/integration';

export const externalRoutes = {
  SPROUT_API_PORTAL: '/portal'
};

export const bugsLevel = {
  CRITICAL: 'critical',
  MAJOR: 'major',
  MINOR: 'minor'
};

export const images = {
  [bugsLevel.CRITICAL]: 'https://platform.slack-edge.com/img/default_application_icon.png',
  [bugsLevel.MAJOR]: 'https://platform.slack-edge.com/img/default_application_icon.png',
  [bugsLevel.MINOR]: 'https://platform.slack-edge.com/img/default_application_icon.png'
};

export const colors = {
  [bugsLevel.CRITICAL]: '#D00000',
  [bugsLevel.MAJOR]: '#E6C74D',
  [bugsLevel.MINOR]: '#A33F90'
};

export function okResponse(status, code, data, message) {
  return {
    status,
    code,
    data,
    message
  };
}

export function okResponseWithMeta(status, code, data, meta, message) {
  return {
    status,
    code,
    data,
    meta,
    message
  };
}

export function errorResponse(status, code, message) {
  return {
    status,
    code,
    message
  };
}

export function customResponse(status, code, data, message) {
  return {
    status,
    code,
    data,
    message
  };
}

export function noop() {}
