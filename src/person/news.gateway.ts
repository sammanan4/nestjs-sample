import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NewsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;

  private listeners: { [key: string]: Socket; } = {};


  private logger: Logger = new Logger('NewsGateway');

  afterInit(server: Server) {
    this.logger.log('Web Socket Gateway Initialised!!!');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Web Socket Gateway Connected by ${client.id}`);
    this.listeners[client.handshake.query.userId as string] = client;
  }


  handleDisconnect(client: Socket) {
    this.logger.log(`Web Socket Gateway Disonnected by ${client.id}!!!`);
    delete this.listeners[client.handshake.query.userId as string];
  }
  

  sendNewsToClient(data: { userId: string; content: string }) {
    this.listeners[data.userId].emit('newsReceived', data.content)
  }

}
