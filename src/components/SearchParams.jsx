import React, { useState } from "react";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { all } from "../store/searchParamsSlice";
import fetchBreedList from "../queries/fetchBreedList";
// import fetchSearch from "../queries/fetchSearch";
import { useSearchQuery } from "../apiServices/petApiService";
import { useGetBreedsQuery } from "../apiServices/petApiService";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const dispatch = useDispatch();
  const adoptedPet = useSelector((state) => state.adoptedPet.value);

  const requestParams = useSelector((state) => state.searchParams.value);

  const [animal, setAnimal] = useState("");

  // Using React Query
  // const tempBreeds = useQuery(["breeds", animal], fetchBreedList);
  // const breeds = tempBreeds?.data?.breeds ?? [];
  // const results = useQuery(["search", requestParams], fetchSearch);
  // const pets = results?.data?.pets ?? [];
  // Using RTK Query
  let { data: breeds } = useGetBreedsQuery(animal);
  breeds = breeds ?? [];
  let { data: pets } = useSearchQuery(requestParams);
  pets = pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breed: formData.get("breed") ?? "",
          };

          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={name} />
          </div>
        ) : null}

        <label htmlFor="location">
          Location
          <input
            id="location"
            name="location"
            placeholder="Location"
            className="min-h-[auto] w-full rounded border-0 px-2 py-[0.00rem] leading-[1.2]"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            className="min-h-[auto] w-full rounded border-0 px-2 py-[0.00rem] leading-[1.2]"
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            name="breed"
            disabled={breeds.length === 0}
            className="min-h-[auto] w-full rounded border-0 px-2 py-[0.00rem] leading-[1.2]"
          >
            <option />
            {breeds.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
