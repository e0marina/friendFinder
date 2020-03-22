// Your `apiRoutes.js` file should contain two routes:

//    - A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    - A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

//LOAD DATA

var friendsData = require("../data/friends");

//ROUTING
module.exports = function(app) {
  //loop through friendsData and get the friends already in the array's scores
  var pastFriendsScoresArr = [];
  function pastFriends() {
    for (let i = 0; i < friendsData.length; i++) {
      //   console.log(friendsData[i].scores);
      console.log("_____________________");

      pastFriendsScoresArr.push(friendsData[i].scores);
    }
    console.log(pastFriendsScoresArr); //now an array of arrays ughhhh
  }
  pastFriends();
  //GET
  app.get("/friends", function(request, response) {
    response.json(friendsData);
  });
  //POST
  var currentScoreArr = [];
  app.post("/friends", function(request, response) {
    friendsData.push(request.body);

    // console.log(request.body.scores); //can get just submitted info off of this, but need users already stored
    var currentScoreArr = request.body.scores; //variable holding current/submitted scores

    response.json(true);
  });
};

// - Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
//loop through the array of objects, pulling off the scores...then convert the scores to an array of nums?

// - With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
//   - Example:
//     - User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
//     - User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
//     - Total Difference: **2 + 1 + 2 =** **_5_**
// - Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on.
// - The closest match will be the user with the least amount of difference.
