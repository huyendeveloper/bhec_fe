## Getting Started

First, run the development server:

```bash
docker-compose build
docker-compose up -d
```
Docker [http://localhost:3001/](http://localhost:3001/)

```bash
npm run dev
# or
yarn dev
```

Local [http://localhost:3000/](http://localhost:3000/)


-----------------------------------------------------------------------------------------

## 初期設定

1. パッケージインストールと環境設定
```sh
$ npm install

# huskyが実行されるようにする
$ npx husky-init

# (npm installがうまくいかない場合のみ)
$ npm ci

# (commit時にeslintが効かない場合)
$ chmod ug+x .husky/*
$ chmod ug+x .git/hooks/*
```

## コマンドについて

```sh
# 起動
$ npm run dev
# フォーマッタ(コミット前に実行する)
$ npm run fix
```
## コーディング規約

```sh
# 準備中
```
## CSS規約

```sh
# 準備中
```
