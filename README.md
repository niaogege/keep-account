# 记账

record account

## QuickStart

<!-- add docs here for user -->

see [egg docs]for more detail.

### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

### Deploy

```bash
npm start
npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[egg]: https://eggjs.org

### 服务端里的数据库密码

如何安全的保存，也就是通过配置的方式下方？

### 自动化部署失败

```yml
name: DeployAli

on:
  push:
    branches:
      - main

env:
  TARGET_DIR: /www/web/keepAcount

jobs:
  deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]
    steps:
      - name: Checkout # 步骤1
        uses: actions/checkout@v3 # 使用的动作。格式：userName/repoName。作用：检出仓库，获取源码。 官方actions库：https://github.com/actions

      - name: Use Node.js # 步骤2
        uses: actions/setup-node@v3 # 作用：安装nodejs
        with:
          node-version: ${{ matrix.node-version }} # 版本

      - name: Deploy Server
        uses: cross-the-world/ssh-scp-ssh-pipelines@latest
        env:
          WELCOME: "welcome CPP server"
          LASTSSH: "cpp success"
        with:
          host: "47.101.50.136"
          user: "root"
          pass: ${{ secrets.ALI_PASSWORD }}
          connect_timeout: 20s
          first_ssh: |-
            rm -rf $TARGET_DIR
            echo $WELCOME
            mkdir -p $TARGET_DIR
          scp: |-
            '.' => $TARGET_DIR/
          last_ssh: |-
            # npm install
            npm run dev
            echo $LASTSSH
```
