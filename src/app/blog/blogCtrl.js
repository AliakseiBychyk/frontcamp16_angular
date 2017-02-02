exports.BlogController = ($scope, GetJSON) => {
    const promise = GetJSON.getPosts();
    promise
        .then(data => {
            data.posts.forEach(post => console.log(post.title));
            $scope.posts = data.posts;
        })
        .catch(err => console.log(err));


    $scope.newPost = { 
        title: '',
        body: '',
        permalink: '',
        author: '',
        tags: [],
        date: ''
    };

    $scope.post = () => {
        $scope.newPost.date = Date.now();
        $scope.posts.push($scope.newPost);
        $scopw.newPost = {
            title: '',
            body: '',
            permalink: '',
            author: '',
            tags: [],
            date: ''
        };
    };    
};
