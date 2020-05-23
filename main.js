const flock = [];

let alignSlider, cohesionSlider, avoidSlider, maxSpeedSlider;

function setup() {
  frameRate(24);
  createCanvas(windowWidth, windowHeight * 0.8);

  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  avoidSlider = createSlider(0, 5, 1, 0.1);
  maxSpeedSlider = createSlider(1, 6, 1, 0.1);

  for (let index = 0; index < 100; index++) {
    flock.push(new BoidBody());
  }
}

let timer = 0;
const startupDelay = 0;

function draw() {
  background(51);

  flock.forEach((boid) => {
    boid.edges();
    boid.flock(flock);
    boid.update();
  });
}
