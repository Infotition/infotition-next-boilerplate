#!/usr/bin/env node
import createBoilerplate from './helpers/createBoilerplate';

const args = process.argv.slice(2);

if (args.length === 0) {
  throw new Error('Project name parameter is required');
}

if (args.length > 1) {
  throw new Error('To many command parameters');
}

const projectName = args[0];
const dir = `./${projectName}`;

createBoilerplate(dir);
