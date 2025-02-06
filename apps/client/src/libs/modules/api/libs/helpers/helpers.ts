const configureString = <T extends Record<string, string>>(
  ...parameters: [...string[], T]
): string => {
  const copiedArguments: string[] = parameters.slice(0, -1).map(String);
  const options = parameters[parameters.length - 1] as T;

  let result = copiedArguments.join("");

  for (const [key, value] of Object.entries(options)) {
    result = result.replace(`:${key}`, value);
  }

  return result;
};

const configureQueryString = (
  baseUrl: string,
  parameters?: ConstructorParameters<typeof URLSearchParams>[number],
): string => {
  if (!parameters) {
    return baseUrl;
  }

  const filteredParams = Object.fromEntries(
    Object.entries(parameters).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

  const searchParameters = new URLSearchParams(filteredParams);

  return searchParameters.toString()
    ? `${baseUrl}?${searchParameters.toString()}`
    : baseUrl;
};

export { configureString, configureQueryString };
