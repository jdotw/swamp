import { useEffect, useState } from "react";
import { NewTribe, Tribe } from "./Tribe";

export function useTribes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [addError, setAddError] = useState(undefined);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/delivery/tribes`;

      const response = await fetch(url, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      const response_json = await response.json();
      setTribes(response_json);
      setError(undefined);
      setLoading(false);
    } catch (error: any) {
      setTribes([]);
      setError(error);
      setLoading(false);
    }
  };

  const add = async (newTribe: NewTribe) => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/delivery/tribes`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newTribe),
      });

      const response_json = await response.json();
      setTribes([...tribes, response_json]);
      setError(undefined);
    } catch (error: any) {
      setTribes([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { loading, tribes, error, add, adding, addError };
}
