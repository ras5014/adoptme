import { Suspense, lazy } from "react";
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // To get /:id
import { useQuery } from "react-query"; // For Query Selector
import fetchPet from "../apiCalls/fetchPets";
import Carousel from "./Carousel";
// import Modal from "./Modal";
const Modal = lazy(() => import("./Modal"));
import AdoptedPetContext from "../contexts/AdoptedPetContext";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // After clicking on Yes button we will navigate to home page
  const [_, setAdoptedPet] = useContext(AdoptedPetContext); // Here we are using only setAdoptedPet
  const results = useQuery(["details", id], fetchPet); // Here details is the key in the cache used by react-query

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">⌛</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Details;
