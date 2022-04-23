export class apis {}
const url = "https://api-test.innoloft.com";
apis.getProducts = async (txt) => {
  return fetch(url + txt).then((res) => res.json());
};
apis.getTrl = async (txt = `/trl/`) => {
  return fetch(url + txt).then((res) => res.json());
};
apis.getConfiguration = async (txt) => {
  return fetch(url + "/configuration/" + txt.toString() + "/").then((res) =>
    res.json()
  );
};
apis.updateProduct = async (txt, data) => {
  let request_options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(url + txt, request_options).then((res) => res.json());
};
