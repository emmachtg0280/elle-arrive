/* Original ribbon artwork animated as refracting material; static image is the fallback. */
(() => {
  const scenery = document.querySelector('.scenery');
  const canvas = scenery.querySelector('canvas');
  const image = scenery.querySelector('img');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let gl;
  try { gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' }); } catch { return; }
  if (!gl) return;
  let frame = 0;
  let elapsed = 0;
  let last = 0;
  let active = false;
  let draw;
  const vertex = 'attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}';
  const fragment = `precision mediump float;
    uniform sampler2D artwork;
    uniform vec2 resolution;
    uniform float time;
    varying vec2 uv;
    void main(){
      vec2 p=vec2(uv.x,1.-uv.y);
      float aspect=resolution.x/resolution.y;
      float source=1.777778;
      vec2 fit=vec2(min(aspect/source,1.),min(source/aspect,1.));
      vec2 q=(p-.5)*fit*.93+vec2(.54,.5);
      float flow=time*.16;
      float room=smoothstep(.18,.8,p.x);
      q.x+=sin(q.y*5.8-flow)*.022*room;
      q.y+=sin(q.x*6.3+flow*.7)*.019*room;
      q+=vec2(sin(flow*.43),cos(flow*.31))*.007;
      vec3 color=texture2D(artwork,clamp(q,0.001,.999)).rgb;
      float light=pow(.5+.5*sin(q.x*7.0-q.y*4.0-flow*.9),6.0);
      float colorAmount=1.-min(color.r,min(color.g,color.b));
      color=mix(color,vec3(1.,.95,.89),light*.13*room*colorAmount);
      gl_FragColor=vec4(color,1.);
    }`;
  function shader(type, source) {
    const item = gl.createShader(type);
    gl.shaderSource(item, source); gl.compileShader(item);
    if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) { gl.deleteShader(item); throw new Error('Shader unavailable'); }
    return item;
  }
  function tick(now) {
    if (!active) return;
    if (!last || now-last >= 1000/30) {
      if (last) elapsed += Math.min((now-last)/1000, .1);
      last = now; draw(elapsed);
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    const shouldPlay = !reduced.matches && !document.hidden && !document.documentElement.classList.contains('paused') && !document.querySelector('dialog').open;
    cancelAnimationFrame(frame); last = 0; active = shouldPlay;
    if (active && draw) frame = requestAnimationFrame(tick);
  }
  function start() {
    if (!image.naturalWidth) return;
    try {
      const program=gl.createProgram();
      const vs=shader(gl.VERTEX_SHADER,vertex), fs=shader(gl.FRAGMENT_SHADER,fragment);
      gl.attachShader(program,vs); gl.attachShader(program,fs); gl.linkProgram(program);
      gl.deleteShader(vs); gl.deleteShader(fs);
      if (!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error('Program unavailable');
      gl.useProgram(program);
      const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const position=gl.getAttribLocation(program,'position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      const texture=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,texture);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
      const size=gl.getUniformLocation(program,'resolution'), time=gl.getUniformLocation(program,'time');
      draw = value => { gl.uniform1f(time,value); gl.drawArrays(gl.TRIANGLES,0,6); };
      const resize = () => {
        const rect=scenery.getBoundingClientRect(), scale=Math.min(devicePixelRatio||1,1.25);
        canvas.width=Math.round(rect.width*scale); canvas.height=Math.round(rect.height*scale);
        gl.viewport(0,0,canvas.width,canvas.height); gl.uniform2f(size,canvas.width,canvas.height); draw(elapsed);
      };
      const observer=new ResizeObserver(resize); observer.observe(scenery); resize();
      scenery.classList.add('ready'); sync();
      window.addEventListener('ea:motion',sync); document.addEventListener('visibilitychange',sync); reduced.addEventListener('change',sync);
      canvas.addEventListener('webglcontextlost',() => { active=false;cancelAnimationFrame(frame);observer.disconnect();scenery.classList.remove('ready'); });
    } catch { scenery.classList.remove('ready'); }
  }
  if (image.complete) start(); else image.addEventListener('load',start,{once:true});
})();
