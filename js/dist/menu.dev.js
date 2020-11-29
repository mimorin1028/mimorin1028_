"use strict";

(function () {
  var divSwitch = document.querySelector('.menu_switch');
  var ulNav = document.querySelector('.menu_nav');
  divSwitch.addEventListener('click', function () {
    divSwitch.classList.toggle("menu_switch--expand");
    ulNav.classList.toggle("menu_nav--expand");
  });
})();