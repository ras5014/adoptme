import { useContext, useState } from "react";
import { useQuery } from "react-query";
import Results from "./Results";
import fetchSearch from "../apiCalls/fetchSearch";
import fetchBreedList from "../apiCalls/fetchBreedList";
import AdoptedPetContext from "../contexts/AdoptedPetContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("");
  // If you want to call APIs at hthe start of the render then use useQuery with no parameters i.e. const results1 = useQuery(["breeds"], fetchBreedList);
  const results1 = useQuery(["breeds", animal], fetchBreedList); // It runs whenever animal changes (checks breed cache, if data available it fetches) depending on the stall & cache time
  const breeds = results1?.data?.breeds ?? [];
  const [adoptedPet] = useContext(AdoptedPetContext); // Here we are using only adoptedPet
  // Use react-query instead of useEffect
  const results = useQuery(["search", requestParams], fetchSearch); // Here search is the key in the cache used by react-dom
  const pets = results?.data?.pets ?? [];
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "", // Data agaya nahinto empty string kardo
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">Location</label>
        <input id="location" name="location" placeholder="Location" />
        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          name="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
          }}
        >
          <option />
          {ANIMALS.map((animal) => {
            return <option key={animal}>{animal}</option>;
          })}
        </select>
        <label htmlFor="breed">Breed</label>
        <select id="breed" disabled={breeds.length === 0} name="breed">
          <option />
          {breeds.map((breed) => {
            return <option key={breed}>{breed}</option>;
          })}
        </select>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

/*
  Func-1 : By selecting an animal, we can get the breeds of that animal
  Func-2 : By giving input to the form we can get the list of all pets available to adopt
*/
