/**
 * Gaussian elimination with partial pivoting, for the small dense systems this
 * layer throws up: eight unknowns for a homography, six for a light surface.
 * Nothing here is large enough to want anything cleverer.
 */
export function solveLinearSystem(matrix: number[][], targets: number[]): Float64Array {
  const n = targets.length;
  const rows = matrix.map((row, i) => [...row, targets[i]]);

  for (let column = 0; column < n; column++) {
    let pivot = column;
    for (let row = column + 1; row < n; row++) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivot][column])) pivot = row;
    }
    [rows[column], rows[pivot]] = [rows[pivot], rows[column]];

    const divisor = rows[column][column];
    if (Math.abs(divisor) < 1e-12) continue;

    for (let row = 0; row < n; row++) {
      if (row === column) continue;
      const factor = rows[row][column] / divisor;
      for (let k = column; k <= n; k++) rows[row][k] -= factor * rows[column][k];
    }
  }

  const solution = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const divisor = rows[i][i];
    solution[i] = Math.abs(divisor) < 1e-12 ? 0 : rows[i][n] / divisor;
  }
  return solution;
}
