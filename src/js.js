function fullscreen() {
  var x = document.getElementById("worknav");
  if (x.style.width === "0px") {
    x.style.width = "auto";
    x.style.opacity = "100%";
  } else {
    x.style.width = "0px";
    x.style.opacity = "0%";
  }
}
