// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
document.getElementById('myFolderForm').addEventListener('submit', saveFolder);

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;
  var folderId = document.getElementById('foldersResults').value;

  if(!siteName){
    siteName = siteUrl;
  }

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
    folder: folderId
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
// function fetchBookmarks(){
//
//   // Get bookmarks from localStorage
//   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//   var folders = JSON.parse(localStorage.getItem('folders'));
//
//   // Get output id
//   var bookmarksResults = document.getElementById('bookmarksResults');
//
//   // Build output
//   bookmarksResults.innerHTML = '';
//   for(var i = 0; i < bookmarks.length; i++){
//     var name = bookmarks[i].name;
//     var url = bookmarks[i].url;
//     var folder = folders[bookmarks[i].folder];
//
//     if (!folder)
//       folderHolder = '';
//     else
//       folderHolder = '- ' +folder;
//
//     bookmarksResults.innerHTML += '<div class="well">'+
//                                   '<h3>'+name+' ' +folderHolder+
//                                   ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
//                                   ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
//                                   '</h3>'+
//                                   '</div>';
//   }
// }

function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var folders = JSON.parse(localStorage.getItem('folders'));

  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    var folder = folders[bookmarks[i].folder];

    bookmarksResults.innerHTML += '<li class="list-group-item clearfix">'+
                                  '<span class="glyphicon glyphicon-book"></span>'+
                                  '   '+name+' - ' +folder+
                                  '<span class="pull-right">'+
                                  ' <a class="btn btn-info" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-warning" href="#">'+
                                  '   <span class="glyphicon glyphicon-trash"></span>'+
                                  '</a> ' +
                                  '</span>'+
                                  '</li>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL.');
    return false;
  }

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (bookmarks.findIndex(i => i.name.toUpperCase() === siteName.toUpperCase()) !== -1){
    alert('Duplicate Bookmark name. Please chose another name.');
    return false;
  }

  if(bookmarks.findIndex(i => i.url.toUpperCase() === siteUrl.toUpperCase()) !== -1){
    alert('Duplicate Bookmark URL.');
    return false;
  }

  return true;
}

// Save Folder
function saveFolder(){
  // Get form values
  var folderName = document.getElementById('newFolderName').value;

  //TODO Implement validateNewFolderForm
  if (!validateNewFolderForm(folderName)){
    return false;
  }

  if(localStorage.getItem('folders') ===null){
    // Init Array
    var folders = [];
    // Add to array
    folders.push(folderName);
    // Set to localStorage
    localStorage.setItem('folders', JSON.stringify(folders));
  }  else {
    // Get bookmarks from localStorage
    var folders = JSON.parse(localStorage.getItem('folders'));
    // Add to array
    folders.push(folderName);
    // Re-Set back to localStorage
    localStorage.setItem('folders', JSON.stringify(folders));
  }

  // Clear Folders form
  document.getElementById('myFolderForm').reset();

  // Re-fetch folders
  fetchFolders();
}

// Fetch Folders
function fetchFolders(){
  if(localStorage.getItem('folders') === 'null'){
    folders.push("Home");
    localStorage.setItem('folders', JSON.stringify(folders));
  }

  // Get folders from localStorage
  var folders = JSON.parse(localStorage.getItem('folders'));
  // Get output id
  var foldersResults = document.getElementById('foldersResults');

  // Build output
  foldersResults.innerHTML = '';
  for (var i=0; i<folders.length; i++){
    var folder = folders[i];

    if (!folder){
      folderHolder = 'Home';
    }
    else {
      folderHolder = folder;
    }
    foldersResults.innerHTML += '<option value="'+i+'">'+folderHolder+'</option>';
  }
}

// Validate new folder form
function validateNewFolderForm(folderName){
  if(!folderName){
    alert('Please fill in the form');
    return false;
  }

  var folders = JSON.parse(localStorage.getItem('folders'));
  if (folders.findIndex(i => i.toUpperCase() === folderName.toUpperCase()) !== -1){
    alert('Duplicate Folder name. Please chose another name.');
    return false;
  }

  return true;
}

// Make menu element active/inactive
function changeByClick(index){
  var links = document.getElementsByClassName("nav navbar-nav")[0].children;
  for (var i=0; i<links.length; i++){
    links[i].attributes.class.value = "inactive";
  }
  links[index].attributes.class.value = "active";

  // Make element visible
  displayArea(index);

}

// Make areas visible accordingly to selected menu item
function displayArea(index){
  switch(Number(index)){
    case 0:
      //make Login visible
      document.getElementById("newBookmarkForm").style = "display: none;";
      document.getElementById("bookmarksList").style = "display: none;";
      document.getElementById("createFolderForm").style = "display: none;";
      break;
    case 1:
      //make Bookmarks visible
      document.getElementById("newBookmarkForm").style = "displayed";
      document.getElementById("bookmarksList").style = "displayed";
      document.getElementById("createFolderForm").style = "display: none;";
      break;
    case 2:
      //make Folders visible
      document.getElementById("newBookmarkForm").style = "display: none;";
      document.getElementById("bookmarksList").style = "display: none;";
      document.getElementById("createFolderForm").style = "display";
      break;
  }
}

// Initialize function to populate website when accessed
function initialize(){
  if(localStorage.getItem('folders') === null){
    var folders = [];
    var folder = "Home";
    folders.push(folder);
    localStorage.setItem('folders', JSON.stringify(folders));
  }

  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];

    var bookmark = {
      name: "Example",
      url: "http://example.com",
      folder: 0
    }

    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  fetchBookmarks();
  fetchFolders();
}

// Get input element
let filterInput = document.getElementById('filterInput');
// Add event listener
filterInput.addEventListener('keyup', filterBookmarks);

function filterBookmarks(){
  // Get value of input
  let filterValue = document.getElementById('filterInput').value.toUpperCase();

  // Get names ul
  let ul = document.getElementById('bookmarksResults');
  // Get lis from ul
  let li = ul.querySelectorAll('li.list-group-item');

  // Loop through collection-item lis
  for(let i = 0;i < li.length;i++){
    let text = li[i].childNodes[1].data;
    // If matched
    if(text.toUpperCase().indexOf(filterValue) > -1){
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
