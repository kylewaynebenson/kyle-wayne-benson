
// Side nav animation
function sideNav() {
  var sideNav = document.querySelector("#sideNav");
  var main = document.querySelector("#main");
  sideNav.classList.toggle('active');
  main.classList.toggle('active');
}
window.addEventListener("load", () => {
  // Menu active status
  //if (window.localStorage.getItem('sidebar') === 'active') {
  //  var x = document.getElementById("sideNav");
  //  var main = document.getElementById("main");
  //  x.classList.add("active");
  //  main.classList.add("active");
  //}
  // Page load animation
 document.querySelector("body").classList.add("loaded");
});
