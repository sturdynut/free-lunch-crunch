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

    var imgs = '', i = 0, indexCookieRegex = new RegExp(indexCookieName + '=(.*?)(?:;|$)');

    // ** set cookies **
    for(i = 0; i < cookies.length; i++) {
      // write each cookie
      document.cookie = cookies[i].name + '=' + cookies[i].value + ';max-age=' + cookies[i].maxAge;
    }

    // ** drop zee pixels **
    // determine next drop index to use
    var nextDropIndex = indexCookieRegex.test(document.cookie) ? parseInt(document.cookie.match(indexCookieRegex)[1]) + 1 : 0;
    // if the next drop index is within the array
    pixels = pixels.slice(nextDropIndex, (nextDropIndex + maxDrops < pixels.length ? nextDropIndex + maxDrops : pixels.length));

    var pixelsLength = pixels.length;
    if (pixelsLength === 0) { return }

    document.cookie = indexCookieName + '=' + (pixelsLength - 1);
    while(pixelsLength--) {
      document.body.insertAdjacentHTML('beforeend', "<img style='display:none' src='_x_' />".replace(/_x_/, pixels[pixelsLength]));
    }
  });
})();
