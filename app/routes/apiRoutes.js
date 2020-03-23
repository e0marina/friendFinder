// Your `apiRoutes.js` file should contain two routes:

//    - A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    - A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

//LOAD DATA

var friendsData = require("../data/friends");
var totalScoreArr = [];
//ROUTING
module.exports = function(app) {
  //loop through friendsData and get the friends already in the array's scores

  for (let i = 0; i < friendsData.length; i++) {
    console.log(friendsData[i].scores); //array of each stored
    console.log("_____________________");
    var totalscore = 0;
    for (let j = 0; j < friendsData[i].scores.length; j++) {
      totalscore += parseInt(friendsData[i].scores[j]);
    }
    totalScoreArr.push(totalscore);
  }

  //GET
  app.get("/friends", function(request, response) {
    response.json(friendsData);
  });
  //POST

  app.post("/friends", function(request, response) {
    friendsData.push(request.body);

    console.log(request.body.scores); //can get just submitted info off of this, but need users already stored
    var currentScoreArr = request.body.scores; //variable holding current/submitted scores
    var csTotalScore = 0;
    for (let k = 0; k < currentScoreArr.length; k++) {
      csTotalScore += parseInt(currentScoreArr[k]);
    }
    //find closest distance btw friends and current scorer
    var differenceFriendScore = 100000;
    var friendIndex = -1;
    console.log(totalScoreArr);

    for (let i = 0; i < totalScoreArr.length; i++) {
      let difference = Math.abs(totalScoreArr[i] - csTotalScore);
      console.log(difference, csTotalScore);

      if (difference < differenceFriendScore) {
        differenceFriendScore = difference;
        friendIndex = i;
        console.log(differenceFriendScore, friendIndex);
      }
    }
    var perfectFriend = {
      userData: friendsData[friendIndex],
      totalscore: totalScoreArr[friendIndex],
      currentUserScore: csTotalScore
    };
    console.log(perfectFriend);

    response.json(perfectFriend);
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
