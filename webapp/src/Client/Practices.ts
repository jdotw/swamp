import { useEffect, useState } from "react";
import { Practice } from "./Practice";

export function usePractices() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [practices, setPractices] = useState<Practice[]>([]);

  const load = async () => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/capability/practices`;

      const response = await fetch(url, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      const response_json = await response.json();
      setPractices(response_json);
      setError(undefined);
      setLoading(false);
    } catch (error: any) {
      setPractices([]);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { loading, practices, error };
}
