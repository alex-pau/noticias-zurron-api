import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { ComentarioDto, NoticiaDto } from './dto/noticia.dto/noticia.dto';
import { PaginationDto } from './dto/pagination.dto/pagination.dto';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post('')
  async addNoticia(@Body() noticiaDto: NoticiaDto) {
    try {
      await this.noticiasService.addNoticia(noticiaDto);
      return {
        status: true,
        message: 'Noticia añadida con éxito.',
      };
    } catch (e) {
      throw new BadRequestException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get('')
  async getNoticias() {
    try {
      const data = await this.noticiasService.getNoticias();
      return {
        status: true,
        noticias: data,
      };
    } catch (e) {
      throw new BadRequestException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get('page')
  async getNoticiasPaginated(@Query() paginationDto: PaginationDto) {
    try {
      const page = paginationDto.page || 1;
      const limit = paginationDto.limit || 5;

      const data = await this.noticiasService.getNoticiasPaginated(page, limit);
      return {
        status: true,
        ...data,
      };
    } catch (e: any) {
      throw new BadRequestException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get('secciones')
  async getSecciones() {
    try {
      const data = await this.noticiasService.getSecciones();
      return {
        status: true,
        secciones: data,
      };
    } catch (e) {
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get('buscar')
  async searchNoticia(@Query('termino') termino: string) {
    try {
      const data = await this.noticiasService.searchNoticia(termino);
      return {
        status: true,
        noticias: data,
      };
    } catch (e) {
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get('seccion/:seccion')
  async getNoticiasBySeccion(
    @Param('seccion') seccion: string,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      const page = paginationDto.page || 1;
      const limit = paginationDto.limit || 5;

      const data = await this.noticiasService.getNoticiasBySeccionPaginated(
        seccion,
        page,
        limit,
      );
      return {
        status: true,
        ...data,
      };
    } catch (e: any) {
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get('noticia/:id')
  async getNoticia(@Param('id') id: string) {
    try {
      const data = await this.noticiasService.getNoticia(id);
      return {
        status: true,
        noticia: data,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Put('update/:id')
  async putNoticia(@Param('id') id: string, @Body() noticiaDto: NoticiaDto) {
    try {
      await this.noticiasService.putNoticia(id, noticiaDto);
      return {
        status: true,
        message: 'Noticia actualizada con éxito.',
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Delete('delete/:id')
  async deleteNoticia(@Param('id') id: string) {
    try {
      await this.noticiasService.deleteNoticia(id);
      return {
        status: true,
        message: 'Noticia eliminada con éxito.',
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Post('noticia/:id/comentario')
  async addComentario(
    @Param('id') id: string,
    @Body() comentarioDto: ComentarioDto,
  ) {
    try {
      const data = await this.noticiasService.addComentario(id, comentarioDto);
      return {
        status: true,
        message: 'Comentario añadido con éxito.',
        noticia: data,
      };
    } catch (e: any) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException({
        status: false,
        message: e.message,
      });
    }
  }
}
