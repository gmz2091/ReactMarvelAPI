import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CharacterContext } from "../context/characterContext";

import getCharacters from "../utils/getCharacterById";

const CharacterDetail = () => {
  const history = useHistory();
  const { characterID, setCharacterID } = useContext(CharacterContext);
  const id = JSON.parse(window.localStorage.getItem("characterID"));

  useEffect(() => {
    const getCharacterByID = async () => {
      const data = await getCharacters(id);
      setCharacterID(data.data.results);
    };

    getCharacterByID();
  }, [characterID, setCharacterID, id]);
  return (
    <>
      <button
        onClick={() => {
          setCharacterID(undefined);
          window.localStorage.clear();
          history.push("/");
        }}
      >
        Back
      </button>
      {characterID !== undefined ? (
        <div className="w-10/12 m-auto mt-12 px-4 py-2 shadow-xl">
          <div className="w-1/4">
            <img
              src={`${characterID[0].thumbnail.path}.${characterID[0].thumbnail.extension}`}
              alt=""
              className="w-full"
            />
          </div>
        </div>
      ) : (
        <p>No se encontraron datos</p>
      )}
    </>
  );
};

export default CharacterDetail;
