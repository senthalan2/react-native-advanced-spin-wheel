# Contributing

Thank you for your interest in contributing to **react-native-advanced-spin-wheel** 🎉

Repository: [https://github.com/senthalan2/react-native-advanced-spin-wheel](https://github.com/senthalan2/react-native-advanced-spin-wheel)

Contributions of any size are welcome!

We aim to keep this community friendly, respectful, and inclusive. Please follow the guidelines in our [Code of Conduct](./CODE_OF_CONDUCT.md) in all project interactions.

---

## 📦 Project Overview

**react-native-advanced-spin-wheel** is a fully JavaScript-based React Native library.

### Key Details

- ✅ Built entirely with React Native (no native Android/iOS code)
- ❌ No `android/` or `ios/` folders
- ❌ No `.podspec` file
- ✅ Written in TypeScript
- ✅ Uses Jest for testing
- ✅ Uses Prettier for formatting
- ✅ Supports React Native CLI & Expo
- ✅ Uses Yarn 4 (packageManager: yarn@4.11.0)
- ✅ Can also be installed and tested via npm

Because this package does not contain native modules, **no native rebuild is required** when making changes.

---

## 🛠 Development Setup

### 1️⃣ Clone the repository

git clone https://github.com/senthalan2/react-native-advanced-spin-wheel.git  
cd react-native-advanced-spin-wheel

### 2️⃣ Install dependencies

This project uses **Yarn 4** (recommended):

yarn install

You may also use npm if needed:

npm install

---

## 📁 Project Structure

src/ → Source code (TypeScript)  
lib/ → Build output (if generated)  
example/ → Example usage (App.tsx only)

There is no standalone example project. Example usage is available in:

example/App.tsx

---

## 🧪 Testing Changes Locally

Since this is a library package, you can test changes in two ways:

### Option 1 — Using `npm pack` (Recommended)

From the library root:

npm pack

Then install the generated `.tgz` file inside your test React Native project:

npm install ../react-native-advanced-spin-wheel-x.x.x.tgz

---

### Option 2 — Using `yarn link` or `npm link`

From the library:

yarn link

Then inside your test project:

yarn link react-native-advanced-spin-wheel

If Metro has issues resolving the package:

npx react-native start --reset-cache

---

## 🚀 Available Scripts

Based on `package.json`, the following scripts are available:

### Run tests

yarn test

or

npm test

Uses **Jest** with `react-native` preset.

---

### Type checking

yarn typecheck

or

npm run typecheck

Runs the TypeScript compiler (`tsc`).

---

## 🧹 Code Formatting

This project uses **Prettier** with the following rules:

- Single quotes
- 2 space indentation
- Trailing commas (es5)
- Consistent quote props

Please format your code before submitting a PR:

npx prettier --write .

---

## 🧠 Technical Guidelines

- Write code in **TypeScript**
- Keep the library fully JavaScript-based (no native modules)
- Ensure compatibility with:
  - React Native CLI
  - Expo

- Avoid breaking API changes without discussion
- Keep performance in mind (animations use Reanimated)

---

## 📝 Commit Message Convention

We follow the **Conventional Commits** specification:

[https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

### Allowed types:

- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code refactor
- `docs` — Documentation changes
- `test` — Add/update tests
- `chore` — Tooling or config changes

### Examples:

feat: add segment gradient support  
fix: correct spin calculation on high velocity  
refactor: simplify angle normalization logic  
docs: update usage example

Please keep commit messages clear and descriptive.

---

## 📤 Publishing (Maintainers Only)

This package is published to npm:

https://registry.npmjs.org/

To publish a new version:

1.  Update version in `package.json`
2.  Ensure tests pass
3.  Publish:

npm publish

---

## 🔁 Pull Request Guidelines

When submitting a pull request:

- Keep PRs small and focused.
- Ensure `yarn test` passes.
- Ensure `yarn typecheck` passes.
- Format code with Prettier.
- Update documentation if needed.
- For API changes, open an issue first.

---

## 🐛 Reporting Issues

When creating an issue, please include:

- React Native version
- Platform (iOS / Android / Both)
- Expo or CLI?
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots or logs (if applicable)

Issue tracker:

[https://github.com/senthalan2/react-native-advanced-spin-wheel/issues](https://github.com/senthalan2/react-native-advanced-spin-wheel/issues)

---

## ❤️ Thank You

Your contributions help improve **react-native-advanced-spin-wheel** for the entire community.

We appreciate your time, effort, and support! 🚀
