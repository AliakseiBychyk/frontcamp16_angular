exports.GetJSON = ($q) => {
  const deffered = $q.defer();
  fetch('http://localhost:8000/blog/json')
    .then(response => response.json())
    .then(data => deffered.resolve(data))
    .catch((err) => console.log(err));
  return {
    getPosts: () => {
      return deffered.promise;
    }
  }
};