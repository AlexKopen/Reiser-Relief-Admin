interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'HL1GpSXXFG6Z65dJXTauRnchkyJFlbh5',
  CLIENT_DOMAIN: 'kopen.auth0.com', // e.g., you.auth0.com
  AUDIENCE: 'http://localhost:3001/api/',
  REDIRECT: window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2] + '/callback/',
  SCOPE: 'openid profile email'
};
