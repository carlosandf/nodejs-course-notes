import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:12345'
];
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    console.log({ origin });
    if (acceptedOrigins.includes(origin) || !origin) {
      return callback(null, origin);
    }

    return callback(new Error('Not allowed by CORS'));
  }
});
