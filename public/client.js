var socket = io();

var connectionCount = document.getElementById('connection-count');
var voteCount = document.getElementById('vote-count');
var statusMessage = document.getElementById('status-message');
var userVote = document.getElementById('user-vote');
var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCount', function (votes) {
  results = ""
  for (var vote in votes) {
    results = results + vote + ": " + votes[vote] + "  "
  }
  voteCount.innerText = results
});

socket.on('userVote', function (message) {
  userVote.innerText = 'Your current vote is: ' + message
})

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});
