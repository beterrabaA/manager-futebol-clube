import { loginSchema } from './schemas';

const validateLogin = (email: string, password: string) => {
  const { error } = loginSchema.validate({ email, password });
  const response = error?.message || '';
  const { type } = error?.details[0] || {};
  console.log(type);
  if (type === 'string.email') return { type: 'invalidToken', message: { message: response } };
  if (error) return { type: 'missingKey', message: { message: response } };

  return { type: 'NULL', message: '' };
};

export default validateLogin;
