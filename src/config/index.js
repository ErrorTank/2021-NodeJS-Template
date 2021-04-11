import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({
  path: ".env"
});
if (envFound.error) {

  throw new Error("Couldn't find .env file ");
}

export default {
  port: parseInt(process.env.PORT, 10),
  api: {
    prefix: '/api',
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
};
