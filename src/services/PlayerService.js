import { shuffle } from './RandomService.js';

const LOCAL_STORAGE_KEY_PLAYERS = 'tt-players';

let players;

export function sortByRanking(players) {
  return players.sort(function(a, b) {
    if (a.Ranking < b.Ranking) return -1;
    if (a.Ranking > b.Ranking) return 1;
    return 0;
  });
}

export function sortByName(players) {
  return sortBy(players, ['Name', 'FirstName']);
}

export function sortByRankingAndName(players) {
  return sortBy(players, ['Ranking', 'Name', 'FirstName']);
}

export function sortBy(players, fields) {
  return players.sort(function(a, b) {
    for (let field of fields) {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
    }
    return 0;
  });
}

export function shufflePlayers(players, nbPlayersByPool, splitSimilarForcePlayers = true) {
  const result = [];
  if (!nbPlayersByPool || !players) {
    return result;
  }
  const poolCount = Math.ceil(players.length / nbPlayersByPool);
  let remainingPlayers = shuffle(players);
  if (splitSimilarForcePlayers) {
    remainingPlayers = sortByRanking(remainingPlayers);
  }
  for (let poolNumber = 1; poolNumber <= poolCount; poolNumber++) {
    result.push({
      poolNumber,
      players: [],
    });
  }
  while (remainingPlayers.length > 0) {
    const bestPlayers = shuffle(remainingPlayers.splice(0, poolCount));
    for (let i = 0; i < bestPlayers.length; i++) {
      result[i].players.push(bestPlayers[i]);
    }
  }
  for (let pool of result) {
    pool.players = sortByRankingAndName(pool.players);
  }
  return result;
}

export function addPlayer(name, firstName, ranking) {
  let newId = Math.max(...players.map(player => player.Id)) + 1;
  players = [
    ...players,
    {
      Id: newId,
      Name: capitalize(name),
      FirstName: capitalize(firstName),
      Ranking: ranking,
      Index: undefined
    }
  ];
  updateLocalStorage(players);
  return newId;
}

export function getRankings() {
  return [
    'A',
    'B0',
    'B2',
    'B4',
    'B6',
    'C0',
    'C2',
    'C4',
    'C6',
    'D0',
    'D2',
    'D4',
    'D6',
    'E0',
    'E2',
    'E4',
    'E6',
    'NC'
  ];
}

export function getPlayers() {
  if (!players) {
    let strPlayers = localStorage.getItem(LOCAL_STORAGE_KEY_PLAYERS);
    if (strPlayers) {
      players = JSON.parse(strPlayers);
    } else {
      players = getDefaultPlayers();
      updateLocalStorage(players);
    }
  }
  return sortByRankingAndName(players);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

function updateLocalStorage(playerList) {
  localStorage.setItem(LOCAL_STORAGE_KEY_PLAYERS, JSON.stringify(playerList));
}

function getDefaultPlayers() {
  return [
    {
      Id: 117563,
      Name: 'BOURGUIGNON',
      FirstName: 'CHRISTOPHE',
      Ranking: 'B6',
      Index: 2
    },
    {
      Id: 124380,
      Name: 'HAMBLENNE',
      FirstName: 'FABIEN',
      Ranking: 'B6',
      Index: 2
    },
    {
      Id: 101707,
      Name: 'VAN MUYSEWINKEL',
      FirstName: 'GREGORY',
      Ranking: 'C0',
      Index: 3
    },
    {
      Id: 131798,
      Name: 'AVAUX',
      FirstName: 'NICOLAS',
      Ranking: 'C2',
      Index: 10
    },
    {
      Id: 112705,
      Name: 'CAMBY',
      FirstName: 'RAPHAEL',
      Ranking: 'C2',
      Index: 10
    },
    {
      Id: 101733,
      Name: 'DE JONGHE',
      FirstName: 'BERNARD',
      Ranking: 'C2',
      Index: 10
    },
    {
      Id: 101702,
      Name: 'HOOVELTS',
      FirstName: 'ERIC',
      Ranking: 'C2',
      Index: 10
    },
    {
      Id: 102749,
      Name: 'POFFE',
      FirstName: 'FREDERIC',
      Ranking: 'C2',
      Index: 10
    },
    {
      Id: 103178,
      Name: 'RORIVE',
      FirstName: 'SYLVAIN',
      Ranking: 'C2',
      Index: 10
    },
    {
      Id: 141870,
      Name: 'VAN DE VELDE',
      FirstName: 'SEBASTIEN',
      Ranking: 'C2',
      Index: 10
    },
    {
      Id: 135529,
      Name: 'AVAUX',
      FirstName: 'THIERRY',
      Ranking: 'C4',
      Index: 12
    },
    {
      Id: 138557,
      Name: 'DUMONT',
      FirstName: 'ALAIN',
      Ranking: 'C4',
      Index: 12
    },
    {
      Id: 101289,
      Name: 'ASGARY',
      FirstName: 'ALIREZA',
      Ranking: 'C6',
      Index: 18
    },
    {
      Id: 124897,
      Name: 'CZERWENKA',
      FirstName: 'KARL',
      Ranking: 'C6',
      Index: 18
    },
    {
      Id: 111939,
      Name: 'DESSAINT',
      FirstName: 'MATHIEU',
      Ranking: 'C6',
      Index: 18
    },
    {
      Id: 102796,
      Name: 'JENQUIN',
      FirstName: 'JACQUES',
      Ranking: 'C6',
      Index: 18
    },
    {
      Id: 104426,
      Name: 'NOLASCO',
      FirstName: 'SANDRO',
      Ranking: 'C6',
      Index: 18
    },
    {
      Id: 131174,
      Name: 'PIERQUIN',
      FirstName: 'FABRICE',
      Ranking: 'C6',
      Index: 18
    },
    {
      Id: 124563,
      Name: 'DEBASTE',
      FirstName: 'SEBASTIEN',
      Ranking: 'D0',
      Index: 20
    },
    {
      Id: 106045,
      Name: 'LANGLAIS',
      FirstName: 'BASTIEN',
      Ranking: 'D0',
      Index: 20
    },
    {
      Id: 105859,
      Name: 'JANSSENS',
      FirstName: 'PATRICK',
      Ranking: 'D2',
      Index: 25
    },
    {
      Id: 103274,
      Name: 'LUCION',
      FirstName: 'RENAUD',
      Ranking: 'D2',
      Index: 25
    },
    {
      Id: 124859,
      Name: 'MULLENEERS',
      FirstName: 'JULIEN',
      Ranking: 'D2',
      Index: 25
    },
    {
      Id: 155357,
      Name: 'OLIVIER',
      FirstName: 'DANIEL',
      Ranking: 'D2',
      Index: 25
    },
    {
      Id: 103969,
      Name: 'VAUSORT',
      FirstName: 'LUC',
      Ranking: 'D2',
      Index: 25
    },
    {
      Id: 103365,
      Name: 'VANDERLINDEN',
      FirstName: 'DIDIER',
      Ranking: 'D4',
      Index: 27
    },
    {
      Id: 150759,
      Name: 'VANHORICK',
      FirstName: 'QUENTIN',
      Ranking: 'D4',
      Index: 27
    },
    {
      Id: 104215,
      Name: 'HAZARD',
      FirstName: 'GUY',
      Ranking: 'D6',
      Index: 30
    },
    {
      Id: 140203,
      Name: 'JANSSENS',
      FirstName: 'JEAN-CLAUDE',
      Ranking: 'D6',
      Index: 30
    },
    {
      Id: 104282,
      Name: 'VANDERLINDEN',
      FirstName: 'VIRGINIE',
      Ranking: 'D6',
      Index: 30
    },
    {
      Id: 106048,
      Name: 'CARLY',
      FirstName: 'JACQUES',
      Ranking: 'E0',
      Index: 37
    },
    {
      Id: 109375,
      Name: 'CASSIMAN',
      FirstName: 'ARLETTE',
      Ranking: 'E0',
      Index: 37
    },
    {
      Id: 149182,
      Name: 'DE POT',
      FirstName: 'LUCA',
      Ranking: 'E0',
      Index: 37
    },
    {
      Id: 152131,
      Name: 'LIBERT',
      FirstName: 'JEAN-MARC',
      Ranking: 'E0',
      Index: 37
    },
    {
      Id: 126349,
      Name: 'MULLENEERS',
      FirstName: 'ERIC',
      Ranking: 'E0',
      Index: 37
    },
    {
      Id: 107363,
      Name: 'VAN DORPE',
      FirstName: 'MARIETTE',
      Ranking: 'E0',
      Index: 37
    },
    {
      Id: 125954,
      Name: 'WALBERS',
      FirstName: 'YANNICK',
      Ranking: 'E0',
      Index: 37
    },
    {
      Id: 137818,
      Name: 'COLLART',
      FirstName: 'ALAIN',
      Ranking: 'E2',
      Index: 45
    },
    {
      Id: 156878,
      Name: 'DERUYVER',
      FirstName: 'CHRISTIAN',
      Ranking: 'E2',
      Index: 45
    },
    {
      Id: 106020,
      Name: 'FUMIERE',
      FirstName: 'FABRICE',
      Ranking: 'E2',
      Index: 45
    },
    {
      Id: 107089,
      Name: 'HENRY',
      FirstName: 'DANIELE',
      Ranking: 'E2',
      Index: 45
    },
    {
      Id: 108304,
      Name: 'JENQUIN',
      FirstName: 'FREDERIC',
      Ranking: 'E2',
      Index: 45
    },
    {
      Id: 131032,
      Name: 'MULLENEERS',
      FirstName: 'JOHAN',
      Ranking: 'E2',
      Index: 45
    },
    {
      Id: 108039,
      Name: 'SOREL VANDERLINDEN',
      FirstName: 'MICHELE',
      Ranking: 'E2',
      Index: 45
    },
    {
      Id: 105456,
      Name: 'VAN DORPE',
      FirstName: 'HARRY',
      Ranking: 'E2',
      Index: 45
    },
    {
      Id: 146468,
      Name: 'BALAND',
      FirstName: 'BRUNO',
      Ranking: 'E4',
      Index: 51
    },
    {
      Id: 109660,
      Name: 'BAUSSART',
      FirstName: 'GILLES',
      Ranking: 'E4',
      Index: 51
    },
    {
      Id: 160669,
      Name: 'BRISACK',
      FirstName: 'JEAN-CLAUDE',
      Ranking: 'E4',
      Index: 51
    },
    {
      Id: 148041,
      Name: 'PETIT',
      FirstName: 'JOACHIM',
      Ranking: 'E4',
      Index: 51
    },
    {
      Id: 151747,
      Name: 'SODDU',
      FirstName: 'UMBERTO',
      Ranking: 'E4',
      Index: 51
    },
    {
      Id: 154313,
      Name: 'VANALPHEM',
      FirstName: 'JEAN PIERRE',
      Ranking: 'E4',
      Index: 51
    },
    {
      Id: 117567,
      Name: 'DEBAST',
      FirstName: 'FABIENNE',
      Ranking: 'E6',
      Index: 67
    },
    {
      Id: 138556,
      Name: 'HARDAT',
      FirstName: 'ANNE-MARIE',
      Ranking: 'E6',
      Index: 67
    },
    {
      Id: 145419,
      Name: 'HULLAERT',
      FirstName: 'AXEL',
      Ranking: 'E6',
      Index: 67
    },
    {
      Id: 143006,
      Name: 'STEVENS',
      FirstName: 'TOM',
      Ranking: 'E6',
      Index: 67
    },
    {
      Id: 158051,
      Name: 'TAHRI',
      FirstName: 'YOUSSEF',
      Ranking: 'E6',
      Index: 67
    },
    {
      Id: 156593,
      Name: 'VANDERGHEYNST',
      FirstName: 'NATHAN',
      Ranking: 'E6',
      Index: 67
    },
    {
      Id: 156592,
      Name: 'CHEVALIER',
      FirstName: 'YANNIS',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 158990,
      Name: 'CLERCKX',
      FirstName: 'STEEVE',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 160371,
      Name: 'DA COSTA - LIMA',
      FirstName: 'LUDOVIC',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 158481,
      Name: 'FRITSCH',
      FirstName: 'GEOFFREY',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 156883,
      Name: 'JESPERS',
      FirstName: 'ALEXANDRE',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 152774,
      Name: 'JEUNIEAUX',
      FirstName: 'EMILIEN',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 156795,
      Name: 'PARADOMS',
      FirstName: 'MARKO',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 156884,
      Name: 'PIECQ',
      FirstName: 'ANTOINE',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 157968,
      Name: 'POP',
      FirstName: 'CLAUDIU CRISTIAN',
      Ranking: 'NC',
      Index: 67
    },
    {
      Id: 156886,
      Name: 'RAVETZ',
      FirstName: 'JULEA',
      Ranking: 'NC',
      Index: 67
    }
  ].map(player => {
    return {
      ...player,
      FirstName: capitalize(player.FirstName),
      Name: capitalize(player.Name)
    };
  });
}
