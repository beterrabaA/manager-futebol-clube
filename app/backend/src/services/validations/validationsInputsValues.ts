import { loginSchema } from './schemas';

const validateLogin = (email: string, password: string) => {
  const { error } = loginSchema.validate({ email, password });
  const response = error?.message || '';
  const { type } = error?.details[0] || {};
  if (type === 'string.email' || type === 'string.min') {
    return { type: 'unauthorized', message: { message: response } };
  }
  if (error) return { type: 'badRequest', message: { message: response } };

  return { type: 'NULL', message: '' };
};

export default validateLogin;
