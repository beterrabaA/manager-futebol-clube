import Placar from '../interfaces/placar.interface';
import listLead from '../interfaces/listLead.interface';

export const sortList = (list: listLead[]) =>
  list.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });

export const contaVitorias = (placar:Placar[]) => {
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  placar.forEach((e: Placar) => {
    if (e.feito > e.levado) {
      totalVictories += 1;
    } else if (e.feito === e.levado) {
      totalDraws += 1;
    } else {
      totalLosses += 1;
    }
  });

  return {
    totalVictories,
    totalDraws,
    totalLosses };
};
