import * as chaiHttp from './chaiHttp.util.test';

// AUTH
export function auth(props) {
  switch (props.method) {
    case 'signup':
      return chaiHttp.POST({ endpoint: 'AUTH_SIGNUP', payload: props.payload });
    case 'check-token':
      return chaiHttp.GET({ endpoint: 'AUTH_CHECK_TOKEN', cookies: props.cookies });
    case 'request-code':
      return chaiHttp.POST({ endpoint: 'AUTH_REQUEST_CODE', payload: props.payload, cookies: props.cookies });
    case 'verify-code':
      return chaiHttp.POST({ endpoint: 'AUTH_VERIFY_CODE', payload: props.payload, cookies: props.cookies });
    case 'signin':
      return chaiHttp.POST({ endpoint: 'AUTH_SIGNIN', payload: props.payload });
    case 'exists-check':
      if (props.userAgent) {
        return chaiHttp.POST({
          endpoint: 'AUTH_EXISTS_CHECK', payload: props.payload, cookies: props.cookies, headers: props.headers
        }).set('User-Agent', props.userAgent);
      }
      return chaiHttp.POST({ endpoint: 'AUTH_EXISTS_CHECK', payload: props.payload });
    case 'onboard-company':
      return chaiHttp.POST({ endpoint: 'AUTH_ONBOARD_COMPANY', payload: props.payload, cookies: props.cookies });
    case 'onboard-company-detail':
      return chaiHttp.GET({ endpoint: 'AUTH_ONBOARD_COMPANY', payload: props.payload, cookies: props.cookies });
    case 'onboard-company-document':
      return chaiHttp.POST({ endpoint: 'AUTH_ONBOARD_COMPANY_DOCUMENT', payload: props.payload, cookies: props.cookies });
    case 'select-organization':
      return chaiHttp.POST({ endpoint: 'AUTH_ORGANIZATION_SELECTION', payload: props.payload, cookies: props.cookies });
    case 'check-pin':
      return chaiHttp.POST({ endpoint: 'AUTH_CHECK_PIN', payload: props.payload, cookies: props.cookies });
    case 'register-device':
      if (props.userAgent) {
        return chaiHttp.POST({
          endpoint: 'AUTH_REGISTER_DEVICE', payload: props.payload, cookies: props.cookies, headers: props.headers
        }).set('User-Agent', props.userAgent);
      }
      return chaiHttp.POST({ endpoint: 'AUTH_REGISTER_DEVICE', payload: props.payload, cookies: props.cookies });
    default:
      return true;
  }
}

export function noop() { }
