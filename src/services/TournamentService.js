const LOCAL_STORAGE_KEY_TOURNAMENTS = 'tt-tournaments';

let tournaments;

export function cloneTournament(tournament) {
  return {
    ...tournament,
    poolConfig: { ...tournament.poolConfig },
    pools: { ...tournament.pools },
  };
}

export function deleteTournament(tournament) {
  tournaments = tournaments.filter(t => t !== tournament);
  updateLocalStorage(tournaments);
}

export function replaceTournament(oldTournament, newTournament) {
  const idx = tournaments.indexOf(oldTournament);
  tournaments[idx] = newTournament;
  updateLocalStorage(tournaments);
}

export function addTournament(tournament) {
  tournaments = [...tournaments, tournament];
  updateLocalStorage(tournaments);
}

export function getTournaments() {
  if (!tournaments) {
    let strTournaments = localStorage.getItem(LOCAL_STORAGE_KEY_TOURNAMENTS);
    if (strTournaments) {
      tournaments = JSON.parse(strTournaments);
    } else {
      tournaments = [];
      updateLocalStorage(tournaments);
    }
  }
  return [...tournaments];
}

function updateLocalStorage(tournaments) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY_TOURNAMENTS,
    JSON.stringify(tournaments)
  );
}
