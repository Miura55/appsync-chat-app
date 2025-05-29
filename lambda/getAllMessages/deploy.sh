#!/bin/bash

# 依存関係のインストール
npm install

# デプロイパッケージの作成
zip -r function.zip .

echo "デプロイパッケージ function.zip が作成されました。"
echo "AWS Lambda コンソールまたは AWS CLI を使用してデプロイしてください。"
echo ""
echo "AWS CLI を使用する場合の例:"
echo "aws lambda create-function \\"
echo "  --function-name getAllMessages \\"
echo "  --runtime nodejs18.x \\"
echo "  --handler index.handler \\"
echo "  --zip-file fileb://function.zip \\"
echo "  --role arn:aws:iam::<アカウントID>:role/lambda-dynamodb-role"
echo ""
echo "既存の関数を更新する場合:"
echo "aws lambda update-function-code \\"
echo "  --function-name getAllMessages \\"
echo "  --zip-file fileb://function.zip"
