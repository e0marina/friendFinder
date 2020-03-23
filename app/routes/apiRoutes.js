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
