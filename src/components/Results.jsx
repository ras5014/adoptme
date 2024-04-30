import React from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((item) => (
          <Pet
            key={item.id}
            name={item.name}
            animal={item.animal}
            breed={item.animal}
            images={item.images}
            location={`${item.city}, ${item.state}`}
            id={item.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
