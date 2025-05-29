const AWS = require('aws-sdk');

// DynamoDBクライアントの初期化
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// テーブル名
const TABLE_NAME = 'appsync_events_chat';

/**
 * appsync_events_chatテーブルから全メッセージを取得するLambda関数
 */
exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  
  try {
    // DynamoDBからすべてのデータを取得
    const params = {
      TableName: TABLE_NAME
    };
    
    // DynamoDBのscanオペレーションを使用して全データを取得
    const result = await dynamoDB.scan(params).promise();
    
    // 成功レスポンスを返す
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // CORS対応
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        messages: result.Items,
        count: result.Count,
        scannedCount: result.ScannedCount
      })
    };
  } catch (error) {
    console.error('Error fetching messages:', error);
    
    // エラーレスポンスを返す
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // CORS対応
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: 'Failed to fetch messages',
        error: error.message
      })
    };
  }
};
