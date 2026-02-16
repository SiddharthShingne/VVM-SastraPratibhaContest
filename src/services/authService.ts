// login API call
export const loginUser = async (
  request: (
    endpoint: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>,
  username: string,
  password: string,
) => {
  return request("/login", "POST", { username, password });
};
