/// <reference types="cypress" />

// Visual smoke check for the Canvas 2D generative sketches. Verifies the
// canvas exists, is sized, and is actually painting non-blank pixels, and
// captures screenshots for manual review.
//   npx cypress run --spec cypress/e2e/juanmamoreno/generative.cy.js --config baseUrl=http://127.0.0.1:4201

function assertCanvasHasColor(win) {
  const canvas = win.document.querySelector('canvas.sketch-canvas');
  expect(canvas, 'canvas element').to.exist;
  expect(canvas.width, 'canvas backing width').to.be.greaterThan(0);
  const ctx = canvas.getContext('2d');
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // Count pixels that are not fully transparent AND not pure black — proof the
  // sketch actually drew something rather than leaving a blank frame.
  let painted = 0;
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a > 0 && (r > 10 || g > 10 || b > 10)) painted++;
  }
  const ratio = painted / (data.length / 4);
  cy.log(`painted pixel ratio: ${(ratio * 100).toFixed(1)}%`);
  expect(ratio, 'fraction of painted pixels').to.be.greaterThan(0.02);
}

describe('generative sketches render', () => {
  it('believe paints the kaleidoscope', () => {
    cy.visit('/generative/believe');
    cy.get('canvas.sketch-canvas', { timeout: 10000 }).should('be.visible');
    cy.wait(2500); // let images load + a few animation frames run
    cy.get('canvas.sketch-canvas')
      .trigger('pointermove', 200, 150)
      .trigger('pointermove', 400, 300);
    cy.wait(500);
    cy.screenshot('believe', { overwrite: true });
    cy.window().then(assertCanvasHasColor);
  });

  it('wind-direction paints the drifting field', () => {
    cy.visit('/generative/wind-direction');
    cy.get('canvas.sketch-canvas', { timeout: 10000 }).should('be.visible');
    cy.wait(2500);
    cy.get('canvas.sketch-canvas')
      .trigger('pointermove', 300, 400)
      .trigger('pointerdown', 300, 400)
      .trigger('pointermove', 500, 200);
    cy.wait(700);
    cy.screenshot('wind-direction', { overwrite: true });
    cy.window().then(assertCanvasHasColor);
  });
});
