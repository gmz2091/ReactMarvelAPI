const getCharacters = async (id) => {
  const API = process.env.REACT_APP_API_MARVEL_BY_ID;
  const API_KEY = process.env.REACT_APP_API_KEY_MARVEL;
  try {
    const res = await fetch(`${API}${id}${API_KEY}`);
    const data = res.json();
    return data;
  } catch (error) {
    const err = new Error(error);
    console.log(err);
  }
};

export default getCharacters;
