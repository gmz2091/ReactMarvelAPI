import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CharacterContext } from "../context/characterContext";
import getCharacters from "../utils/getDataMarvel";
import { useSpring, animated } from "react-spring";
import "../assets/css/style.css";
import Spinner from "./Spinner/Spinner";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  let [heroName, setHeroName] = useState({
    heroName: "",
  });
  const [buttonBack, setButtonBack] = useState(false);
  const { setCharacterID } = useContext(CharacterContext);

  const springWidth = useSpring({
    from: { height: "8px" },
    height: "50px",
  });

  const getCharacter = async () => {
    const data = await getCharacters();
    console.log(data);
    if (data === undefined || data.code === "RequestThrottled") {
      return setStatus(true);
    }
    setCharacters(data.data.results);
  };
  useEffect(() => {
    getCharacter();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (heroName.heroName === "") {
      return setError(true);
    }
    setError(false);
    try {
      const data = await getCharacters(heroName.heroName);
      if (data.data.results.length === 0) {
        setStatus(true);
      }
      setCharacters(data.data.results);
      setButtonBack(true);
    } catch (error) {
      const err = new Error(error);
      console.log(err);
    }
    setHeroName({ heroName: "" });
  };

  const handleChange = (e) => {
    setHeroName({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {status ? (
        <div className="mt-12 w-10/12 shadow-2xl rounded-md m-auto px-6 py-2 flex flex-wrap justify-center bg-red-200 border-l-8 border-red-500 text-red-900">
          <p className="w-full text-center">Error en la API</p>
          <p className="w-full text-center">
            "You have exceeded your rate limit. Please try again later."
          </p>
        </div>
      ) : (
        <>
          <div className="w-10/12 m-auto">
            <form action="" className="w-full mt-12" onSubmit={handleSubmit}>
              <input
                type="text"
                name="heroName"
                value={heroName.heroName}
                placeholder="Busca tu Heroe favorito"
                className={
                  error
                    ? "placeholder:text-red-500 px-4 py-2 w-full focus:outline-none bg-red-200 rounded border border-red-500"
                    : "px-4 py-2 w-full focus:outline-none bg-gray-200 rounded"
                }
                onChange={handleChange}
              />
            </form>
          </div>
          <animated.div className="w-10/12 m-auto py-12 relative">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
              {buttonBack ? (
                <button
                  className="rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center absolute top-16 right-16 w-10 h-10"
                  onClick={() => {
                    try {
                      setCharacters([]);
                      getCharacter();
                      setButtonBack(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              ) : null}
              {characters.length !== 0 ? (
                characters.map((character) => (
                  <Link to={`/character/${character.id}`} key={character.id}>
                    <div
                      className="rounded-md shadow-lg sm:w-full w-1/2 h-auto text-white md:m-0 m-auto characters transition-all transform hover:w-96"
                      onClick={() => {
                        window.localStorage.characterID = JSON.stringify(
                          character.id
                        );
                        // setCharacterID(character);
                      }}
                    >
                      <div className="w-full">
                        <img
                          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                          alt={character.name}
                          className="w-full h-44 object-cover"
                        />
                      </div>
                      <div className="bg-black opacity-90 rounded-b-md">
                        <div
                          className="flex justify-center py-6 relative"
                          id="example"
                        >
                          <p className="py-2">{character.name}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center col-span-3">
                  <Spinner />
                </div>
              )}
            </div>
          </animated.div>
        </>
      )}
    </>
  );
};

export default Home;
