// var express = require('express')
// var app = express()

// var lastUserId = 2;
//
// var users = [
//  {
//    id: 1,
//    name: 'Mike',
//    age: 21,
//  },{
//    id: 2,
//    name: 'Nancy',
//    age: 20,
//  }
// ];

//
// app.get('/user/:userId', function (req, res) {
//   var userId = parseInt(req.params.userId);
//
//   var userName = 'Can\'t find user';
//   users.forEach(function(user) {
//     if (user.id === userId) {
//       userName = user.name;
//     }
//   })
//
//   res.send(`Your username: ${userName}`)
// })


// app.post('/createuser', function(req, res) {
//   var name = req.body.name
//   var age = req.body.age
//
//   var newId = lastUserId + 1;
//   lastUserId = newId;
//
//   var user = {
//     id: newId,
//     name: name,
//     age: age,
//   }
//
//   users.push(user)
//
//   res.send(200)
// })
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })
// })
var database = firebase.database();

function writeUserData(userId, name) {
  firebase.database().ref('users/' + userId).set({
    username: name
  });
}

// document.querySelector('.clickme').addEventListener('click', function() {
//   writeUserData(2, $('#username').val())
// })
$('.clickme').click(function() {
  writeUserData(2, $('#username').val())
})
