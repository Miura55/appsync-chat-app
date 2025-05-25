import ReconnetWebSocket from "reconnecting-websocket";
import { v4 as uuidv4 } from "uuid";

export class SubscribeEvent {
  private ws: ReconnetWebSocket;

  constructor() {
    const headerInfo = {
      host: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT_HTTP as string,
      "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string,
    };
    const encodedHeaderInfo = btoa(JSON.stringify(headerInfo))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    
    this.ws = new ReconnetWebSocket(
      `wss://${
        process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT_REALTIME as string
      }/event/realtime`,
      ["aws-appsync-event-ws", `header-${encodedHeaderInfo}`]
    );

    this.ws.onopen = () => {
      console.log("WebSocket connection opened");
    };
    
    this.ws.send(JSON.stringify({
      "type": "subscribe",
      "id": this.generateUuid(),
      "channel": "/default/channel",
      "authorization": {
        "host": process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT_HTTP as string,
        "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string,
      }
    }));
  }

  onMessage(callback: (data: any) => void) {
    this.ws.addEventListener("message", (event) => {
      callback(JSON.parse(event.data));
    });
  }

  onErrors(callback: (error: any) => void) {
    this.ws.addEventListener("error", (event) => {
      callback(event);
    });
  }

  close() {
    this.ws.close();
  }

  removeEventListener() {
    this.ws.removeEventListener("message", () => {});
    this.ws.removeEventListener("error", () => {});
  }
  
  /**
   * ランダムなUUIDを生成します
   * @returns 生成されたUUID文字列
   */
  generateUuid(): string {
    return uuidv4();
  }
  /* eslint @typescript-eslint/no-explicit-any: 0 */
}
