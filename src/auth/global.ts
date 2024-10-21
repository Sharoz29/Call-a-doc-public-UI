export const pegaBaseUrl = "https://web.pega23.lowcodesol.co.uk";
export function hostUrl(server: any) {
  console.log(server);
  return (
    // process.env.node_env === "production" || server === "web"
    // ? pegaBaseUrl
    // :
    "http://localhost:5173"
  );
}
