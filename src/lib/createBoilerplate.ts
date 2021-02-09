#!/usr/bin/env node

import fs from 'fs';
import copyfiles from 'copyfiles';
import path from 'path';

import runComnmand from './runCommand';

const main = require?.main?.filename || '';
const publicDir = path.join(main, '../../public');

async function createBoilerplate(dir: string) {
  //* Create Folders and Files

  console.log(`---- creating project directory ----\n`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else {
    throw new Error('Project already exists');
  }

  console.log(`---- creating pages, api, public and styles folder ----\n`);
  fs.mkdirSync(`${dir}/src`);
  fs.mkdirSync(`${dir}/src/components`);
  fs.mkdirSync(`${dir}/src/pages`);
  fs.mkdirSync(`${dir}/src/pages/api`);
  fs.mkdirSync(`${dir}/src/public`);
  fs.mkdirSync(`${dir}/src/styles`);

  console.log(`---- creating index.tsx file ----\n`);
  copyfiles(
    [`${publicDir}/index.tsx`, `${dir}/src/pages`],
    { up: true },
    () => {}
  );

  console.log(`---- creating _app.tsx file ----\n`);
  copyfiles(
    [`${publicDir}/_app.tsx`, `${dir}/src/pages`],
    { up: true },
    () => {}
  );

  console.log(`---- creating globals.scss file ----\n`);
  copyfiles(
    [`${publicDir}/globals.scss`, `${dir}/src/styles`],
    { up: true },
    () => {}
  );

  console.log(`---- creating favicon.ico file ----\n`);
  copyfiles(
    [`${publicDir}/favicon.ico`, `${dir}/src/public`],
    { up: true },
    () => {}
  );

  console.log(`---- creating tsconfig.json file ----\n`);
  copyfiles([`${publicDir}/tsconfig.json`, `${dir}`], { up: true }, () => {});

  console.log(`---- creating .prettierrc file ----\n`);
  copyfiles([`${publicDir}/.prettierrc`, `${dir}`], { up: true }, () => {});

  console.log(`---- creating .prettierignore file ----\n`);
  copyfiles([`${publicDir}/.prettierignore`, `${dir}`], { up: true }, () => {});

  console.log(`---- creating .eslintrc file ----\n`);
  copyfiles([`${publicDir}/.eslintrc`, `${dir}`], { up: true }, () => {});

  console.log(`---- creating .eslintignore file ----\n`);
  copyfiles([`${publicDir}/.eslintignore`, `${dir}`], { up: true }, () => {});

  console.log(`---- creating .editorconfig file ----\n`);
  copyfiles([`${publicDir}/.editorconfig`, `${dir}`], { up: true }, () => {});

  console.log(`---- creating .stylelintrc.json file ----\n`);
  copyfiles(
    [`${publicDir}/.stylelintrc.json`, `${dir}`],
    { up: true },
    () => {}
  );

  console.log(`---- creating .gitignore file ----\n`);
  // copyfiles([`${publicDir}/.gitignore`, `${dir}`], { up: true }, () => {});
  const ignore = `# dependencies\n/node_modules\n/.pnp\n.pnp.js\n\n# testing\n/coverage\n\n# next.js\n/.next/\n/out/\n\n# production\n/build\n\n# misc\n.DS_Store\n*.pem\n\n# debug\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# local env files\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n\n# vercel\n.vercel`;
  fs.writeFileSync(`${dir}/.gitignore`, ignore, 'utf8');

  //* Initializing npm project

  console.log(`---- create and edit package.json file ----\n`);
  await runComnmand(dir, 'npm init -y');

  const packagejson = JSON.parse(
    fs.readFileSync(`${dir}/package.json`, 'utf8')
  );

  packagejson.scripts = {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
    lint: 'eslint src --ext .ts,.tsx',
    'lint:fix': 'npm run lint -- --fix',
  };
  packagejson['lint-staged'] = {
    'src/**/*.{ts,tsx}': 'npm run lint:fix',
  };
  packagejson.husky = {
    hooks: {
      'pre-commit': 'lint-staged',
    },
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

  //* Installing dependencies

  console.log(`---- installing next.js dependencies ----\n`);
  await runComnmand(dir, 'npm install react react-dom next');

  console.log(`---- installing typescript dev dependencies ----\n`);
  await runComnmand(
    dir,
    'npm install typescript @types/react @types/react-dom @types/node -D'
  );

  console.log(`---- installing linting dev dependencies ----\n`);
  await runComnmand(
    dir,
    'npm install eslint eslint-plugin-import eslint-config-airbnb-base @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks -D'
  );

  console.log(`---- installing pre commit hook dev dependencies ----\n`);
  await runComnmand(dir, 'npm install husky lint-staged -D');

  console.log(`---- installing styling dependencies ----\n`);
  await runComnmand(dir, 'npm install sass');

  console.log(`---- installing styling linting dependencies ----\n`);
  await runComnmand(
    dir,
    'npm install stylelint stylelint-config-sass-guidelines -D'
  );

  //* Initialize Project

  console.log(`---- initialize git repository ----\n`);
  await runComnmand(dir, 'git init');

  console.log(`---- building next.js project ----\n`);
  await runComnmand(dir, 'npm run build');
}

export default createBoilerplate;
