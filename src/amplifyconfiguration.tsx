const config = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
      userPoolClientId: process.env
        .NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID as string,
    },
  },
};

export default config;
