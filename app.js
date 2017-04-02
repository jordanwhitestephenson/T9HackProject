var database = firebase.database();
var list;
// var admin = require('firebase-admin');
// var db = admin.database();
var refData = database.ref('users');


function myFunction() {
    document.getElementById("findPlaces").classList.toggle("show");
}

function writeUserData(name, address, child, phone) {

  console.log("inside writeUserData");
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var userId;
    if (snapshot.val()) {
      userId = Object.keys(snapshot.val()).length + 1;
      console.log('number of users in database:', Object.keys(snapshot.val()).length);
      console.log('adding user with userId:', Object.keys(snapshot.val()).length + 1);
    }
    else {
      userId = 1;
      console.log('no users in database, setting userId to 1');
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
  writeUserData($('#hostName').val(), $('#hostAddress').val(), $('#children').val(), $('#hostNumber').val() );
  var node = document.createElement("H2");
  var textnode = document.createTextNode('THANK YOU FOR OPENING YOUR HOME TO US!!');
  node.appendChild(textnode);
  document.getElementById("thankyou").appendChild(node);
});








$('.requestHouse').click(function() {
  var cnt = 0;
  $('#form-fields').hide();
  var childrenOkay = $('#children').val();

    refData.on("value",function(snapshot){
      var userHouseData = snapshot.val();
      for (var i = 0; i < userHouseData.length; i ++) {
        if(cnt === 0){
          var tablehead = "<th>" + "---"+ "</th>" +
               "<th>" + "Name" + "</th>"+ "<th>" + "Address" + "</th>" + "<th>" + "Phone Number" + "</th>" + "</tr>"
               console.log("Tablehead" + tablehead)
               $(tablehead).appendTo("#listdata23 thead");
        }
        if(userHouseData[i] !== undefined){
          if (userHouseData[i].user_children === childrenOkay){
            cnt=1;
             var list = "<tr>" + "<th scope='row'>" + "*" +  "<td>" + userHouseData[i].username+ "</td>" + "<td>" + userHouseData[i].user_address + "</td>" + "<td>" + userHouseData[i].user_phone + "</td>" + "</tr>"

             console.log("List" + list)
              $(list).appendTo("#listdata23 tbody");
          }
        }
      }
    });
});

