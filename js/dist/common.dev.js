"use strict";

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function width() {
  return document.documentElement.clientWidth;
}

function height() {
  return document.documentElement.clientHeight;
}