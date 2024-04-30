const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1]; // All value we pass will be in queryKey[1]

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPet;

// Whenever queryKey changes it tries to run depending on the stall and cache time settings.
// When you want to call an api call it by query selector
