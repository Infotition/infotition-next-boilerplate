#!/usr/bin/env node

import fs from 'fs';
import copyfiles from 'copyfiles';
import runComnmand from './runCommand';

async function createBoilerplate(dir: string) {
  console.log(`---- creating project directory ----\n`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else {
    throw new Error('Project already exists');
  }

  console.log(`---- creating pages, api, public and styles folder ----\n`);
  fs.mkdirSync(`${dir}/src`);
  fs.mkdirSync(`${dir}/src/pages`);
  fs.mkdirSync(`${dir}/src/pages/api`);
  fs.mkdirSync(`${dir}/src/public`);
  fs.mkdirSync(`${dir}/src/styles`);

  console.log(`---- creating index.tsc file ----\n`);
  fs.writeFileSync(
    `${dir}/src/pages/index.tsx`,
    "import { NextPage } from 'next';\n\nconst Index: NextPage = () => (\n  <div>\n    <h1>Infotition Next.js Boilerplate 💡</h1>\n  </div>\n);\n\nexport default Index;"
  );

  console.log(`---- creating index.tsc file ----\n`);
  copyfiles(
    ['../public/index.tsx', `${dir}/src/pages`],
    { up: true },
    () => {}
  );

  console.log(`---- creating _app.tsc file ----\n`);
  copyfiles(['../public/_app.tsx', `${dir}/src/pages`], { up: true }, () => {});

  console.log(`---- creating globals.scss file ----\n`);
  copyfiles(
    ['../public/globals.scss', `${dir}/src/styles`],
    { up: true },
    () => {}
  );

  console.log(`---- creating favicon.ico file ----\n`);
  copyfiles(
    ['../public/favicon.ico', `${dir}/src/public`],
    { up: true },
    () => {}
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

  console.log(`---- installing next.js dependencies ----\n`);
  await runComnmand(dir, 'npm install react react-dom next');

  console.log(`---- installing typescript dev dependencies ----\n`);
  await runComnmand(
    dir,
    'npm install typescript @types/react @types/react-dom @types/node -D'
  );

  console.log(`---- creating tsconfig.json file ----\n`);
  fs.writeFileSync(`${dir}/tsconfig.json`, '', 'utf8');

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

  console.log(`---- creating .prettierrc file ----\n`);
  copyfiles(['../public/.prettierrc', `${dir}`], { up: true }, () => {});

  console.log(`---- creating .prettierignore file ----\n`);
  copyfiles(['../public/.prettierignore', `${dir}`], { up: true }, () => {});

  console.log(`---- creating .gitignore file ----\n`);
  copyfiles(['../public/.gitignore', `${dir}`], { up: true }, () => {});

  console.log(`---- creating .eslintrc file ----\n`);
  copyfiles(['../public/.eslintrc', `${dir}`], { up: true }, () => {});

  console.log(`---- creating .eslintignore file ----\n`);
  copyfiles(['../public/.eslintignore', `${dir}`], { up: true }, () => {});

  console.log(`---- creating .editorconfig file ----\n`);
  copyfiles(['../public/.editorconfig', `${dir}`], { up: true }, () => {});

  console.log(`---- creating .stylelintrc.json file ----\n`);
  copyfiles(['../public/.stylelintrc.json', `${dir}`], { up: true }, () => {});
}

export default createBoilerplate;
