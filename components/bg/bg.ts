const PARTICLE_NUM = 500;
const PARTICLE_BASE_RADIUS = 2;
const FL = 500;
const DEFAULT_SPEED = 2;
const BOOST_SPEED = 100;

let canvas: any;
let canvasWidth: any;
let canvasHeight: any;
let context: any;
let centerX: any, centerY: any;
let speed = DEFAULT_SPEED;
let targetSpeed = DEFAULT_SPEED;

let mouseX = 0;
let mouseY = 0;

let particles: any = [];

window.addEventListener(
  "load",
  () => {
    canvas = document.getElementById("c");

    let resize = () => {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
      centerX = canvasWidth * 0.5;
      centerY = canvasHeight * 0.5;
      context = canvas.getContext("2d");
      context.fillStyle = "rgb(255,255,255)";
    };

    document.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      false
    );

    document.addEventListener(
      "mousedown",
      (e) => {
        targetSpeed = BOOST_SPEED;
      },
      false
    );

    document.addEventListener(
      "mouseup",
      (e) => {
        targetSpeed = DEFAULT_SPEED;
      },
      false
    );
    window.addEventListener("resize", () => {
      resize();
    });

    setInterval(loop, 1000 / 60);
    resize();
  },
  false
);

const loop = () => {
  context.save();
  context.fillStyle = "rgb(0,0,0)";
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.restore();

  speed += (targetSpeed - speed) * 0.01;

  let p;
  let cx;
  let cy;
  let rx;
  let ry;
  let f, x, y, r;
  let pf, px, py, pr;
  let a, a1, a2;

  let halfPi = Math.PI * 0.5;
  let atan2 = Math.atan2;
  let cos = Math.cos;
  let sin = Math.sin;

  context.beginPath();
  for (let i = 0; i < PARTICLE_NUM; i++) {
    p = particles[i];

    if (!p) {
      particles[i] = new Particle();
      p = particles[i];
      randomizeParticle(p);
    }

    p.pastZ = p.z;
    p.z -= speed;

    if (p.z < 0) {
      randomizeParticle(p);
      continue;
    }

    cx = centerX - (mouseX - centerX) * 1.25;
    cy = centerY - (mouseY - centerY) * 1.25;

    rx = p.x - cx;
    ry = p.y - cy;

    f = FL / p.z;
    x = cx + rx * f;
    y = cy + ry * f;
    r = PARTICLE_BASE_RADIUS * (FL / (FL + p.z));

    a = atan2(py - y, px - x);
    a1 = a + halfPi;
    a2 = a - halfPi;

    pf = FL / p.z;
    px = cx + rx * pf;
    py = cy + ry * pf;
    pr = PARTICLE_BASE_RADIUS * (FL / (FL + p.z));

    context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
    context.arc(px, py, pr, a1, a2, true);
    context.lineTo(x + r * cos(a2), y + r * sin(a2));
    context.arc(x, y, r, a2, a1, true);
    context.closePath();
  }
  context.fill();
};
const randomizeParticle = (p: any) => {
  p.x = Math.random() * canvasWidth;
  p.y = Math.random() * canvasHeight;
  p.z = Math.random() * 1500 + 500;
};

class Particle {
  constructor(x: any, y: any, z: any) {
    this.x = x || Math.random() * canvasWidth;
    this.y = y || Math.random() * canvasHeight;
    this.z = z || Math.random() * 1500 + 500;

    this.pastZ = 0;
  }
}
