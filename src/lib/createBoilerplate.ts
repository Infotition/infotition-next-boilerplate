#!/usr/bin/env node

import fs from 'fs';
import runComnmand from './runCommand';

async function createBoilerplate(dir: string) {
  console.log(`---- creating project directory ----\n`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else {
    throw new Error('Project already exists');
  }

  console.log(`---- creating pages, api, public and styles folder ----\n`);
  fs.mkdirSync(`${dir}/pages`);
  fs.mkdirSync(`${dir}/pages/api`);
  fs.mkdirSync(`${dir}/public`);
  fs.mkdirSync(`${dir}/styles`);

  console.log(`---- creating index.tsc file ----\n`);
  fs.writeFileSync(
    `${dir}/pages/index.tsx`,
    'const Index = () => (\n  <div>\n    <p>Infotition Next.js Boilerplate.</p>\n  </div>\n)\nexport default Index'
  );

  console.log(`---- create and edit package.json file ----\n`);
  await runComnmand(dir, 'npm init -y');

  const packagejson = JSON.parse(
    fs.readFileSync(`${dir}/package.json`, 'utf8')
  );

  packagejson.scripts = {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
  };
  packagejson.private = true;
  packagejson.license = 'MIT';
  packagejson.version = '0.1.0';
  packagejson.repository = {
    type: 'git',
    url: 'git+<url>',
  };
  delete packagejson.main;

  fs.writeFileSync(
    `${dir}/package.json`,
    JSON.stringify(packagejson, null, 2),
    'utf8'
  );

  console.log(`---- installing next.js dependencies ----\n`);
  await runComnmand(dir, 'npm install react react-dom next');

  console.log(`---- installing typescript dev dependencies ----\n`);
  await runComnmand(
    dir,
    'npm install typescript @types/react @types/react-dom @types/node -D'
  );

  console.log(`---- creating tsconfig.json file ----\n`);
}

export default createBoilerplate;
