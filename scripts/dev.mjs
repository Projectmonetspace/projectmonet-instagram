import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const input = process.argv.slice(2);
const args = [];
for (let index = 0; index < input.length; index += 1) {
  const argument = input[index];
  if (argument === "--strictPort") continue;
  if (argument === "--host") {
    args.push("--hostname");
    if (input[index + 1]) args.push(input[++index]);
    continue;
  }
  args.push(argument);
}

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextBin, "dev", ...args], { stdio: "inherit" });
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
