interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

const redirectUrl = window.location.hostname.indexOf('localhost') > -1 ?
  'http://localhost:4200/callback' : 'http://reiserrelief.org/admin_portal/callback';

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '5ep2SNhoVyNHhz41vxFl0Y2M8mg6o6gY',
  CLIENT_DOMAIN: 'volzap.auth0.com',
  AUDIENCE: 'https://api.reiserrelief.org',
  REDIRECT: redirectUrl,
  SCOPE: 'openid profile email'
};
