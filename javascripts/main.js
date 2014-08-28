$(document).ready(function() {
  $('#tab-container').easytabs();
  load_data();
  
  $("#search_button").click( function() {
    var name = $("#person").val();
    render_person(name);
  });
});

var personnel_db = [];
var travel_db = [];
var time_and_attendance_db = [];

var load_data = function() {

  $.ajax({
    url: "official.json",
    context: document.body,
    datatype: "json",
    error: function(request, status, error) {
      alert("response text"+request.responseText);
      alert("status"+status);
      alert("error"+error);
    }
  }).done(function(persons) {
    personnel_db = persons;
  });
  
  $.ajax({
    url: "time_and_attendance.json",
    context: document.body,
    datatype: "json",
    error: function (request, status, error) {
      alert("response text"+request.responseText);
      alert("status"+status);
      alert("error"+error);
    }
  }).done(function(t_a) {
    time_and_attendance_db = t_a;
  });

  $.ajax({
    url: "travel.json",
    context: document.body,
    datatype: "json",
    error: function (request, status, error) {
      alert("response text"+request.responseText);
      alert("status"+status);
      alert("error"+error);
    }
  }).done(function( travels) {
    travel_db = travels;
  });

};

var find_named_object = function(name,array) {
  var array_length = array.length;
  for (var i = 0; i < array_length; i++) {
    if (array[i].name === name) {
       return array[i];
    }
  }
  alert("whoa, can't find:"+name);
  return null;
};

var render_person = function(name) {
  var person = find_named_object(name, personnel_db);
  var travel = find_named_object(name, travel_db);
  var t_a = find_named_object(name, time_and_attendance_db);

  $("#name").html(person.name);
  $("#rank").html(person.rank);
  $("#profession").html(person.profession);

  $("#vacation").html(t_a.vacation);
  $("#trip0").html(JSON.stringify(travel.trips[0]));
};
    
