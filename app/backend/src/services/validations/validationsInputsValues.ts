import { loginSchema } from './schemas';

const validateLogin = (email: string, password: string) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) return { type: 'missingKey', message: { message: error.message } };

  return { type: 'NULL', message: '' };
};

export default validateLogin;
