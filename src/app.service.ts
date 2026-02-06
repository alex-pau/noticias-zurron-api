import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servicio API Rest Noticias Ayuntamiento de Zurrón - Versión 1.0.0. Conexión establecida.';
  }
}
