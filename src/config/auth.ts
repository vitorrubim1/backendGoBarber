export default {
  // informações do token
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
