const baseUrl = 'https://us-central1-takweed-eg.cloudfunctions.net/admin';
// const baseUrl = 'http://localhost:3002/admin';
// const baseUrl = process.env.REACT_APP_BASE_URL_FETCH;
// console.log(process.env);

const fetchData = (route, method, body = null, headers = null) => {
  return fetch(baseUrl + route, {
    method: method,
    headers: new Headers({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
      ...headers,
    }),
    body: body === null ? null : JSON.stringify(body),
  });
};
export { fetchData };
