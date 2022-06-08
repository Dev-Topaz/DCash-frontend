import axios from "axios";

axios.defaults.baseURL = "https://ibaseproject.com/api/locks/";

export async function getAll() {
  const result = await axios
    .get("/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return result;
}

export async function getBlock(filter) {
  const result = await axios
    .get("/block", {
      params: {
        timestamp: filter,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return result;
}
