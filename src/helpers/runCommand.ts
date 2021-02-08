#!/usr/bin/env node

import util from 'util';
import childProcess from 'child_process';

const exec = util.promisify(childProcess.exec);

async function runComnmand(dir: string, cmd: string) {
  const { stdout } = await exec(cmd, { cwd: `${dir}` });
  console.log(`${stdout}`);
}

export default runComnmand;
