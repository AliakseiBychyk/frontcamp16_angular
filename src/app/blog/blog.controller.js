exports.BlogController = ($scope, GetJSON) => {
    'ngInject';
    const promise = GetJSON.getPosts();
    $scope.counter = 0;

    $scope.setBlog = function () {
        promise
            .then(data => {
                data.posts.forEach(post => {
                    console.log(post.title);
                    $scope.counter++;
                    console.log('number of posts is ' + $scope.counter);
                });
                $scope.posts = data.posts;
            })
            .catch(err => console.log(err));
    };

   // $scope.setBlog();

    $scope.newPost = { 
        title: '',
        body: '',
        permalink: '',
        author: '',
        tags: [],
        date: ''
    };

    $scope.writePost = () => {
        $scope.newPost.date = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = {
            title: '',
            body: '',
            permalink: '',
            author: '',
            tags: [],
            date: ''
        };
    };    
};
