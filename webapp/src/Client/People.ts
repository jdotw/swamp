import { useEffect, useState } from "react";

export function usePeople() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [people, setPeople] = useState([]);

  const load = async () => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `http://localhost:5187/individuals`;

      const response = await fetch(url, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      const response_json = await response.json();
      console.log("JSON: ", response_json);
      setPeople(response_json);
      setError(undefined);
      setLoading(false);
    } catch (error: any) {
      console.log("ERROR: ", error.message);
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
