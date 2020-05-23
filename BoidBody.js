class BoidBody {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(2, 5));
    this.acc = createVector(0, 0);

    this.attractionForce = 0.4;
    this.seperationForce = 0.4;

    this.attractionRadius = 100;
    this.maxSpeed = 4;

    this.update();
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  align(boids) {
    let steering = createVector();
    let total = 0;

    boids.forEach((otherBoid) => {
      let distance = dist(
        this.pos.x,
        this.pos.y,
        otherBoid.pos.x,
        otherBoid.pos.y
      );
      if (distance < this.attractionRadius && otherBoid != this) {
        steering.add(otherBoid.vel);
        total++;
      }
    });

    if (total > 0) {
      steering.div(total);

      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.attractionForce);
    }
    return steering;
  }
  avoid(boids) {
    let steering = createVector();
    let total = 0;

    boids.forEach((otherBoid) => {
      let distance = dist(
        this.pos.x,
        this.pos.y,
        otherBoid.pos.x,
        otherBoid.pos.y
      );
      if (distance < this.attractionRadius && otherBoid != this) {
        let diff = p5.Vector.sub(this.pos, otherBoid.pos);
        diff.mult((1 / distance) * distance);
        steering.add(diff);
        total++;
      }
    });

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.seperationForce);
    }
    return steering;
  }

  cohesion(boids) {
    let steering = createVector();
    let total = 0;

    boids.forEach((otherBoid) => {
      let distance = dist(
        this.pos.x,
        this.pos.y,
        otherBoid.pos.x,
        otherBoid.pos.y
      );
      if (distance < this.attractionRadius && otherBoid != this) {
        steering.add(otherBoid.pos);
        total++;
      }
    });

    if (total > 0) {
      steering.div(total);
      steering.sub(this.pos);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.attractionForce);
    }
    return steering;
  }
  flock(boids) {
    const alignment = this.align(boids);
    const cohesion = this.cohesion(boids);
    const avoid = this.avoid(boids);

    alignment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    avoid.mult(avoidSlider.value());

    this.acc.add(avoid);
    this.acc.add(cohesion);
    this.acc.add(alignment);
  }

  update() {
    this.maxSpeed = 4 * maxSpeedSlider.value();
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.draw();

    this.acc.set(0, 0);
  }

  draw() {
    strokeWeight(10);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
}
