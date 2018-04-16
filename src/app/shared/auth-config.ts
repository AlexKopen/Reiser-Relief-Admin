interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '5ep2SNhoVyNHhz41vxFl0Y2M8mg6o6gY',
  CLIENT_DOMAIN: 'volzap.auth0.com',
  AUDIENCE: 'https://api.reiserrelief.org',
  REDIRECT: window.location.href.split('/')[0] + '//' +
  window.location.href.split('/')[2] + '/callback',
  SCOPE: 'openid profile email'
};
