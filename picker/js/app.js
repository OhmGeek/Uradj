window.URADJ = {}

document.addEventListener('init', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller.
  if (URADJ.controllers.hasOwnProperty(page.id)) {
    URADJ.controllers[page.id](page);
  }
});
