# Local environment setup

This guide should help you to setup the RASCH-STACK dev environment on your local machine. (This guide was written for macOS, the experience for Windows users might differ)

## Prerequisites

The following applications/tools should be installed on your machine

- [Node.js®](https://nodejs.org/en/)
- A node version manager either [FNM](https://github.com/Schniz/fnm) (FNM is faster) or [NVM](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/en/docs/install) package manager
- Docker (recommended: [Orbstack](https://orbstack.dev/download))
- Make sure to [generate yourself a local certificate using mkcert](/docs/LOCAL_NGINX.md)

## Setup

Make sure all tools are installed and work.

1. Clone the RASCH-STACK `git clone git@github.com:rasch-dtc/rasch-stack.git`
2. `cd` into the directory
3. Run `nvm use` or `fnm use` (depending on the node version manager that you've installed)
   - Running this command should use the node version that is specified in the `.nvmrc` file. Run `node -v` to verify that you're now using the same node version as defined in the `.nvmrc` file.
4. Run `yarn` to install all dependencies
5. Run `yarn persistgraphql:all` to fetch the required graphql introspection data
6. Generate yourself a local certificate once, see [Spotlight](https://spotlight.rms.rocks/documentation/integrations/mkcert)

You should now be able to run `yarn dev` choose a publciation and a cms endpoint. Visit http://localhost:3000 to see the website running locally.

`yarn build` will start a production build. When the build is done run `yarn start` and visit http://localhost:3000.

> **Note:**
>
> - `yarn dev` will automatically reload your page when you change something in the code. Keep in mind that this is a client-side only build of the website.
> - `yarn build` is a production build of the site, this includes SSR (Server side rendering). When you change something in the code, you have to run `yarn build` again.

## Ads in the local dev environment

Ads will not be displayed on http://localhost:3000 thefore you have to modify your HOSTS file and map a domainname to your local IP address. Edit the HOSTS file in the terminal `nano /etc/hosts` and add the following line:

```bash
127.0.0.1	localhost
127.0.0.1	dev.local  #<- add this line below your localhost entry
```

After saving the file you can open http://dev.local:3000 and you should see ads.

## AWS CLI

Make sure to download the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-version.html) (version 2 is recommended).

Then, follow [this guide](https://www.youtube.com/watch?v=CdZifyg46MY) to add your AWS config locally (you need to have your access and secret key for both prod and develop).

## Code Editor/IDE

Using Microsoft's open source editor [Visual Studio Code](https://code.visualstudio.com/download) is probably your best choice.

Here is a list of useful settings and plugins that make your life easier.

### VSCode Plugins

Plugins marked with \*) are essential, all others are optional but very useful.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) \*)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) \*)
- [sort-imports](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports) (ask for the config file) \*)
- [Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [PostCSS syntax](https://marketplace.visualstudio.com/items?itemName=ricard.PostCSS)
- [TODO Hightlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
- [Template String Converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

### VSCode Settings

Most of the VS Code settings are defined in the repo itself (see [settings.json](/.vscode/settings.json))

Paste these settings in your `settings.json` file. Press `⌘⇧P` or `F1` to open the command palette, search for _"preferences: open settings (json)"_ and hit enter. This is the place to add custom settings.

Shows the full path of the currently opened file as the title of the window:

```json
"window.title": "${activeEditorLong}${separator}${rootName}",
```

Excludes the build directory for a search:

```json
 "search.exclude": {
    "**/build": true
  },
```

## Browser

### Chrome Extensions

Extensions marked with \*) are essential, all others are optional but very useful.

The links lead to the chrome extension store, most of these extensions should also be available for Firefox, some are already built in like a JSON formatter.

- [DTC Plugin](https://github.com/rasch-dtc/rasch-chrome-extension) \*)
- [Apollo Client Developer Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)
- [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)
- [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj)
- [Quick Javascript Switcher](https://chrome.google.com/webstore/detail/quick-javascript-switcher/geddoclleiomckbhadiaipdggiiccfje)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [ChromeiQL](https://chrome.google.com/webstore/detail/chromeiql/fkkiamalmpiidkljmicmjfbieiclmeij)
- [PerfectPixel by WellDoneCode](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi)
- [ColorZilla](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp)
- [Page Ruler](https://chrome.google.com/webstore/detail/page-ruler/jcbmcnpepaddcedmjdcmhbekjhbfnlff)
- [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)

### DevTools Settings

It's highly recommended to disable the cache in DevTools under the Network tab.

## Pushing your first commit (Git config)

It can happen that you are not able to successfully push your commits. In that case, make sure to fire following command in your Terminal:

```bash
sudo git config --system --unset credential.helper
```

Also, make sure you have set your git config:

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@ringieraxelspringer.ch
```
