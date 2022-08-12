const defaultEnvoyHost = "";

type Config = {
  envoyHost: string;
};

export const config = (): Config => {
  if (process.env.NODE_ENV === "development") {
    if (!process.env.REACT_APP_DEV_ENVOY_HOST) {
      return { envoyHost: defaultEnvoyHost };
    }
    return {
      envoyHost: process.env.REACT_APP_DEV_ENVOY_HOST,
    };
  } else {
    return {
      envoyHost: defaultEnvoyHost,
    };
  }
};
