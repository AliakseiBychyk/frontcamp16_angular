exports.GetJSON = ($q) => {
  'ngInject';
  const deferred = $q.defer();
  fetch('http://localhost:8000/blog/json')
    .then(response => response.json())
    .then(data => deferred.resolve(data))
    .catch((err) => {
      console.log("There has been an error!");
      deferred.reject()
    });
  return {
    getPosts: () => {
      return deferred.promise;
    }
  }
};