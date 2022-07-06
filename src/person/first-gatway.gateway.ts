import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { path: '/first-gateway', cors: {origin: '*'}, namespace: '/socket' })
export class FirstGatwayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;
  
  
  private logger: Logger = new Logger('FirstGatwayGateway');

  
  afterInit(server: Server) {
    this.logger.log('Web Socket Gateway Initialised!!!');
  }
  
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Web Socket Gateway Connected by ${client.id}!!!`);
  }
  
  
  handleDisconnect(client: Socket) {
    this.logger.log(`Web Socket Gateway Disonnected by ${client.id}!!!`);
  }
  // gig worker -> submit -> event -> client



  
  @SubscribeMessage('requestToServer')
  async handleMessage(client: Socket, data: string): Promise<void> { //WsResponse<string> {
    for (let i = 0; i < 10; i++) {
      // emits to all subscribers
      // this.wss.to('8923749238324534').emit()
      // this.wss.emit('responseToClient', data);
      
      // emits to current client
      client.emit('responseToClient', data);
      // sleep
      await new Promise(resolve => setTimeout(resolve, 1000));
      // this.logger.log(`Web Socket Gateway Request to Server by ${client.id}!!!`);
    }
    // return { event: 'responseToClient', data: data};
  }
}
