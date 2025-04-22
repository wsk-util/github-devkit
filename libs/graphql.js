const { env } = require("../config/env");

env.load();

let graphql;

(async () => {
  const { graphql: _graphql } = await import("@octokit/graphql");
  graphql = _graphql.defaults({
    headers: {
      authorization: `token ${env.GITHUB_TOKEN}`,
    },
  });
})();

module.exports = async (...args) => {
  while (!graphql) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return graphql(...args);
};
