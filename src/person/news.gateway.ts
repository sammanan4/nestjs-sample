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

  private logger: Logger = new Logger('NewsGateway');

  afterInit(server: Server) {
    this.logger.log('Web Socket Gateway Initialised!!!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Web Socket Gateway Connected by ${client.id}!!!`);
  }


  handleDisconnect(client: Socket) {
    this.logger.log(`Web Socket Gateway Disonnected by ${client.id}!!!`);
  }
  
  
  @SubscribeMessage('leaveNewsRoom')
  handleLeaveRoom(client: Socket, data: {room : string}) {
    console.log('nws room left');
    client.leave(data.room);
  }

  @SubscribeMessage('joinNewsRoom')
  handleJoinRoom(client: Socket, data: {room : string}) {
    console.log('nws room joined', data.room);
    client.join(data.room);
  }


  sendNewsToClient(data: { room: string; content: string }) {
    console.log('sending news', data.room);
    
    this.wss.to(data.room).emit('newsReceived', data.content);
  }

  // @SubscribeMessage('requestToServer')
  // async handleMessage(client: Socket, data: string): Promise<void> { //WsResponse<string> {
  // for (let i = 0; i < 10; i++) {
  // emits to all subscribers
  // this.wss.emit('responseToClient', `Hello ${data}`);

  // emits to current client
  // client.emit('responseToClient', data);
  // sleep
  // await new Promise(resolve => setTimeout(resolve, 1000));
  // this.logger.log(`Web Socket Gateway Request to Server by ${client.id}!!!`);
  // }
  // return { event: 'responseToClient', data: data};
  // }
}


// room id: 123456