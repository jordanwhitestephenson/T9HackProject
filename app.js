var database = firebase.database();
var list;
// var admin = require('firebase-admin');
// var db = admin.database();
var refData = database.ref('users');

function writeUserData(name, address, child, phone) {
  console.log("inside writeUserData")
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
      user_children: child,
      user_phone: phone

    });
  });
}


$('.clickme').click(function() {
    $('#form-fields').hide();
    console.log("HEE HAW!!!")
    console.log("children: " + $('#children').val())
  writeUserData($('#hostName').val(), $('#hostAddress').val(), $('#children').val(), $('#hostNumber').val() );
  var node = document.createElement("H2");
  var textnode = document.createTextNode('THANK YOU FOR OPENING YOUR HOME TO US!!');
  node.appendChild(textnode);
  document.getElementById("thankyou").appendChild(node);
    // window.location.href = "thankyou.html";
});








$('.requestHouse').click(function() {

  $('#form-fields').hide();
  var childrenOkay = $('#children').val();
  console.log("chidren:" + childrenOkay)

    refData.on("value",function(snapshot){
      var userHouseData = snapshot.val();
      for (var i =0; i < userHouseData.length; i ++) {
        if(userHouseData[i] !== undefined){
          if (userHouseData[i].user_children === childrenOkay){
            var list = "<tr>" + "<td>" + userHouseData[i].username+ "</td>" +
                   "<td>" + userHouseData[i].user_address + "</td>" + "<td>" + userHouseData[i].user_phone + "</td>" + "</tr>"
                }
                console.log(list);
                $(list).appendTo("#listdata tbody");
                // window.location.href = "list.html";

        }
      }
    })
})



 // , function (errorObject){
 //     console.log("the read failed:" + errorObject.code);
 //   })
