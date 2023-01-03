interface UseBackendProps {
  domain?: string;
}

const config = {
  domain: "localhost:5173",
};

export function useBackend({ domain = config.domain }: UseBackendProps) {
  const authHeaders = async () => {
    // const accessToken = await getAccessTokenSilently({
    //   audience: `http://${domain}/`,
    //   scope: "read:category",
    // });
    // console.log("TOKEN: ", accessToken);
    const accessToken = `TOKEN-${domain}`;
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  };

  const urlForPath = (path: string) => {
    return `http://${domain}${path}`;
  };

  return {
    defaultDomain: config.domain,
    authHeaders,
    urlForPath,
  };
}
