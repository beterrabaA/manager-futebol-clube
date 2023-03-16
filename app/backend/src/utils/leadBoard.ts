import listLead from '../interfaces/listLead.interface';

const sortList = (list: listLead[]) =>
  list.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });

export default sortList;
