const getCharacters = async (name) => {
  const API = process.env.REACT_APP_API_MARVEL;
  try {
    const res =
      name === undefined
        ? await fetch(API)
        : await fetch(`${API}&name=${name}`);
    const data = res.json();
    return data;
  } catch (error) {
    const err = new Error(error);
    console.log(err);
  }
};

export default getCharacters;

// name === undefined
//         : await fetch(`${API}&name=${name}`)
//         :
