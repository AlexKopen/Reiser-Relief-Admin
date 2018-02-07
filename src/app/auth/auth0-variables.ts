interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: '0mhlYvM24PZgMmVwdzklWT49fciMI8NE',
    domain: 'volzap.auth0.com',
    callbackURL: 'http://localhost:4200/callback'
};
