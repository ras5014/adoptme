import { useState, useEffect } from "react";

const localCache = {};

export const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const response = await fetch(
        `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      if (!response.ok) throw new Error(`Fetching Breed List Failed!`);
      const data = await response.json();

      localCache[animal] = data.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
};
