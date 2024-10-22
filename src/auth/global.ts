export function hostUrl(server: any) {
  console.log(server);
  return (
    // process.env.node_env === "production" || server === "web"
    // ? pegaBaseUrl
    // :
    "http://localhost:5173"
  );
}
export const endpoints = {
  PEGAURL: `https://web.pega23.lowcodesol.co.uk`,
  PEGAAPIURL: `https://web.pega23.lowcodesol.co.uk/prweb/app/call-a-doctor/api/application/v2`,
  client_id: "14965090564081136535",
  client_secret: "5038AA181BD81B18D9E6113E7668A9FD",
  grant_type: "client_credentials",

  CASETYPES: "/casetypes",
  CASES: "/cases",
  ACTIONS: "/actions",
  ASSIGNMENTS: "/assignments",
};
