# frontcamp16_angular

$ npm start

to run webpack-dev-server

the mongodb database and express server should be run prior to running this app 

$ node server.js

from server folder to run server on localhost:8000
JSON API on localhost:8000/blog/json


testing framework is configured to get bundle.js as source file, so you should run webpack first to create static bundle.js
(important!: webpack-dev-server is handy for development, but it doesn't create static bundle.js)

after bundle.js is created run karma start karma.config.js 
(it is better to install karma and webpack globally for easy commands execution)