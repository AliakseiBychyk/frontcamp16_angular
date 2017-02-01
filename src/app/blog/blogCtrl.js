exports.BlogController = ($scope, GetJSON) => {
    const promise = GetJSON.getPosts();
    promise
        .then(data => {
            data.posts.forEach(post => console.log(post.title));
            $scope.posts = data.posts;
        })
        .catch(err => console.log(err));
};