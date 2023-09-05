import axios from "axios";

const baseUrl = "/api/notes";

let token;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);

  const noneExistingNote = {
    content: "this note does not exist",
    important: true,
    id: 1000000,
  };

  return request.then((response) => response.data.concat(noneExistingNote));
};

const create = (noteObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  
  const request = axios.post(baseUrl, noteObject, config);
  return request.then((response) => response.data);
};

const update = (id, noteObject) => {
  const request = axios.put(`${baseUrl}/${id}`, noteObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
  setToken
};
