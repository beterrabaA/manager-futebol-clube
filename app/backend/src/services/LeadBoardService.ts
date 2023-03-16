import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';
import sortList from '../utils/leadBoard';

interface Placar {
  feito: number;
  levado: number;
}

export default class LeadService {
  private match: ModelStatic<Matches>;
  private team: ModelStatic<Teams>;

  constructor() {
    this.match = Matches;
    this.team = Teams;
  }

  public async getTeams() {
    const teams = await this.team.findAll();

    return teams;
  }

  protected async getList() {
    const matches = await this.match.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    const filtered = matches.filter((e) => e.inProgress === false);
    return filtered;
  }

  protected contaVitorias = (placar:Placar[]) => {
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

  protected async getMatches(id: number) {
    const matches = await this.getList();

    const timeCasa = matches.filter(
      (e) => e.homeTeamId === id,
    ).map((t) => ({ feito: t.homeTeamGoals, levado: t.awayTeamGoals }));

    const timeVisitante = matches.filter(
      (e) => e.awayTeamId === id,
    ).map((t) => ({ feito: t.awayTeamGoals, levado: t.homeTeamGoals }));

    return [...timeCasa, ...timeVisitante];
  }

  protected async somaGoals(id: number) {
    const goals = await this.getMatches(id);
    const goalsFavor = goals.reduce((a, b) => a + b.feito, 0);
    const goalsOwn = goals.reduce((a, b) => a + b.levado, 0);
    const contagem = await this.contaVitorias(goals);
    const { totalVictories, totalDraws } = contagem;

    const totalPoints = totalVictories * 3 + totalDraws;
    const totalGames = goals.length;

    return {
      totalPoints,
      totalGames,
      ...contagem,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  }

  public async getAllLead() {
    const times = await this.getTeams();
    const tabela = await Promise.all(times.map(async (e) => {
      const soma = await this.somaGoals(e.id);
      return ({
        name: e.teamName,
        ...soma,
      });
    }));

    return { type: 'success', message: sortList(tabela) };
  }
}
