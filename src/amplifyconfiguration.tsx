const config = {
  aws_project_region: process.env.NEXT_PUBLIC_REGION,
  auth: {
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
    region: process.env.NEXT_PUBLIC_REGION,
    mandatorySignIn: false,
    authenticationFlowType: process.env.NEXT_PUBLIC_AUTHENTICATION_FLOW_TYPE,
  },
};

export default config;
