const flock = [];

let alignSlider, cohesionSlider, avoidSlider, maxSpeedSlider;

class Slider {
  constructor(label, posX, posY, rangeMin, rangeMax, startingPoint = 1) {
    this.slider = createSlider(rangeMin, rangeMax, startingPoint, 0.1);

    this.slider.position(posX, posY);
    this.value = () => this.slider.value();

    fill(255, 255, 255, 100);
    text(label, posX, posY + 10);
  }
}

function setup() {
  frameRate(24);
  createCanvas(windowWidth, windowHeight );

  alignSlider = new Slider("Align", 10, 10, 0, 2);
  cohesionSlider = new Slider("Cohesion", 10, 30, 0, 3);
  avoidSlider = new Slider("Avoid", 10, 60, 0, 2);
  maxSpeedSlider = new Slider("Speed", 10, 90, 0, 20, 4);

  for (let index = 0; index < 200; index++) {
    flock.push(new BoidBody());
  }
  textSize(40);
  fill(84, 95, 128);
  text("Test");
}

let timer = 0;
const startupDelay = 0;

function draw() {
  //background("#383f51");
  setGradient(
    0,
    0,
    width,
    height,
    color("#272f47"),
    color("#131724"),
    "Y_AXIS"
  );
  flock.forEach((boid) => {
    boid.edges();
    boid.flock(flock);
    boid.update();
  });
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === "Y_AXIS") {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === "X_AXIS") {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
