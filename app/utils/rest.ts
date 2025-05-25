import axios from "axios";

interface Event {
  sender: string;
  message: string;
}

const appsyncPublish = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT_HTTP}/event`,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY || "",
  }
});

export const publishEvent = async (event: Event) => {
  try {
    const response = await appsyncPublish.post("", {
      "channel": "default/channel",
      "events": [
        JSON.stringify({
          sender: event.sender,
          message: event.message,
        })
      ]
    });
    return response.data;
  } catch (error) {
    console.error("Error publishing event:", error);
    // ネットワークエラーの場合はより詳細な情報を表示
    if (axios.isAxiosError(error) && !error.response) {
      console.error("ネットワークエラー: AppSyncエンドポイントに接続できません。");
    }
    throw error;
  }
}
