export function getMatches(nbPlayers) {
  switch (nbPlayers) {
    case 3:
      return matches3Pool;
    case 4:
      return matches4Pool;
    case 5:
      return matches5Pool;
    case 6:
      return matches6Pool;
    case 7:
      return matches7Pool;
    case 8:
      return matches8Pool;
    default:
      return [];
  }
}

const matches3Pool = [
  { idx1: 0, idx2: 2 },
  { idx1: 1, idx2: 2 },
  { idx1: 0, idx2: 1 }
];

const matches4Pool = [
  { idx1: 0, idx2: 3 },
  { idx1: 1, idx2: 2 },
  { idx1: 0, idx2: 2 },
  { idx1: 1, idx2: 3 },
  { idx1: 0, idx2: 1 },
  { idx1: 2, idx2: 3 }
];

const matches5Pool = [
  { idx1: 1, idx2: 4 },
  { idx1: 2, idx2: 3 },
  { idx1: 0, idx2: 4 },
  { idx1: 1, idx2: 2 },
  { idx1: 0, idx2: 3 },
  { idx1: 2, idx2: 4 },
  { idx1: 0, idx2: 2 },
  { idx1: 1, idx2: 3 },
  { idx1: 0, idx2: 1 },
  { idx1: 3, idx2: 4 }
];

const matches6Pool = [
  { idx1: 0, idx2: 5 },
  { idx1: 1, idx2: 4 },
  { idx1: 2, idx2: 3 },
  { idx1: 0, idx2: 4 },
  { idx1: 3, idx2: 5 },
  { idx1: 1, idx2: 2 },
  { idx1: 0, idx2: 3 },
  { idx1: 2, idx2: 4 },
  { idx1: 1, idx2: 5 },
  { idx1: 0, idx2: 2 },
  { idx1: 1, idx2: 3 },
  { idx1: 4, idx2: 5 },
  { idx1: 0, idx2: 1 },
  { idx1: 2, idx2: 5 },
  { idx1: 3, idx2: 4 }
];

const matches7Pool = [
  { idx1: 1, idx2: 6 },
  { idx1: 2, idx2: 5 },
  { idx1: 3, idx2: 4 },
  { idx1: 0, idx2: 6 },
  { idx1: 1, idx2: 4 },
  { idx1: 2, idx2: 3 },
  { idx1: 0, idx2: 5 },
  { idx1: 4, idx2: 6 },
  { idx1: 1, idx2: 2 },
  { idx1: 0, idx2: 4 },
  { idx1: 3, idx2: 5 },
  { idx1: 2, idx2: 6 },
  { idx1: 0, idx2: 3 },
  { idx1: 2, idx2: 4 },
  { idx1: 1, idx2: 5 },
  { idx1: 0, idx2: 2 },
  { idx1: 1, idx2: 3 },
  { idx1: 5, idx2: 6 },
  { idx1: 0, idx2: 1 },
  { idx1: 3, idx2: 6 },
  { idx1: 4, idx2: 5 }
];

const matches8Pool = [
  { idx1: 0, idx2: 7 },
  { idx1: 1, idx2: 6 },
  { idx1: 2, idx2: 5 },
  { idx1: 3, idx2: 4 },
  { idx1: 0, idx2: 6 },
  { idx1: 5, idx2: 7 },
  { idx1: 1, idx2: 4 },
  { idx1: 2, idx2: 3 },
  { idx1: 0, idx2: 5 },
  { idx1: 4, idx2: 6 },
  { idx1: 3, idx2: 7 },
  { idx1: 1, idx2: 2 },
  { idx1: 0, idx2: 4 },
  { idx1: 3, idx2: 5 },
  { idx1: 2, idx2: 6 },
  { idx1: 1, idx2: 7 },
  { idx1: 0, idx2: 3 },
  { idx1: 2, idx2: 4 },
  { idx1: 1, idx2: 5 },
  { idx1: 6, idx2: 7 },
  { idx1: 0, idx2: 2 },
  { idx1: 1, idx2: 3 },
  { idx1: 4, idx2: 7 },
  { idx1: 5, idx2: 6 },
  { idx1: 0, idx2: 1 },
  { idx1: 2, idx2: 7 },
  { idx1: 3, idx2: 6 },
  { idx1: 4, idx2: 5 }
];
