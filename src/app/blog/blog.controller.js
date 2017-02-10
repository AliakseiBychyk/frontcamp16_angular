exports.BlogController = ($scope, GetJSON) => {
    'ngInject';
    const promise = GetJSON.getPosts();
    let counter = 0;

   $scope.setBlog = function () {
        promise
            .then(data => {
                console.log('data: ', data);
                data.posts.forEach(post => {
                    //console.log(post.title);
                    counter++;
                    //console.log('number of posts is ' + counter);
                });
                $scope.posts = data.posts;
                $scope.counter = counter;
                console.log(`scope.counter = ${$scope.counter}`);
            })
            .catch(err => {
                console.log(err);
                $scope.error = "There has been an error!";
            });
    };
    
    $scope.setBlog();

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
