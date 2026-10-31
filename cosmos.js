/**
 * CosmosEngine - Animated Background Engine for Esquizofrenia Estelar
 * Theme: Deep Cosmos & Matrioshka Brain with Matrix Data Filaments
 * 
 * Features:
 * - Multi-layered starfield with parallax depth and subtle constellation filaments
 * - Deep space nebula radial gradients and rotating Matrioshka / Dyson sphere reticle
 * - Subtle vertical Matrix data streams with glyph mutation and glowing head particles
 * - Reading mode auto-pause to eliminate CPU/GPU drain and reading distraction
 * - Manual pause toggle for user accessibility
 * - Full prefers-reduced-motion support
 * - Dynamic theme and configuration updates in real time
 */
(function (global) {
  'use strict';

  // Matrix character glyph pool: Katakana, hex, astronomical/mathematical runes, binary
  var GLYPH_CHARS = '01ƎΛΔΩΨΣΞΠ∷⊹0123456789ABCDEFｱｶｻﾀﾅﾊﾏﾔﾗﾜｲｷｼﾁﾆﾋﾐﾘｳｸｽﾂﾇﾌﾑﾕﾙｴｹｾﾃﾈﾍﾒﾚｵｺｿﾄﾉﾎﾓ◇◈';

  var DEFAULT_CONFIG = {
    bgPrimary: '#050609',
    bgSecondary: '#0b0e16',
    bgSurface: 'rgba(12, 17, 26, 0.82)',
    textPrimary: '#e6edf5',
    textSecondary: '#8b9bb4',
    accentPrimary: '#e6a817',
    accentSecondary: '#00f0ff',
    matrixGlow: '#00ff9d',
    border: 'rgba(230, 168, 23, 0.28)',
    starCount: 150,
    matrixStreamCount: 32,
    speed: 0.45,
    nebulaOpacity: 0.35,
    matrixOpacity: 0.22,
    pauseOnReading: true,
    fontMono: "'JetBrains Mono', 'Space Mono', 'Courier New', monospace"
  };

  // Helper: parse hex or rgba string and apply custom alpha
  function colorWithAlpha(colorStr, alpha) {
    if (!colorStr) {
      return 'rgba(255, 255, 255, ' + alpha + ')';
    }
    colorStr = String(colorStr).trim();
    if (colorStr.charAt(0) === '#') {
      var hex = colorStr.slice(1);
      if (hex.length === 3) {
        hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
      }
      var num = parseInt(hex, 16);
      if (isNaN(num)) {
        return 'rgba(255, 255, 255, ' + alpha + ')';
      }
      var r = (num >> 16) & 255;
      var g = (num >> 8) & 255;
      var b = num & 255;
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
    if (colorStr.indexOf('rgb') === 0) {
      var parts = colorStr.match(/[\d.]+/g);
      if (parts && parts.length >= 3) {
        return 'rgba(' + parts[0] + ', ' + parts[1] + ', ' + parts[2] + ', ' + alpha + ')';
      }
    }
    return colorStr;
  }

  function CosmosEngineController() {
    this.canvas = null;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    this.dpr = 1;

    this.config = Object.assign({}, DEFAULT_CONFIG);

    this.animId = null;
    this.isPaused = false;
    this.isManuallyPaused = false;
    this.pauseReason = null;
    this.prefersReducedMotion = false;

    this.stars = [];
    this.matrixStreams = [];
    this.dysonAngle = 0;

    this._onResize = this._handleResize.bind(this);
    this._onVisibilityChange = this._handleVisibilityChange.bind(this);
    this._onMotionQueryChange = this._handleMotionQueryChange.bind(this);
    this._frameBound = this._renderFrame.bind(this);

    this._resizeDebounceTimer = null;
    this._motionMediaQuery = null;
    this.isInitialized = false;
  }

  CosmosEngineController.prototype.init = function (canvasElement, options) {
    if (options && typeof options === 'object') {
      this.updateConfig(options);
    }

    // Resolve or create canvas
    if (typeof canvasElement === 'string' && typeof document !== 'undefined' && typeof document.querySelector === 'function') {
      this.canvas = document.querySelector(canvasElement);
    } else if (canvasElement && canvasElement.nodeType === 1) {
      this.canvas = canvasElement;
    }

    if (!this.canvas && typeof document !== 'undefined' && typeof document.getElementById === 'function') {
      this.canvas = document.getElementById('cosmos-canvas');
    }

    if (!this.canvas && typeof document !== 'undefined' && typeof document.createElement === 'function') {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'cosmos-canvas';
      this.canvas.setAttribute('aria-hidden', 'true');
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '0';
      this.canvas.style.display = 'block';
      if (document.body) {
        document.body.insertBefore(this.canvas, document.body.firstChild);
      }
    }

    if (!this.canvas) {
      return this;
    }

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      return this;
    }

    // Motion preference detection
    if (typeof window !== 'undefined' && window.matchMedia) {
      this._motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.prefersReducedMotion = this._motionMediaQuery.matches;
      if (this._motionMediaQuery.addEventListener) {
        this._motionMediaQuery.addEventListener('change', this._onMotionQueryChange);
      } else if (this._motionMediaQuery.addListener) {
        this._motionMediaQuery.addListener(this._onMotionQueryChange);
      }
    }

    // Window resize & visibility listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this._onResize, { passive: true });
      document.addEventListener('visibilitychange', this._onVisibilityChange);
    }

    this.resize();
    this._initElements();
    this.isInitialized = true;

    if (this.prefersReducedMotion) {
      this.pause('reduced-motion');
      this._drawSingleFrame();
    } else {
      this.start();
    }

    return this;
  };

  CosmosEngineController.prototype.resize = function () {
    if (!this.canvas) return;

    var w = window.innerWidth || document.documentElement.clientWidth || 800;
    var h = window.innerHeight || document.documentElement.clientHeight || 600;

    this.width = w;
    this.height = h;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }
  };

  CosmosEngineController.prototype._handleResize = function () {
    var self = this;
    if (this._resizeDebounceTimer) {
      clearTimeout(this._resizeDebounceTimer);
    }
    this._resizeDebounceTimer = setTimeout(function () {
      self.resize();
      self._realignElements();
      if (self.isPaused) {
        self._drawSingleFrame();
      }
    }, 120);
  };

  CosmosEngineController.prototype._handleVisibilityChange = function () {
    if (document.hidden) {
      if (!this.isPaused) {
        this._stopLoop();
      }
    } else {
      if (!this.isPaused && !this.isManuallyPaused && !this.prefersReducedMotion) {
        this._startLoop();
      }
    }
  };

  CosmosEngineController.prototype._handleMotionQueryChange = function (e) {
    this.prefersReducedMotion = !!(e && e.matches);
    if (this.prefersReducedMotion) {
      this.pause('reduced-motion');
      this._drawSingleFrame();
    } else if (this.pauseReason === 'reduced-motion') {
      this.resume('reduced-motion');
    }
  };

  CosmosEngineController.prototype._initElements = function () {
    this._initStars();
    this._initMatrixStreams();
  };

  CosmosEngineController.prototype._initStars = function () {
    var count = this.config.starCount || 150;
    this.stars = [];
    var colorKeys = ['textPrimary', 'accentPrimary', 'accentSecondary', 'textPrimary'];

    for (var i = 0; i < count; i++) {
      var z = 0.15 + Math.random() * 0.85;
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        z: z,
        baseRadius: 0.4 + Math.random() * 1.5,
        twinkleSpeed: 0.015 + Math.random() * 0.035,
        twinklePhase: Math.random() * Math.PI * 2,
        colorKey: colorKeys[Math.floor(Math.random() * colorKeys.length)],
        driftX: (Math.random() - 0.5) * 0.12,
        driftY: (Math.random() - 0.5) * 0.12
      });
    }
  };

  CosmosEngineController.prototype._initMatrixStreams = function () {
    var streamCount = this.config.matrixStreamCount || 32;
    this.matrixStreams = [];

    var columnWidth = Math.max(22, this.width / streamCount);

    for (var i = 0; i < streamCount; i++) {
      var len = Math.floor(10 + Math.random() * 16);
      var chars = [];
      for (var k = 0; k < len; k++) {
        chars.push(GLYPH_CHARS.charAt(Math.floor(Math.random() * GLYPH_CHARS.length)));
      }

      var fontSize = Math.floor(11 + Math.random() * 3.5);
      var streamX = (i * columnWidth) + (Math.random() * (columnWidth * 0.7));

      this.matrixStreams.push({
        x: streamX,
        y: Math.random() * this.height * 1.5 - (this.height * 0.5),
        speed: (0.7 + Math.random() * 1.3) * (this.config.speed || 0.45),
        length: len,
        fontSize: fontSize,
        chars: chars,
        mutateInterval: Math.floor(5 + Math.random() * 10),
        tick: Math.floor(Math.random() * 10)
      });
    }
  };

  CosmosEngineController.prototype._realignElements = function () {
    for (var i = 0; i < this.stars.length; i++) {
      if (this.stars[i].x > this.width) this.stars[i].x = Math.random() * this.width;
      if (this.stars[i].y > this.height) this.stars[i].y = Math.random() * this.height;
    }
    for (var j = 0; j < this.matrixStreams.length; j++) {
      if (this.matrixStreams[j].x > this.width) {
        this.matrixStreams[j].x = Math.random() * this.width;
      }
    }
  };

  CosmosEngineController.prototype.start = function () {
    if (this.prefersReducedMotion || this.isManuallyPaused) {
      this._drawSingleFrame();
      return this;
    }
    this.isPaused = false;
    this.pauseReason = null;
    if (this.canvas) {
      this.canvas.classList.remove('cosmos-paused');
      this.canvas.classList.remove('reading-paused');
    }
    this._startLoop();
    return this;
  };

  CosmosEngineController.prototype._startLoop = function () {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
    this.animId = requestAnimationFrame(this._frameBound);
  };

  CosmosEngineController.prototype._stopLoop = function () {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  };

  /**
   * Smoothly pause animation (e.g. when reading a story or manually toggled).
   * Freezes motion to ensure zero CPU/GPU drain.
   */
  CosmosEngineController.prototype.pause = function (reason) {
    reason = reason || 'reading';
    this.isPaused = true;
    this.pauseReason = reason;

    this._stopLoop();

    if (this.canvas) {
      this.canvas.classList.add('cosmos-paused');
      this.canvas.classList.add('reading-paused');
    }

    if (reason === 'reading' && typeof document !== 'undefined' && document.body) {
      document.body.classList.add('is-reading-mode');
    }

    return this;
  };

  /**
   * Resume animation when returning to catalog/navigation.
   */
  CosmosEngineController.prototype.resume = function (reason) {
    // Respect user accessibility preference
    if (this.isManuallyPaused && reason !== 'manual') {
      return this;
    }
    if (this.prefersReducedMotion) {
      return this;
    }

    if ((reason === 'reading' || this.pauseReason === 'reading') && typeof document !== 'undefined' && document.body) {
      document.body.classList.remove('is-reading-mode');
    }

    this.isPaused = false;
    this.pauseReason = null;

    if (this.canvas) {
      this.canvas.classList.remove('cosmos-paused');
      this.canvas.classList.remove('reading-paused');
    }

    this._startLoop();
    return this;
  };

  /**
   * Toggle manual pause for accessibility.
   * Returns current manual pause state.
   */
  CosmosEngineController.prototype.toggleManualPause = function () {
    if (this.isManuallyPaused) {
      this.isManuallyPaused = false;
      this.resume('manual');
      return false;
    } else {
      this.isManuallyPaused = true;
      this.pause('manual');
      return true;
    }
  };

  CosmosEngineController.prototype.isPausedState = function () {
    return this.isPaused;
  };

  CosmosEngineController.prototype.isManuallyPausedState = function () {
    return this.isManuallyPaused;
  };

  /**
   * Update configuration dynamically in real time (for theme changes or studio editor)
   */
  CosmosEngineController.prototype.updateConfig = function (newConfig) {
    if (!newConfig || typeof newConfig !== 'object') return;

    var prevStarCount = this.config.starCount;
    var prevStreamCount = this.config.matrixStreamCount;

    // Merge nested properties safely
    if (newConfig.colors) {
      Object.assign(this.config, newConfig.colors);
    }
    if (newConfig.cosmos) {
      Object.assign(this.config, newConfig.cosmos);
    }
    if (newConfig.typography && newConfig.typography.fontMono) {
      this.config.fontMono = newConfig.typography.fontMono;
    }
    Object.assign(this.config, newConfig);

    if (this.isInitialized) {
      if (this.config.starCount !== prevStarCount) {
        this._initStars();
      }
      if (this.config.matrixStreamCount !== prevStreamCount) {
        this._initMatrixStreams();
      }
      if (this.isPaused) {
        this._drawSingleFrame();
      }
    }
  };

  CosmosEngineController.prototype._renderFrame = function () {
    if (this.isPaused) {
      return;
    }

    this._draw();
    this.animId = requestAnimationFrame(this._frameBound);
  };

  CosmosEngineController.prototype._drawSingleFrame = function () {
    if (!this.ctx || !this.width || !this.height) return;
    this._draw();
  };

  CosmosEngineController.prototype._draw = function () {
    var ctx = this.ctx;
    var w = this.width;
    var h = this.height;
    var cfg = this.config;
    var speedMul = cfg.speed || 0.45;

    // 1. Void Backdrop
    ctx.fillStyle = cfg.bgPrimary || '#050609';
    ctx.fillRect(0, 0, w, h);

    // 2. Deep Space Nebula & Matrioshka Grid
    this._drawNebulae(ctx, w, h, cfg);
    this._drawMatrioshkaGrid(ctx, w, h, cfg, speedMul);

    // 3. Multi-layered Starfield with Subtle Connections
    this._drawStarfield(ctx, w, h, cfg, speedMul);

    // 4. Matrix / Fifth-Dimension Data Filaments
    this._drawMatrixStreams(ctx, w, h, cfg, speedMul);
  };

  CosmosEngineController.prototype._drawNebulae = function (ctx, w, h, cfg) {
    var nebOpacity = cfg.nebulaOpacity !== undefined ? cfg.nebulaOpacity : 0.35;
    if (nebOpacity <= 0.01) return;

    var cx1 = w * 0.48;
    var cy1 = h * 0.42;
    var r1 = Math.max(w, h) * 0.65;

    // Center warm amber core (Matrioshka engine glow)
    var grad1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
    grad1.addColorStop(0, colorWithAlpha(cfg.accentPrimary, 0.12 * nebOpacity));
    grad1.addColorStop(0.45, colorWithAlpha(cfg.bgSecondary, 0.08 * nebOpacity));
    grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, w, h);

    // Offset cyber-cyan cryogenic cloud
    var cx2 = w * 0.82;
    var cy2 = h * 0.22;
    var r2 = Math.max(w, h) * 0.55;
    var grad2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
    grad2.addColorStop(0, colorWithAlpha(cfg.accentSecondary, 0.09 * nebOpacity));
    grad2.addColorStop(0.6, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, w, h);

    // Subtle matrix emerald filament cluster in lower corner
    var cx3 = w * 0.18;
    var cy3 = h * 0.85;
    var r3 = Math.max(w, h) * 0.45;
    var grad3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, r3);
    grad3.addColorStop(0, colorWithAlpha(cfg.matrixGlow, 0.06 * nebOpacity));
    grad3.addColorStop(0.55, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad3;
    ctx.fillRect(0, 0, w, h);
  };

  CosmosEngineController.prototype._drawMatrioshkaGrid = function (ctx, w, h, cfg, speedMul) {
    var nebOpacity = cfg.nebulaOpacity !== undefined ? cfg.nebulaOpacity : 0.35;
    if (nebOpacity <= 0.02) return;

    if (!this.isPaused) {
      this.dysonAngle += 0.00025 * speedMul;
      if (this.dysonAngle > Math.PI * 2) {
        this.dysonAngle -= Math.PI * 2;
      }
    }

    var cx = w * 0.5;
    var cy = h * 0.46;
    var minDim = Math.min(w, h);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.dysonAngle);

    var ringAlpha = 0.055 * (nebOpacity / 0.35);
    var strokeColor = colorWithAlpha(cfg.accentPrimary, ringAlpha);
    var cyanStroke = colorWithAlpha(cfg.accentSecondary, ringAlpha * 0.8);

    ctx.lineWidth = 1;

    // Shell 1: Concentric inner orbit
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.setLineDash([4, 10]);
    ctx.arc(0, 0, minDim * 0.22, 0, Math.PI * 2);
    ctx.stroke();

    // Shell 2: Mid-orbit with coordinate tick marks
    ctx.beginPath();
    ctx.strokeStyle = cyanStroke;
    ctx.setLineDash([]);
    ctx.arc(0, 0, minDim * 0.36, 0, Math.PI * 2);
    ctx.stroke();

    // Dyson coordinate ticks
    var tickCount = 12;
    var rInner = minDim * 0.35;
    var rOuter = minDim * 0.37;
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    for (var i = 0; i < tickCount; i++) {
      var angle = (i * Math.PI * 2) / tickCount;
      var cosA = Math.cos(angle);
      var sinA = Math.sin(angle);
      ctx.moveTo(cosA * rInner, sinA * rInner);
      ctx.lineTo(cosA * rOuter, sinA * rOuter);
    }
    ctx.stroke();

    // Shell 3: Outer Matrioshka boundary
    ctx.beginPath();
    ctx.strokeStyle = colorWithAlpha(cfg.matrixGlow, ringAlpha * 0.5);
    ctx.setLineDash([8, 16]);
    ctx.arc(0, 0, minDim * 0.52, 0, Math.PI * 2);
    ctx.stroke();

    // 8 Radial cross-spokes extending outward
    ctx.beginPath();
    ctx.strokeStyle = colorWithAlpha(cfg.accentPrimary, ringAlpha * 0.6);
    ctx.setLineDash([3, 12]);
    var spokeCount = 8;
    var sStart = minDim * 0.16;
    var sEnd = minDim * 0.54;
    for (var k = 0; k < spokeCount; k++) {
      var sAngle = (k * Math.PI * 2) / spokeCount;
      var cosS = Math.cos(sAngle);
      var sinS = Math.sin(sAngle);
      ctx.moveTo(cosS * sStart, sinS * sStart);
      ctx.lineTo(cosS * sEnd, sinS * sEnd);
    }
    ctx.stroke();

    ctx.restore();
  };

  CosmosEngineController.prototype._drawStarfield = function (ctx, w, h, cfg, speedMul) {
    var starList = this.stars;
    var len = starList.length;
    var paused = this.isPaused;

    // Draw star micro-connections for close foreground stars
    var maxDist = 80;
    var maxDistSq = maxDist * maxDist;
    var connectionsDrawn = 0;
    var maxConnections = 35;

    ctx.lineWidth = 0.75;
    for (var i = 0; i < len && connectionsDrawn < maxConnections; i++) {
      var s1 = starList[i];
      if (s1.z < 0.65) continue;

      for (var j = i + 1; j < len && connectionsDrawn < maxConnections; j++) {
        var s2 = starList[j];
        if (s2.z < 0.65) continue;

        var dx = s1.x - s2.x;
        var dy = s1.y - s2.y;
        var distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          var dist = Math.sqrt(distSq);
          var lineAlpha = (1 - dist / maxDist) * 0.14 * s1.z;
          ctx.strokeStyle = colorWithAlpha(cfg.accentSecondary, lineAlpha);
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
          connectionsDrawn++;
        }
      }
    }

    // Draw individual stars
    for (var k = 0; k < len; k++) {
      var s = starList[k];

      if (!paused) {
        s.twinklePhase += s.twinkleSpeed * (speedMul * 2.2);
        s.x += s.driftX * speedMul;
        s.y += (s.driftY + 0.04) * speedMul;

        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;
      }

      var twinkle = 0.35 + 0.65 * (Math.sin(s.twinklePhase) * 0.5 + 0.5);
      var alpha = twinkle * s.z * 0.9;
      var radius = s.baseRadius * (0.6 + 0.4 * s.z);

      var color = cfg[s.colorKey] || cfg.textPrimary;
      ctx.fillStyle = colorWithAlpha(color, alpha);

      ctx.beginPath();
      ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle bloom halo for brightest stars
      if (s.z > 0.8 && twinkle > 0.75) {
        ctx.fillStyle = colorWithAlpha(color, alpha * 0.25);
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  CosmosEngineController.prototype._drawMatrixStreams = function (ctx, w, h, cfg, speedMul) {
    var streams = this.matrixStreams;
    var streamLen = streams.length;
    var matrixOpacity = cfg.matrixOpacity !== undefined ? cfg.matrixOpacity : 0.22;
    if (matrixOpacity <= 0.01) return;

    var fontMono = cfg.fontMono || "'JetBrains Mono', monospace";
    var paused = this.isPaused;

    for (var i = 0; i < streamLen; i++) {
      var stream = streams[i];
      var fontSize = stream.fontSize;

      ctx.font = fontSize + 'px ' + fontMono;
      ctx.textAlign = 'center';

      // Animate and mutate characters
      if (!paused) {
        stream.y += stream.speed * speedMul * 2.4;
        stream.tick++;

        if (stream.tick >= stream.mutateInterval) {
          stream.tick = 0;
          var mutateIndex = Math.floor(Math.random() * stream.length);
          stream.chars[mutateIndex] = GLYPH_CHARS.charAt(Math.floor(Math.random() * GLYPH_CHARS.length));
        }

        // Reset stream when it falls completely past view
        var streamTotalHeight = stream.length * (fontSize * 1.25);
        if (stream.y - streamTotalHeight > h) {
          stream.y = -(Math.random() * 80 + 30);
          stream.x = Math.random() * w;
          stream.speed = (0.7 + Math.random() * 1.3) * (cfg.speed || 0.45);
        }
      }

      // Draw stream characters from head upwards
      var len = stream.length;
      for (var k = 0; k < len; k++) {
        var charY = stream.y - (k * fontSize * 1.25);

        // Skip offscreen characters
        if (charY < -20 || charY > h + 20) continue;

        var charStr = stream.chars[k] || '1';

        if (k === 0) {
          // Head glyph: bright glowing white/matrix pulse
          var headAlpha = Math.min(1.0, matrixOpacity * 2.8);
          ctx.fillStyle = colorWithAlpha(cfg.textPrimary, headAlpha);
          ctx.fillText(charStr, stream.x, charY);
        } else {
          // Fading trail glyphs
          var trailRatio = 1 - (k / len);
          var trailAlpha = matrixOpacity * trailRatio * 0.95;
          ctx.fillStyle = colorWithAlpha(cfg.matrixGlow, trailAlpha);
          ctx.fillText(charStr, stream.x, charY);
        }
      }
    }
  };

  CosmosEngineController.prototype.destroy = function () {
    this._stopLoop();

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this._onResize);
      document.removeEventListener('visibilitychange', this._onVisibilityChange);
      if (this._motionMediaQuery) {
        if (this._motionMediaQuery.removeEventListener) {
          this._motionMediaQuery.removeEventListener('change', this._onMotionQueryChange);
        } else if (this._motionMediaQuery.removeListener) {
          this._motionMediaQuery.removeListener(this._onMotionQueryChange);
        }
      }
    }

    if (this._resizeDebounceTimer) {
      clearTimeout(this._resizeDebounceTimer);
    }

    this.stars = [];
    this.matrixStreams = [];
    this.canvas = null;
    this.ctx = null;
    this.isInitialized = false;
  };

  // Create singleton instance
  var cosmosInstance = new CosmosEngineController();

  // Expose as window.CosmosEngine
  global.CosmosEngine = {
    init: function (canvasElement, options) {
      return cosmosInstance.init(canvasElement, options);
    },
    start: function () {
      return cosmosInstance.start();
    },
    pause: function (reason) {
      return cosmosInstance.pause(reason);
    },
    resume: function (reason) {
      return cosmosInstance.resume(reason);
    },
    toggleManualPause: function () {
      return cosmosInstance.toggleManualPause();
    },
    isPaused: function () {
      return cosmosInstance.isPausedState();
    },
    isManuallyPaused: function () {
      return cosmosInstance.isManuallyPausedState();
    },
    updateConfig: function (newConfig) {
      return cosmosInstance.updateConfig(newConfig);
    },
    resize: function () {
      return cosmosInstance.resize();
    },
    destroy: function () {
      return cosmosInstance.destroy();
    },
    getInstance: function () {
      return cosmosInstance;
    }
  };

  // Auto-init on DOMContentLoaded if not already initialized
  if (typeof document !== 'undefined') {
    var autoInit = function () {
      if (!cosmosInstance.isInitialized) {
        cosmosInstance.init();
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoInit);
    } else {
      autoInit();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = global.CosmosEngine;
  }

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
