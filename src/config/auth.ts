export default {
  // informações do token
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
  },
};
