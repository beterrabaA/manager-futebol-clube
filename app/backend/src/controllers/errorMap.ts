const errorMap = {
  success: 200,
  created: 201,
  invalidToken: 401,
  missingKey: 400,
  productNotFound: 404,
  invalidData: 422,
  conflict: 409,
} as { [key: string]: number };

const mapError = (type: string) => errorMap[type] || 500;

export default mapError;
