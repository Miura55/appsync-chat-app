# AppSync Events Chat App

このプロジェクトは、AWS AppSync Eventsを使用したリアルタイムチャットアプリケーションのサンプルです。

## Getting Started

### .envファイル

アプリケーションのルートディレクトリに`.env`ファイルを作成し、以下の環境変数を設定してください。

```plaintext
NEXT_PUBLIC_APPSYNC_ENDPOINT_HTTP=<AppSyncで取得したHTTPのDNSエンドポインt>
NEXT_PUBLIC_APPSYNC_ENDPOINT_REALTIME=<AppSyncで取得したリアルタイムのDNSエンドポイント>
NEXT_PUBLIC_APPSYNC_API_KEY=<AppSyncで取得したAPIキー>
```

### インストール

以下のコマンドを実行して、必要な依存関係をインストールします。

```bash
npm install
```

### 開発サーバーの起動

次のコマンドを実行して、開発サーバーを起動します。

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
