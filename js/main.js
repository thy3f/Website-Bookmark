// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
document.getElementById('myFolderForm').addEventListener('submit', saveFolder);

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;
  var folderId = document.getElementById('foldersResults').value;

  console.log(folderId);

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

    if (!folder)
      folderHolder = '';
    else
      folderHolder = '- ' +folder;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+' ' +folderHolder+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
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
    alert('Please use a valid URL');
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

function fetchFolders(){
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

function validateNewFolderForm(folderName){
  if(!folderName){
    alert('Please fill in the form');
    return false;
  }
  return true;
}
