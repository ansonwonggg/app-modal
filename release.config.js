/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    branches: ["main", {"name": "beta", "prerelease": true}],
    extends: "semantic-release-monorepo"
}