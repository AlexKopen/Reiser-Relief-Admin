interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'tvwRmFJ751eO63fdVTrk6zMdBfIoU0v7',
    domain: 'volzap.auth0.com',
    callbackURL: 'http://localhost:4200/callback'
};
