// Your `apiRoutes.js` file should contain two routes:

//    - A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    - A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

//LOAD DATA
//linking routes to data source
var friendsData = require("../data/friends");

//ROUTING
module.exports = function(app) {
  app.get("/friends", function(request, response) {
    response.json(friendsData);
  });

  app.post("/friends", function(request, response) {
    friendsData.push(request.body);
    response.json(true);
  });
};
