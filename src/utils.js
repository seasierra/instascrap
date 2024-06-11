export function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export const post = (endpoint, data) => {
  return fetch(new URL(`${process.env.VERCEL_URL}/api/${endpoint}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
