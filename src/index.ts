import { CRON_FIELDS } from './configuration';
import { parseCronString } from './parser';
import { ParsedCron } from './interfaces';

export const formatParsedCron = (parsedCron: ParsedCron): string => {
  return CRON_FIELDS.map(({ name }) => {
    const value = Array.isArray(parsedCron[name]) ? parsedCron[name].join(' ') : parsedCron[name];
    return `${name.padEnd(14, ' ')}${value}`;
  }).join('\n');
};

const main = (): void => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: ts-node src/index "<cron_string>"');
    console.error('Example: ts-node src/index "*/15 0 1,15 jan-jun mon-fri /usr/bin/find"');
    process.exit(1);
  }

  const cronString = args[0];

  try {
    const parsedCron = parseCronString(cronString);
    const output = formatParsedCron(parsedCron);
    console.log(output);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error occurred.');
    }
    process.exit(2);
  }
};

if (require.main === module) {
  main();
}
