(function(){
  const animEl = document.getElementById('title-anim');
  if (animEl) {
    const target = 'Software Engineer';
    let ch = 0;
    const interval = setInterval(() => {
      ch++;
      animEl.textContent = target.slice(0, ch);
      if (ch >= target.length) clearInterval(interval);
    }, 80);
  }
  return;

  let canvas = document.getElementById('hero-particles');
  if (!canvas) {
    const wrap = document.createElement('div');
    wrap.className = 'hero-canvas-wrap';
    canvas = document.createElement('canvas');
    canvas.id = 'hero-particles';
    wrap.appendChild(canvas);
    document.body.insertBefore(wrap, document.body.firstChild);
  }
  const ctx = canvas.getContext('2d');
  let DPR = Math.max(1, window.devicePixelRatio || 1);

  function resize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    // reset transform to avoid accumulation
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  function initParticles() {
    particles.length = 0;
    const area = window.innerWidth * window.innerHeight;
    const count = Math.min(80, Math.max(22, Math.floor(area / 90000)));
    for (let i=0;i<count;i++) particles.push({
      x: Math.random()*window.innerWidth,
      y: window.innerHeight * (0.6 + Math.random()*0.6),
      r: 8 + Math.random()*28,
      vx: (Math.random()-0.5) * 0.25,
      vy: -0.08 - Math.random()*0.25,
      phase: Math.random()*Math.PI*2,
      alpha: 0.18 + Math.random()*0.32
    });
  }
  initParticles();
  window.addEventListener('resize', initParticles);

  function drawBubble(p) {
    const gx = p.x;
    const gy = p.y;
    const gr = p.r;
    // radial gradient: bright center to strong pink edge
    const grad = ctx.createRadialGradient(gx, gy, Math.max(1, gr*0.1), gx, gy, gr);
    grad.addColorStop(0, `rgba(255,255,255,${0.95 * p.alpha})`);
    grad.addColorStop(0.25, `rgba(255,240,242,${0.7 * p.alpha})`);
    grad.addColorStop(0.6, `rgba(243,200,207,${0.36 * p.alpha})`);
    grad.addColorStop(1, `rgba(217,127,143,${0.18 * p.alpha})`);
    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(gx, gy, gr, 0, Math.PI*2);
    ctx.fill();
    // soft rim highlight
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,255,255,${0.24 * p.alpha})`;
    ctx.lineWidth = Math.max(1, gr * 0.06);
    ctx.arc(gx - gr*0.06, gy - gr*0.06, gr*0.9, 0, Math.PI*2);
    ctx.stroke();
  }

  function tick(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // render in lighter composite to make overlaps brighter
    ctx.globalCompositeOperation = 'source-over';
    particles.forEach(p=>{
      p.phase += 0.008 + Math.random()*0.004;
      p.x += Math.sin(p.phase) * 0.4 + p.vx;
      p.y += p.vy;
      if (p.y + p.r < -40) {
        p.x = Math.random()*window.innerWidth;
        p.y = window.innerHeight + p.r + 40;
        p.r = 8 + Math.random()*28;
        p.vy = -0.08 - Math.random()*0.25;
        p.alpha = 0.18 + Math.random()*0.32;
      }
      drawBubble(p);
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
