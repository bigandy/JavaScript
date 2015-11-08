if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/app/js/service-worker.js', {
    scope: '/app/'
  }).then(function(sw) {
  	console.log('Service Worker Worked!');
    // registration worked!
  }).catch(function() {
  	console.log('Service Worker Failed!');
    // registration failed :(
  });
}
