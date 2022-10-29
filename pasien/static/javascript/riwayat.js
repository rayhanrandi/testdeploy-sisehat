function homepage() {
  $.ajax({
    type: 'GET',
    url: '/',
  }).done(function(data) {
    window.location = "/";
  });
}

function bikinKeluhan() {
  $.ajax({
    type: 'GET',
    url: '/pasien/keluhan',
  }).done(function(data) {
    window.location = "/pasien/keluhan/";
  });
}
  
function logOut() {
  $.ajax({
    type: 'GET',
    url: '/pasien/log-out/',
  }).done(function(data) {
    window.location = "/";
  });
}
  