const flock = [];

let alignSlider, cohesionSlider, avoidSlider, maxSpeedSlider;

class Slider {
  constructor(label, posX, posY, rangeMin, rangeMax) {
    this.slider = createSlider(rangeMin, rangeMax, 1, 0.1);

    this.slider.position(posX, posY);
    this.value = () => this.slider.value();

    fill(255, 255, 255, 100);
    text(label, posX, posY + 10);
  }
}

function setup() {
  frameRate(24);
  createCanvas(windowWidth, windowHeight * 0.8);

  alignSlider = new Slider("Align", 10, 10, 0, 5);
  cohesionSlider = new Slider("Cohesion", 10, 30, 0, 5);
  avoidSlider = new Slider("Avoid", 10, 60, 0, 5);
  maxSpeedSlider = new Slider("Speed", 10, 90, 0, 20);

  for (let index = 0; index < 200; index++) {
    flock.push(new BoidBody());
  }
  textSize(40)
  fill(0)
  text("Test")
}

let timer = 0;
const startupDelay = 0;

function draw() {
  background(200);

  flock.forEach((boid) => {
    boid.edges();
    boid.flock(flock);
    boid.update();
  });
}
