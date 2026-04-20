
// Set --nav-height CSS variable from actual nav size
(function () {
  function setNavHeight() {
    var nav = document.getElementById('topNav');
    if (nav) {
      document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');
    }
  }
  document.addEventListener('DOMContentLoaded', setNavHeight);
  window.addEventListener('resize', setNavHeight);
})();

// Initialize Splide carousels
document.addEventListener('DOMContentLoaded', function () {
  var splides = document.querySelectorAll('.splide');
  for (var i = 0; i < splides.length; i++) {
    new Splide(splides[i]).mount(window.splide && window.splide.Extensions ? window.splide.Extensions : {});
  }
});

// Menu toggle — works on both mobile and desktop
function setMenuIcon(isOpen) {
  var eyeL  = document.getElementById('menu-eye-l');
  var eyeR  = document.getElementById('menu-eye-r');
  var mouth = document.getElementById('menu-mouth');
  if (!eyeL || !eyeR || !mouth) return;

  if (isOpen) {
    eyeL.setAttribute('d',  'M10 0H4V6H10V0Z');
    eyeR.setAttribute('d',  'M18 0H12V6H18V0Z');
    mouth.setAttribute('d', 'M22 6C18.1739 10.6273 3.82609 10.6273 0 6V11.5295C3.82609 16.1568 18.1739 16.1568 22 11.5295V6Z');
  } else {
    eyeL.setAttribute('d',  'M11 0H0V5H11V0Z');
    eyeR.setAttribute('d',  'M22 0H11V5H22V0Z');
    mouth.setAttribute('d', 'M22 10H0V15H22V10Z');
  }
}

function animateMenuIcon(isOpen) {
  var eyeL  = document.getElementById('menu-eye-l');
  var eyeR  = document.getElementById('menu-eye-r');
  var mouth = document.getElementById('menu-mouth');
  if (!eyeL || !eyeR || !mouth) return;

  var duration = 250;
  if (isOpen) {
    eyeL.animate( [{ d: 'path("M11 0H0V5H11V0Z")' },  { d: 'path("M10 0H4V6H10V0Z")' }],  { duration: duration, fill: 'forwards' });
    eyeR.animate( [{ d: 'path("M22 0H11V5H22V0Z")' },  { d: 'path("M18 0H12V6H18V0Z")' }], { duration: duration, fill: 'forwards' });
    mouth.animate([{ d: 'path("M22 10H0V15H22V10Z")' }, { d: 'path("M22 6C18.1739 10.6273 3.82609 10.6273 0 6V11.5295C3.82609 16.1568 18.1739 16.1568 22 11.5295V6Z")' }], { duration: duration, fill: 'forwards' });
  } else {
    eyeL.animate( [{ d: 'path("M10 0H4V6H10V0Z")' },  { d: 'path("M11 0H0V5H11V0Z")' }],  { duration: duration, fill: 'forwards' });
    eyeR.animate( [{ d: 'path("M18 0H12V6H18V0Z")' },  { d: 'path("M22 0H11V5H22V0Z")' }], { duration: duration, fill: 'forwards' });
    mouth.animate([{ d: 'path("M22 6C18.1739 10.6273 3.82609 10.6273 0 6V11.5295C3.82609 16.1568 18.1739 16.1568 22 11.5295V6Z")' }, { d: 'path("M22 10H0V15H22V10Z")' }], { duration: duration, fill: 'forwards' });
  }
}

// Set correct icon state on load (menu is open by default on desktop)
document.addEventListener('DOMContentLoaded', function () {
  var isDesktop = window.matchMedia('(min-width: 768px)').matches;
  if (isDesktop) setMenuIcon(true);
});

function toggleMenu() {
  var sideNav = document.getElementById('sideNav');
  var main = document.getElementById('main');
  if (!sideNav || !main) return;

  var isMobile = !window.matchMedia('(min-width: 768px)').matches;
  if (isMobile) {
    sideNav.classList.toggle('active');
  } else {
    sideNav.classList.toggle('closed');
    main.classList.toggle('expanded');
  }

  var isOpen = isMobile ? sideNav.classList.contains('active') : !sideNav.classList.contains('closed');
  animateMenuIcon(isOpen);
}

// Logo scrub – interactive Lottie that travels between two static SVG endpoints
// Expects markup with ids: logo-scrub, logo-left, logo-lottie, logo-player, logo-right
document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('logo-scrub');
  if (!container) return;

  var wrapper   = document.getElementById('logo-lottie');
  var player    = document.getElementById('logo-player');
  var leftCol   = document.getElementById('logo-left');
  var rightCol  = document.getElementById('logo-right');
  if (!wrapper || !player || !leftCol || !rightCol) return;

  var totalFrames     = 0;
  var ready           = false;
  var raf             = null;
  var targetProgress  = 0;
  var currentProgress = 0;
  var hovering        = false;

  // Size the Lottie wrapper to match the SVG image height, preserving Lottie aspect ratio
  function sizeAndPosition() {
    var leftImg = leftCol.querySelector('img');
    if (!leftImg) return;

    var imgH    = leftImg.offsetHeight;
    var canvas  = player.shadowRoot && player.shadowRoot.querySelector('canvas');
    var ar      = (canvas && canvas.width && canvas.height) ? canvas.width / canvas.height : 1;
    var w       = Math.round(imgH * ar);

    wrapper.style.width  = w + 'px';
    wrapper.style.height = imgH + 'px';

    if (canvas) {
      canvas.style.width  = w + 'px';
      canvas.style.height = imgH + 'px';
    }
  }

  // Compute the left-x positions where the Lottie centers over each endpoint image
  function getEndpoints() {
    var cRect    = container.getBoundingClientRect();
    var leftImg  = leftCol.querySelector('img');
    var rightImg = rightCol.querySelector('img');
    var lRect    = leftImg.getBoundingClientRect();
    var rRect    = rightImg.getBoundingClientRect();
    var half     = wrapper.offsetWidth / 2;

    return {
      leftX:  (lRect.left + lRect.width  / 2) - cRect.left - half,
      rightX: (rRect.left + rRect.width  / 2) - cRect.left - half
    };
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function applyProgress(progress) {
    if (!ready) return;
    progress = clamp(progress, 0, 1);

    var ep      = getEndpoints();
    var xOffset = ep.leftX + progress * (ep.rightX - ep.leftX);

    var leftImg = leftCol.querySelector('img');
    var cRect   = container.getBoundingClientRect();
    var iRect   = leftImg.getBoundingClientRect();
    var yOffset = (iRect.top + iRect.height / 2) - cRect.top - wrapper.offsetHeight / 2;

    wrapper.style.left = xOffset + 'px';
    wrapper.style.top  = yOffset + 'px';

    player.dotLottie.setFrame(Math.round(progress * (totalFrames - 1)));
  }

  // Lerp loop for smooth animation
  function tick() {
    var diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.001) {
      currentProgress += diff * 0.15;
      applyProgress(currentProgress);
    }
    raf = requestAnimationFrame(tick);
  }

  function setHover(active) {
    if (hovering === active) return;
    hovering = active;
    leftCol.style.opacity  = active ? '0.25' : '1';
    rightCol.style.opacity = active ? '0.25' : '1';
    wrapper.style.opacity  = active ? '1'    : '0';
  }

  // Wait for the dotlottie-wc custom element and its inner dotLottie instance
  function initPlayer() {
    if (!player.dotLottie) { setTimeout(initPlayer, 100); return; }

    function onReady() {
      totalFrames = player.dotLottie.totalFrames;
      ready = true;
      sizeAndPosition();
      applyProgress(0);
      raf = requestAnimationFrame(tick);
    }

    player.dotLottie.addEventListener('load', onReady);
    if (player.dotLottie.totalFrames > 0) onReady();
  }

  player.addEventListener('load', function () { initPlayer(); });
  initPlayer();

  window.addEventListener('resize', function () {
    if (ready) { sizeAndPosition(); applyProgress(currentProgress); }
  });

  // Desktop: mouse-driven scrub
  container.addEventListener('mouseenter',  function ()  { setHover(true); });
  container.addEventListener('mouseleave',  function ()  { setHover(false); });
  container.addEventListener('mousemove',   function (e) {
    var rect = container.getBoundingClientRect();
    targetProgress = clamp((e.clientX - rect.left) / rect.width, 0, 1);
  });

  // Mobile: scroll-driven scrub
  if (window.matchMedia('(hover: none)').matches) {
    setHover(true);
    function onScroll() {
      var rect = container.getBoundingClientRect();
      var viewH = window.innerHeight;
      targetProgress = clamp((viewH - rect.top) / (viewH + rect.height), 0, 1);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
