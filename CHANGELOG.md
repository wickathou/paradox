# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2023-12-16
### Added
- `paradoxApp.js` file to create a sample app
- `npm run paradox-app` command to run the sample app
- In code documentation
    - See [Paradox.buildElement](https://github.com/ProjectPenrose/paradox/blob/main/src/core/buildElement.js)
    - See [Paradox.Router](https://github.com/ProjectPenrose/paradox/blob/main/src/core/Router.js)
    - See [Paradox.pubsub](https://github.com/ProjectPenrose/paradox/blob/main/src/core/Pubsub.js)

### Changed
- `Paradox.Router`: `query` property is now a `URLSearchParams` object and `params` property is now a `Map` object wich is populated with params added in the `path` property of the route. See [Paradox.Router](https://github.com/ProjectPenrose/paradox?tab=readme-ov-file#routes-with-paradoxrouter) for more information.

## [0.1.0] - 2023-12-14
### Change
* Delete unnecessary files and update dependencies
* Ready to turn into a npm package

## [0.0.2] - 2023-03-11
### Added
* `concurrently` package to allow run the app just with `npm run dev` By [@alexsc6955](https://github.com/alexsc6955)
