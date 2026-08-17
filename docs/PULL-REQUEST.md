# Pull-Requests

## PR contains

- [ ] link to ticket
- [ ] link to (all) pr instance(s) covering all scenarios/states
- [ ] understandable testing info
- [ ] if needed, deployment instructions
- [ ] unit test coverage increased or at least stayed the same
- [ ] CI passes

## Reviewer Checklist

- [ ] files are in the right directory (especially for files in `shared`)
- [ ] code is formatted using prettier
- [ ] code is splitted in re-usable blocks
- [ ] unit test coverage increased or at least stayed the same
- [ ] CI passes

## Release branches

Releases are also just PRs. Naming of release branches follow gitflow convention and is named like `release/2018-19` (year - calendar week).
OpenShift detects branch name and sets target to `stage` env. All flags are ignored!

## Flags on PR Titles

We can use special flags on the title of a PR to define certain states.

### Titles

| Title starts with | Explanation                                     |
| ----------------- | ----------------------------------------------- |
| PNT-              | create PR instances for all PNT applications ⚠️ |
| RAS-              | create PR instances for all ras applications ⚠️ |
| DTC-              | create PR instances for all ras applications ️⚠️ |
| DTCPP-            | create PR instances for all ras applications ️⚠️ |
| RDP-              | create PR instances for all ras applications ️⚠️ |
| AD-               | create PR instances for all ras applications ️⚠️ |
| [HZ]              | create PR instances only for `HZ` application   |
| [GM]              | create PR instances only for `GM` application   |
| [BEO]             | create PR instances only for `BEO` application  |
| [BG]              | create PR instances only for `BG` application   |
| [SI]              | create PR instances only for `SI` application   |
| [CASH]            | create PR instances only for `CASH` application |

⚠️ If your change only affects one publication. Please add a `-` or `@` infront of the PR title, to save resources on openshift. Use the publication prefix to build for the specific publication e.g. `@PNT-XXX: Task that only affects BEO [BEO]`. BIL is **excluded** of this rule!
️

### Flags

| Flag          | Explanation                                                                                                          | Position |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| [WIP]         | work in progress                                                                                                     | pre      |
| [DEV]         | use graphql api from `develop` backend (default)                                                                     | post     |
| [STAGE]       | use graphql api from `stage` backend                                                                                 | post     |
| [PREVIEW]     | use graphql api from `stage` backend using `preview` requests                                                        | post     |
| [UPDATE]      | use graphql api from `update` backend                                                                                | post     |
| [PIANO]       | by default for all PR instances is Piano disabled. to enable it, add this flag                                       | post     |
| [PERFORMANCE] | use graphql api from `performance` backend (only one PR should point to the **performance** environment at any time) | post     |

### Examples

`HZ-XXX some title [BIL]` will create an instance for `HZ` and `BIL`  
`SI-XXX some other title [BEO] [GM] [STAGE]` will create instances for `SI`, `BEO` and `GM` and all will point to the `stage` backend.

### Labels

| Flag | Explanation                                                                                                                                                                              |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CD   | Continuous deployment - set this label so that jenkins will run deployments for your preview on all git push otherwise keep in mind to call a build on [devcon](https://devcon.ras.dev/) |
| CI   | Continuous integration is added automatically at first Jenskins run                                                                                                                      |
