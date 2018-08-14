module.exports = {
  "/api": {
    target: "http://api.reiserrelief.org",
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    },
    secure: false
  }
};
