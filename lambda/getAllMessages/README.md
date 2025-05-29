# GetAllMessages Lambda Function

この Lambda 関数は、DynamoDB テーブル `appsync_events_chat` から全てのメッセージデータを取得します。API Gateway と連携して使用することを想定しています。

## 機能

- DynamoDB テーブル `appsync_events_chat` から全データを取得
- API Gateway からのリクエストを処理
- CORS 対応済み

## デプロイ方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. デプロイパッケージの作成

```bash
zip -r function.zip .
```

### 3. AWS Lambda へのデプロイ

AWS Management Console または AWS CLI を使用してデプロイします。

AWS CLI を使用する場合:

```bash
aws lambda create-function \
  --function-name getAllMessages \
  --runtime nodejs18.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role arn:aws:iam::<アカウントID>:role/lambda-dynamodb-role
```

### 4. 必要な IAM 権限

Lambda 実行ロールには以下の権限が必要です:

- `dynamodb:Scan` - appsync_events_chat テーブルに対する読み取り権限

### 5. API Gateway との連携

API Gateway で新しい REST API を作成し、この Lambda 関数と統合します。

## レスポンス形式

成功時のレスポンス:

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  },
  "body": {
    "messages": [...],  // メッセージの配列
    "count": 10,        // 取得したアイテム数
    "scannedCount": 10  // スキャンしたアイテム数
  }
}
```

エラー時のレスポンス:

```json
{
  "statusCode": 500,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  },
  "body": {
    "message": "Failed to fetch messages",
    "error": "エラーメッセージ"
  }
}
```
