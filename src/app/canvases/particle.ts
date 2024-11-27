import p5 from "p5"; // Assumes you're using p5.js

export class Particle {
  private acceleration: p5.Vector;
  private velocity: p5.Vector;
  private position: p5.Vector;
  private lifespan: number;
  private texture: p5.Image;
  private size: number;

  constructor(position: p5.Vector, img: p5.Image, windRad: number, nasdaqPerf: number) {
    this.acceleration = p5.Vector.fromAngle(windRad).mult(1 / 50).add(0, -nasdaqPerf / 100);
    this.velocity = new p5.Vector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifespan = 600;
    this.texture = img;
    this.size = random(30, 120);
  }

  run() {
    this.update();
    this.display();
  }

  private update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  private display() {
    if (this.lifespan < 255) {
      tint(255, this.lifespan);
    }
    image(
      this.texture,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
    noTint();
  }

  isDead(): boolean {
    return this.lifespan < 0;
  }
}

// Utility functions
function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function tint(...args: any[]): void {
  // Placeholder: Replace with your tint implementation
}

function image(img: p5.Image, x: number, y: number, width: number, height: number): void {
  // Placeholder: Replace with your image implementation
}

function noTint(): void {
  // Placeholder: Replace with your noTint implementation
}

function createVector(x: number, y: number): p5.Vector {
  return new p5.Vector().set(x, y);
}
