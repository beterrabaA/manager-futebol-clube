import Match from '../../interfaces/match.interface';
import { loginSchema } from './schemas';

export const validateLogin = (email: string, password: string) => {
  const { error } = loginSchema.validate({ email, password });
  const response = error?.message || '';
  const { type } = error?.details[0] || {};
  if (type === 'string.email' || type === 'string.min') {
    return { type: 'unauthorized', message: { message: response } };
  }
  if (error) return { type: 'badRequest', message: { message: response } };

  return { type: 'NULL', message: '' };
};

export const validateTeams = (data: Match) => {
  const { homeTeamId, awayTeamId } = data;
  if (homeTeamId === awayTeamId) {
    return {
      type: 'unprocessable',
      message: { message: 'It is not possible to create a match with two equal teams' } };
  }

  return { type: 'NULL', message: '' };
};
