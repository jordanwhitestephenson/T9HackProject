var database = firebase.database();
// var admin = require('firebase-admin');
// var db = admin.database();
var refData = database.ref('users');

function writeUserData(name, address, child) {
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var userId;
    if (snapshot.val()) {
      userId = Object.keys(snapshot.val()).length + 1;
      console.log('number of users in database:', Object.keys(snapshot.val()).length)
      console.log('adding user with userId:', Object.keys(snapshot.val()).length + 1)
    }
    else {
      userId = 1;
      console.log('no users in database, setting userId to 1')
    }
    firebase.database().ref('users/' + userId).set({
      username: name,
      user_address: address,
      user_children: child

    });
  });
}


$('.clickme').click(function() {
  writeUserData($('#hostName').val(), $('#hostAddress').val(), $('#children').val());
});


$('.requestHouse').click(function() {
var childrenOkay = $('#children').val();
console.log(childrenOkay)

  refData.on("value",function(snapshot){
    // console.log(snapshot.val());
    var userHouseData = snapshot.val();
    for (var i =0; i < userHouseData.length; i ++) {
      console.log(userHouseData)
      if(userHouseData[i] !== undefined){
      if (userHouseData[i].user_children === childrenOkay){
        console.log("were at the if statement")
        console.log(userHouseData[i].user_children)
      }
    }
  }
}, function (errorObject){
    console.log("the read failed:" + errorObject.code);
  });
});
