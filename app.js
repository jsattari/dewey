/* eslint-disable require-jsdoc */

// array to hold bookmarks and urls
const allBookmarks = {};

/* load all bookmarks on open */
document.addEventListener('DOMContentLoaded', function() {
  function getBookmarks(parentNode) {
    parentNode.forEach(function(bookmark) {
      if (! (bookmark.url === undefined || bookmark.url === null)) {
        allBookmarks[bookmark.title] = bookmark.url;
      }
      if (bookmark.children) {
        getBookmarks(bookmark.children);
      }
    });
  }

  // execute getBookmarks func on bookmark Tree
  chrome.bookmarks.getTree(function(rootNode) {
    getBookmarks(rootNode);
  });

  const bmList = document.getElementById('bmList');

  for (const key in allBookmarks) {
    if (! (key === undefined || key === null)) {
      const li = document.createElement('li');
      li.innerHTML = '<a href="' + allBookmarks[key] + '">' + key + '</a>';
      bmList.appendChild(li);
    }
  }
});

document.addEventListener('keydown', function() {
  const input = document.getElementById('searchInput').value;
  const bmList = document.getElementById('bmList');

  function filterBookmarks() {
    for (const key in allBookmarks) {
      if (key.indexOf(input) > -1) {
        const li = document.createElement('li');
        li.innerHTML = '<a href="' + allBookmarks[key] + '">' + key + '</a>';
        bmList.appendChild(li);
      }
    };
  }

  filterBookmarks();
});
