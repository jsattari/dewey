/* eslint-disable require-jsdoc */

/* load all bookmarks on open */
document.addEventListener('DOMContentLoaded', function() {
  /*
      Loop through nodes of bookmarks data structure. If
      node does not contain undefined/null values for urls,
      then create a row of data for the title/url. Else,
      traverse from parent to child node.
    */
  function getBookmarks(parentNode) {
    parentNode.forEach(function(bookmark) {
      // get element of div that will hold potential list
      const bmList = document.getElementById('div-1');
      if (! (bookmark.url === undefined || bookmark.url === null)) {
        const tr = document.createElement('tr');
        // eslint-disable-next-line max-len
        tr.innerHTML = '<a href="' + bookmark.url + '" target="blank" rel="noreferrer noopener">' + bookmark.title + '</a>';
        bmList.appendChild(tr);
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
});

// get element of search input
const inputBox = document.getElementById('searchInput');

/*
  Listen for change in input element. Get text input, element of
  table that holds bookmarks, and individual rows.
  Hide anything that is not related to the input
*/
inputBox.addEventListener('input', (event) => {
  event.preventDefault();
  const textInput = event.target.value;
  const bmList = document.getElementById('div-1');
  const bmRows = bmList.getElementsByTagName('tr');
  for (i = 0; i < bmRows.length; i++) {
    link = bmRows[i].getElementsByTagName('a')[0];
    textValue = link.textContent || link.innerText;
    if (textValue.toUpperCase().indexOf(textInput.toUpperCase()) > -1) {
      // don't hide
      bmRows[i].style.display = '';
    } else {
      // hide
      bmRows[i].style.display = 'none';
    }
  }
});
