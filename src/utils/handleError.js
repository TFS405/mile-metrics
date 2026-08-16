export default function handleError(
  errorString,
  { error, ...args } = {},
  returnError = false,
) {
  const optionsObj = {};

  if (error !== undefined) optionsObj.cause = { error };
  if (Object.keys(args).length > 0)
    optionsObj.cause = { ...optionsObj.cause, ...args };

  const errorObj = new Error(errorString, optionsObj);

  if (returnError === true) return errorObj;
  throw errorObj;
}
