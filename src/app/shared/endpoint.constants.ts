let endpoint;

if (window.location.hostname.indexOf('localhost') > -1) {
  endpoint = {
    newsUrlPublic: '/api/public/news',
    newsUrlPrivate: '/api/public/secured/news',
    tripDatesUrlPublic: '/api/public/trip-dates-all',
    tripDatesUrlPrivate: '/api/public/secured/trip-date',
    applicationsUrlPublic: '/api/public/applications',
    applicationsUrlPrivate: '/api/public/secured/applications'
  };
} else {
  endpoint = {
    newsUrlPublic: 'http://api.reiserrelief.org/public/news',
    newsUrlPrivate: 'http://api.reiserrelief.org/public/secured/news',
    tripDatesUrlPublic: 'http://api.reiserrelief.org/public/trip-dates-all',
    tripDatesUrlPrivate: 'http://api.reiserrelief.org/public/secured/trip-date',
    applicationsUrlPublic: 'http://api.reiserrelief.org/public/applications',
    applicationsUrlPrivate: 'http://api.reiserrelief.org/public/secured/applications'
  };
}


export const ENDPOINT = endpoint;
