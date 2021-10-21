var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

var createElement  = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.setAttribute("class", className);
  if (text) {
    element.textContent = text
  }

  return element;
}

let getYoutubeVideoLink = function (videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`
}

let getYoutubeBigThumbnail = function (videoId) {
  return `http://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`
}

let getYoutubeThumbnail = function (videoId) {
  return `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`
}