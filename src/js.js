
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
  var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  if (isDesktop) setMenuIcon(true);
});

function toggleMenu() {
  var sideNav = document.getElementById('sideNav');
  var main = document.getElementById('main');
  if (!sideNav || !main) return;

  var isMobile = !window.matchMedia('(min-width: 1024px)').matches;
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

// Hero canvas – Three.js mosaic dissolve shader
document.addEventListener('DOMContentLoaded', function () {
  var canvases = document.querySelectorAll('.hero-canvas');
  for (var i = 0; i < canvases.length; i++) {
    (function (canvas) {
      var imgUrl = canvas.dataset.heroImage;
      if (!imgUrl || typeof THREE === 'undefined') return;

      // Parse theme color hex to vec3
      var hexColor = canvas.dataset.themeColor || '#0E0A0C';
      var themeR = parseInt(hexColor.slice(1, 3), 16) / 255;
      var themeG = parseInt(hexColor.slice(3, 5), 16) / 255;
      var themeB = parseInt(hexColor.slice(5, 7), 16) / 255;

      var header = canvas.parentElement;
      var w = header.offsetWidth;
      var h = header.offsetHeight;

      var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(window.devicePixelRatio);

      var scene = new THREE.Scene();
      var camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);

      var vertexShader = [
        'varying vec2 vUv;',
        'void main() {',
        '  vUv = uv;',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}'
      ].join('\n');

      var fragmentShader = [
        'precision highp float;',
        '',
        'uniform float uTime;',
        'uniform vec2 uResolution;',
        'uniform sampler2D uTexture;',
        'uniform vec2 uImageSize;',
        'uniform vec2 uMouse;',
        'uniform vec3 uThemeColor;',
        'uniform float uTileSize;',
        'uniform float uScrollSpeed;',
        'uniform float uDotSize;',
        'uniform float uDotDarkness;',
        'uniform float uOverlayOpacity;',
        'varying vec2 vUv;',
        '',
        '// Hash for per-tile phase offset',
        'float hash(vec2 p) {',
        '  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);',
        '}',
        '',
        'void main() {',
        '  vec2 pixel = vUv * uResolution;',
        '  vec2 tileCoord = floor(pixel / uTileSize);',
        '',
        '  // Cursor tile — snap mouse to tile grid, affect 2x2 block',
        '  vec2 mouseTile = floor(uMouse / uTileSize);',
        '  vec2 diff = abs(tileCoord - mouseTile);',
        '  float hover = step(diff.x, 1.0) * step(diff.y, 1.0) * step(0.0, uMouse.x);',
        '',
        '  // Tile center UV for sampling',
        '  vec2 tileCenterUV = (tileCoord + 0.5) * uTileSize / uResolution;',
        '',
        '  // Cover-fit: compute image UV that preserves aspect ratio',
        '  float imgAspect = uImageSize.x / uImageSize.y;',
        '  float canvasAspect = uResolution.x / uResolution.y;',
        '  vec2 coverUV = tileCenterUV;',
        '  if (canvasAspect > imgAspect) {',
        '    float scale = imgAspect / canvasAspect;',
        '    coverUV.y = coverUV.y * scale + (1.0 - scale) * 0.5;',
        '  } else {',
        '    float scale = canvasAspect / imgAspect;',
        '    coverUV.x = coverUV.x * scale + (1.0 - scale) * 0.5;',
        '  }',
        '',
        '  // Tile on x-axis and scroll slowly rightward',
        '  coverUV.x = fract(coverUV.x - uTime * uScrollSpeed);',
        '',
        '  // Sample hero image per tile',
        '  vec3 color = texture2D(uTexture, coverUV).rgb;',
        '',
        '  // Tile-snapped overlays for readability — 6 rows each edge',
        '  float pixelY = tileCoord.y * uTileSize;',
        '  float topRow = floor((uResolution.y - pixelY) / uTileSize);',
        '  float botRow = floor(pixelY / uTileSize);',
        '',
        '  // Top overlay: row 0 (edge) = 0.90, 1 = 0.85, 2 = 0.85, 3 = 0.80, 4 = 0.50, 5 = 0.25',
        '  float topAlpha = 0.0;',
        '  if (topRow < 1.0) topAlpha = 0.90;',
        '  else if (topRow < 2.0) topAlpha = 0.85;',
        '  else if (topRow < 3.0) topAlpha = 0.85;',
        '  else if (topRow < 4.0) topAlpha = 0.80;',
        '  else if (topRow < 5.0) topAlpha = 0.50;',
        '  else if (topRow < 6.0) topAlpha = 0.25;',
        '',
        '  // Bottom overlay: same progression from bottom edge',
        '  float botAlpha = 0.0;',
        '  if (botRow < 1.0) botAlpha = 0.90;',
        '  else if (botRow < 2.0) botAlpha = 0.85;',
        '  else if (botRow < 3.0) botAlpha = 0.85;',
        '  else if (botRow < 4.0) botAlpha = 0.80;',
        '  else if (botRow < 5.0) botAlpha = 0.50;',
        '  else if (botRow < 6.0) botAlpha = 0.25;',
        '',
        '  float overlay = max(topAlpha, botAlpha) * uOverlayOpacity;',
        '  color = mix(color, uThemeColor, overlay);',
        '',
        '  // Per-tile shape + density picked by hash',
        '  float phase = hash(tileCoord);',
        '  float shapeIdx = floor(phase * 4.0);',
        '  float densityIdx = floor(hash(tileCoord + vec2(7.0, 13.0)) * 3.0);',
        '',
        '  // Halftone patterns with 3 density variants each',
        '  vec2 dotUV = mod(pixel, uDotSize) / uDotSize;',
        '  vec2 centered = dotUV - 0.5;',
        '',
        '  // Circle: small / medium / large',
        '  float circleD = length(centered);',
        '  float circleS = smoothstep(0.38, 0.42, circleD);',
        '  float circleM = smoothstep(0.28, 0.32, circleD);',
        '  float circleL = smoothstep(0.18, 0.22, circleD);',
        '',
        '  // Diamond: small / medium / large',
        '  float diamondD = abs(centered.x) + abs(centered.y);',
        '  float diamondS = smoothstep(0.42, 0.46, diamondD);',
        '  float diamondM = smoothstep(0.32, 0.36, diamondD);',
        '  float diamondL = smoothstep(0.20, 0.24, diamondD);',
        '',
        '  // Square: small / medium / large',
        '  float squareD = max(abs(centered.x), abs(centered.y));',
        '  float squareS = smoothstep(0.38, 0.42, squareD);',
        '  float squareM = smoothstep(0.28, 0.32, squareD);',
        '  float squareL = smoothstep(0.18, 0.22, squareD);',
        '',
        '  // Horizontal line: thin / medium / thick',
        '  float hlineD = abs(centered.y);',
        '  float hlineS = smoothstep(0.10, 0.14, hlineD);',
        '  float hlineM = smoothstep(0.20, 0.24, hlineD);',
        '  float hlineL = smoothstep(0.30, 0.34, hlineD);',
        '',
        '  // Vertical line: thin / medium / thick',
        '  float vlineD = abs(centered.x);',
        '  float vlineS = smoothstep(0.10, 0.14, vlineD);',
        '  float vlineM = smoothstep(0.20, 0.24, vlineD);',
        '  float vlineL = smoothstep(0.30, 0.34, vlineD);',
        '',
        '  // Pick shape, then pick density',
        '  float base = circleM;',
        '  if (shapeIdx < 1.0) {',
        '    if (densityIdx < 1.0) base = diamondS;',
        '    else if (densityIdx < 2.0) base = diamondM;',
        '    else base = diamondL;',
        '  } else if (shapeIdx < 2.0) {',
        '    if (densityIdx < 1.0) base = squareS;',
        '    else if (densityIdx < 2.0) base = squareM;',
        '    else base = squareL;',
        '  } else if (shapeIdx < 3.0) {',
        '    if (densityIdx < 1.0) base = hlineS;',
        '    else if (densityIdx < 2.0) base = hlineM;',
        '    else base = hlineL;',
        '  } else {',
        '    if (densityIdx < 1.0) base = vlineS;',
        '    else if (densityIdx < 2.0) base = vlineM;',
        '    else base = vlineL;',
        '  }',
        '',
        '  // Hover: snap to medium circle',
        '  float pattern = mix(base, circleM, hover);',
        '  color *= mix(uDotDarkness, 1.0, pattern);',
        '',
        '  gl_FragColor = vec4(color, 1.0);',
        '}'
      ].join('\n');

      var loader = new THREE.TextureLoader();
      loader.load(imgUrl, function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        var mousePixel = new THREE.Vector2(-9999, -9999);
        var mouseTarget = new THREE.Vector2(-9999, -9999);

        var uniforms = {
          uTime:       { value: 0.0 },
          uResolution: { value: new THREE.Vector2(w, h) },
          uTexture:    { value: texture },
          uImageSize:  { value: new THREE.Vector2(texture.image.width, texture.image.height) },
          uMouse:      { value: mousePixel.clone() },
          uThemeColor: { value: new THREE.Vector3(themeR, themeG, themeB) },
          uTileSize:       { value: 39.0 },
          uScrollSpeed:    { value: 0.002 },
          uDotSize:        { value: 6.0 },
          uDotDarkness:    { value: 0.5 },
          uOverlayOpacity: { value: 1.0 }
        };

        var mat = new THREE.ShaderMaterial({
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          uniforms: uniforms
        });

        var geo = new THREE.PlaneGeometry(1, 1);
        var mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        var startTime = null;

        function animate(time) {
          if (startTime === null) startTime = time;
          var elapsed = (time - startTime) / 1000.0;

          uniforms.uTime.value = elapsed;

          // Smoothly follow cursor
          mousePixel.lerp(mouseTarget, 0.12);
          uniforms.uMouse.value.copy(mousePixel);

          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        canvas._three = {
          renderer: renderer, scene: scene, camera: camera,
          mesh: mesh, material: mat, texture: texture, uniforms: uniforms
        };

        header.addEventListener('mousemove', function (e) {
          var rect = canvas.getBoundingClientRect();
          mouseTarget.set(
            e.clientX - rect.left,
            rect.bottom - e.clientY
          );
        });
        header.addEventListener('mouseleave', function () {
          mouseTarget.set(-9999, -9999);
          mousePixel.set(-9999, -9999);
        });
      });

      window.addEventListener('resize', function () {
        var nw = header.offsetWidth;
        var nh = header.offsetHeight;
        renderer.setSize(nw, nh);
        if (canvas._three) {
          canvas._three.uniforms.uResolution.value.set(nw, nh);
        }
      });
    })(canvases[i]);
  }
});
