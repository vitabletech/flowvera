export function footerBuildNumber(env: NodeJS.ProcessEnv): string {
  if (env.GITHUB_ACTIONS !== "true") return "Local build";

  for (const name of ["GITHUB_RUN_NUMBER", "GITHUB_RUN_ATTEMPT"]) {
    const value = env[name];
    if (!/^[1-9]\d*$/.test(value ?? "") || !Number.isSafeInteger(Number(value))) {
      throw new Error(`${name} must be a positive safe integer for GitHub builds.`);
    }
  }

  return `Build ${env.GITHUB_RUN_NUMBER}.${env.GITHUB_RUN_ATTEMPT}`;
}
