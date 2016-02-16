$(function () {

  $('#instruction').affix({
    offset: {
      top: 3243,
      bottom: 1600
    }
  });

  $('#manager-nav').affix({
    offset: {
      top: 1020,
      bottom: 5000
    }
  });

});

$(document).ready(function() {
  $("#carousel").swiperight(function() {
    $(this).carousel('prev');
  });
  $("#carousel").swipeleft(function() {
    $(this).carousel('next');
  });
});