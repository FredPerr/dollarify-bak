# Dollarify

![Dollarify logo](./docs/banner.jpg)

[![semantic-release](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
<a href="https://github.com/semantic-release/semantic-release/actions?query=workflow%3ATest+branch%3Amaster">
<img alt="Build states" src="https://github.com/semantic-release/semantic-release/workflows/Test/badge.svg">
</a>

**The No-Hassle Budget Tracker and Finances Planning App**

## Getting Started

Clone this repository and run the following commands:

Install the dependencies:

- `pnpm i && pnpm prepare`

## Running Commmands

Refer to the `package.json` scripting commands to manage this project.

The following commands are some examples of commonly used commands...

### Building

Build all the project:

- `pnpm build`

Build only the `core` project:

- `pnpm build:core`

Build only the `web` project:

- `pnpm build:web`

### Running the Next.js Web Project

Run the development server of the `web` project:

- `pnpm run:dev` or `pnpm run`

Run the production server of the `web` project:

- `pnpm run:prod`

### Testing the Project

Test all the packages:

- `pnpm test`

Test the `core` package:

- `pnpm test:core`

Test the `web` package:

- `pnpm test:web`
