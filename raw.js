(function() {
  // Make it async (non blocking)
  setTimeout(function() {
    // GIVEN INFORMATION
    var pixels = [
      'http://www.google.com/s2/favicons?domain=facebook.com',
      'http://www.google.com/s2/favicons?domain=plus.google.com',
      'http://www.google.com/s2/favicons?domain=twitter.com',
      'http://www.google.com/s2/favicons?domain=isntagram.com'
    ];
    var cookies = [
      {name: 'cookie1', value: 'I like Tutles!', maxAge: 432000},
      {name: 'cookie2', value: 'I like money too, we should be friends.'}
    ];
    var indexCookieName = '_b9553c4_lpdi';
    var maxDrops = 5;
    // END GIVEN

    // ** set cookies **
    for(var i = 0; i < cookies.length; i++) {
      // write each cookie
      document.cookie = cookies[i].name + '=' + cookies[i].value + ';max-age=' + cookies[i].maxAge;
    }

    // ** drop zee pixels **
    // determine next drop index to use
    var nextDropIndex = (~~document.cookie.match(new RegExp(indexCookieName + '=(.*?)(?:;|$)')) | 0)[1] | 0;
    // if the next drop index is within the array
    pixels = pixels.slice(nextDropIndex, (nextDropIndex + maxDrops < pixels.length ? nextDropIndex + maxDrops : pixels.length));

    if (pixels.length > 0)
    {
      document.cookie = indexCookieName + '=' + (pixels.length - 1);
      for(i = 0; i < pixels.length; i++) {
        document.body.insertAdjacentHTML('beforeend', "<img style='display:none' src='" + pixels[i] + "' />");
      }
    }
  });
})();
