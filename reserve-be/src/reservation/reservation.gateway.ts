import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ReservationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => ReservationService))
    private readonly reservationService: ReservationService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const timeSlots = await this.reservationService.getTimeSlots();
    client.emit('timeSlots', timeSlots);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  async broadcastTimeSlots() {
    const timeSlots = await this.reservationService.getTimeSlots();
    this.server.emit('timeSlots', timeSlots);
  }
}
