const errorMap = {
  success: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  invalidData: 422,
} as { [key: string]: number };

const mapError = (type: string) => errorMap[type] || 500;

export default mapError;
