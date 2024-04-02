export function sanitize(input: string) {
  if (input.length === 0) return "";

  const sanitizedInput = input.replace(/<\/?[^>]+(>|$)/g, "");

  const isValid = /^[a-zA-Z0-9\s]*$/.test(sanitizedInput);

  return isValid ? sanitizedInput : null;
}
