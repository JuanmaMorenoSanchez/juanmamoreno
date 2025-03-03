import p5 from "p5";

export class Particle {
  private p: p5;
  private acceleration: p5.Vector;
  private velocity: p5.Vector;
  private position: p5.Vector;
  private lifespan: number;
  private texture: p5.Image;
  private size: number;

  constructor(p: p5, position: p5.Vector, img: p5.Image, windRad: number, nasdaqPerf: number) {
    this.p = p;
    this.acceleration = p5.Vector.fromAngle(windRad).mult(1 / 50).add(0, -nasdaqPerf / 100);
    this.velocity = new p5.Vector(this.p.random(-1, 1), this.p.random(-1, 0));
    this.position = position.copy();
    this.lifespan = 600;
    this.texture = img;
    this.size = this.p.random(30, 120);
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
      this.p.tint(255, this.lifespan);
    }
    this.p.image(
      this.texture,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
    this.p.noTint();
  }

  isDead(): boolean {
    return this.lifespan < 0;
  }

  createVector(x: number, y: number): p5.Vector {
    return new p5.Vector().set(x, y);
  }
}
