const convertToBoolean = (input: string): boolean | undefined => {
  try {
    return JSON.parse(input.toLowerCase());
  } catch (e) {
    return undefined;
  }
};

export default convertToBoolean;
