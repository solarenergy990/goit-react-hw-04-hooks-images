const API_KEY = "21934405-57162f124158c436f0bdddd5d";
const BASE_URL = "https://pixabay.com/api";

// https://pixabay.com/api/?key=21934405-57162f124158c436f0bdddd5d&q=yellow+flowers&image_type=photo

function fetchImage(query, page) {
  // console.log("api arguments:", query, page);
  const url = `${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(({ hits }) => {
      return hits;
    });
}

const imageAPI = { fetchImage };

export default imageAPI;
