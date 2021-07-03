import React, { createContext, useState } from "react";

export const CharacterContext = createContext();
const CharacterProvider = (props) => {
  const [characterID, setCharacterID] = useState();
  return (
    <CharacterContext.Provider value={{ characterID, setCharacterID }}>
      {props.children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;