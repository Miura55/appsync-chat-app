import axios from "axios";

interface Event {
  sender: string;
  message: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

// AppSync API client
const appsyncPublish = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT_HTTP as string}/event`,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string,
  }
});

// Chat Data API client
const chatDataApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHAT_DATA_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  }
});

// AppSync publish event function
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
};

// Chat Data API functions
export const fetchMessages = async (): Promise<ChatMessage[]> => {
  try {
    const response = await chatDataApi.get("/");
    const responseBody= JSON.parse(response.data.body)
    const messages: ChatMessage[] = responseBody.messages.map((msg: any) => ({
      id: msg.id,
      sender: msg.sender,
      message: msg.message,
      timestamp: msg.timestamp,
    }));
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    if (axios.isAxiosError(error) && !error.response) {
      console.error("Network error: Cannot connect to Chat Data API.");
    }
    throw error;
  }
  /* eslint @typescript-eslint/no-explicit-any: 0 */
};
