import { useEffect, useState } from "react";
import { Individual } from "./Individual";

export function usePeople() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [people, setPeople] = useState<Individual[]>([]);

  const load = async () => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/people/individuals`;

      const response = await fetch(url, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      const response_json = await response.json();
      setPeople(response_json);
      setError(undefined);
      setLoading(false);
    } catch (error: any) {
      setPeople([]);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { loading, people, error };
}
