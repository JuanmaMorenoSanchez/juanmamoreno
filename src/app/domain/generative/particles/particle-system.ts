// import p5 from "p5";
// import { Particle } from "./particle";

// export class ParticleSystem {
//   private p: p5;
//   private origin: p5.Vector;
//   private particles: Particle[];

//   constructor(p: p5, position: p5.Vector) {
//     this.p = p;
//     this.origin = position.copy();
//     this.particles = [];
//   }

//   addParticle(img: p5.Image, windRad: number, nasdaqPerf: number): void {
//     if (Math.floor(this.p.random(0, 10)) === 0) {
//       this.particles.push(new Particle(this.p, this.origin, img, windRad, nasdaqPerf));
//     }
//   }

//   run(): void {
//     for (let i = this.particles.length - 1; i >= 0; i--) {
//       const p = this.particles[i];
//       p.run();
//       if (p.isDead()) {
//         this.particles.splice(i, 1);
//       }
//     }
//   }
// }