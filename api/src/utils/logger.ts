export class Logger {
  static info(msg: string) {
    process.stdout.write(`\x1b[36m[INFO]\x1b[0m ${msg}\x1b[0m\n`);
  }

  static error(msg: string, err?: any): void {
    process.stderr.write(`\x1b[31m[ERROR] ${msg}\x1b[0m\n`);
    if (err !== undefined) {
      console.error(err);
    }
  }
}
