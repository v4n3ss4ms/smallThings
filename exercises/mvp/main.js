// IMPORTANT: dummy data just for not reading from a file or end point
var basketballRaw = `BASKETBALL
player 1;nick1;4;Team A;G;10;2;7
player 2;nick2;8;Team A;F;0;10;0
player 3;nick3;15;Team A;C;15;10;4
player 4;nick4;16;Team B;G;20;0;0
player 5;nick5;23;Team B;F;4;7;7
player 6;nick6;42;Team B;C;8;10;0`;

var handballRaw = `HANDBALL
player 1;nick1;4;Team A;G;0;20
player 2;nick2;8;Team A;F;15;20
player 3;nick3;15;Team A;F;10;20
player 4;nick4;16;Team B;G;1;25
player 5;nick5;23;Team B;F;12;25
player 6;nick6;42;Team B;F;8;25`;

var rewards = {
    basketball : {
        scored: {
            G: 2,
            F: 2,
            C: 2
        },
        rebounds: {
            G: 3,
            F: 2,
            C: 1
        },
        assists: {
            G: 1,
            F: 2,
            C: 3
        }
    },
    handball : {
        initial: {
            G: 50,
            F: 20
        },
        goalsMade: {
            G: 5,
            F: 1
        },
        goalsReceived: {
            G: -2,
            F: -1
        }
    }
};

var BasketPlayer = function(data, winnerTeam) {
  this.name = data[1] || '';
  this.nickname = data[2] || '';
  this.number = data[3] || '';
  this.team = data[4] || '';
  this.position = data[5] || '';
  this.scored = data[6] * rewards.basketball.scored[data[5]] || null;
  this.rebounds = data[7] * rewards.basketball.rebounds[data[5]] || null;
  this.assists = data[8] * rewards.basketball.assists[data[5]] || null;
  this.extraPoints = winnerTeam.toLowerCase() === data[4].toLowerCase() ? 10 : 0;
  this.totalRating = this.scored + this.rebounds + this.assists + this.extraPoints;
};

var HandballPlayer = function(data, winnerTeam) {
  this.name = data[1] || '';
  this.nickname = data[2] || '';
  this.number = data[3] || '';
  this.team = data[4] || '';
  this.position = data[5] || '';
  this.goalsMade = data[6] * rewards.handball.goalsMade[data[5]] || null;
  this.goalsReceived = data[7] * rewards.handball.goalsReceived[data[5]] || null;
  this.initial = rewards.handball.initial[data[5]] || null;
  this.extraPoints = winnerTeam.toLowerCase() === data[4].toLowerCase() ? 10 : 0;
  this.totalRating = this.goalsMade + this.goalsReceived + this.initial + this.extraPoints;
};

// IMPORTANT: should be a super class called Player and then BasketPlayer and HandballPlayer extend from it

var parseBasketball = function(rawGameFile, winnerTeam) {
  var players = [];
  var m = null;
  var regExPlayer = /^([a-z][^;]*);([^;]+);([^;]+);([^;]+);([^;]+);(\d+);(\d+);(\d+)$/mg;
  while ((m = regExPlayer.exec(rawGameFile)) !== null) {
    var player = new BasketPlayer(m, winnerTeam);
    players.push(player);
  };
  return players;
};

var parseHandball = function(rawGameFile, winnerTeam) {
  var players = [];
  var m = null;
  var regExPlayer = /^([a-z][^;]*);([^;]+);([^;]+);([^;]+);([^;]+);(\d+);(\d+)$/mg;
  while ((m = regExPlayer.exec(rawGameFile)) !== null) {
    var player = new HandballPlayer(m, winnerTeam);
    players.push(player);
  };
  return players;
};

var maxRating = function(list) {
    // IMPORTANT: if two players have the same rating?
    var ratings, maximun, indexOfMax;
    ratings = _.map(list, function (el) {
        return el.globalRating;
    });
    maximun = _.max(ratings);
    indexOfMax = _.findIndex(list, function(el) {
        return el.globalRating === maximun;
    });
    return list[indexOfMax];
};

var twoListInOne = function(listA, listB) {
// IMPORTANT: it works if both lists have the same length
// IMPORTANT: if they don't some players would be missed

    var playersTemp = _.map(listA, function(el) {
        var playerTemp = {};
        var index = _.findIndex(listB, function(ele) {
            return el.name.toLowerCase() === ele.name.toLowerCase();
        });
        playerTemp.name = el.name;
        playerTemp.nickname = el.nickname;
        playerTemp.number = el.number;
        playerTemp.team = el.team;
        playerTemp.position = el.position;
        playerTemp.globalRating = el.totalRating + listB[index].totalRating;
        return playerTemp;
    });
    return playersTemp;
};


var basketPlayersList = parseBasketball(basketballRaw, 'Team A');
var handballPlayersList = parseHandball(handballRaw, 'Team B');
var generalRating = twoListInOne(basketPlayersList, handballPlayersList);
var winnerPlayer = maxRating(generalRating);


/*
TODO:
- I didn't do these two acceptance criterias: The winner team is the one with more scored points & The winner team is the one with more goals made.
- if any bug, no MVP
- BasketPlayer and HandballPlayer should extend from super class Player
- Add methods for calculating point into the class
- what if a two players have the same rating, what should I do?
- refactor twoListInOne() for lists with different lengths
- unit testing for functions
*/
