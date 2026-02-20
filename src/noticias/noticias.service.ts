import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Noticia,
  ResponsePaginated,
} from './interfaces/noticia/noticia.interface';
import { ComentarioDto, NoticiaDto } from './dto/noticia.dto/noticia.dto';

@Injectable()
export class NoticiasService {
  constructor(@InjectModel('Noticia') private noticiaModel: Model<Noticia>) {}

  async addNoticia(noticiaDto: NoticiaDto): Promise<any> {
    const noticia = new this.noticiaModel(noticiaDto);
    return noticia.save();
  }

  async getNoticias(): Promise<Noticia[]> {
    return this.noticiaModel.find().exec();
  }

  async getNoticiasPaginated(
    page: number,
    limit: number,
  ): Promise<ResponsePaginated> {
    const skip = (page - 1) * limit;

    const result = await this.noticiaModel
      .find()
      .sort({ fecha: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.noticiaModel.countDocuments();

    return {
      data: result,
      info: {
        totalNoticias: total,
        totalPages: Math.ceil(total / limit),
        page,
        limit,
      },
    };
  }

  async getNoticia(idNoticia: string): Promise<Noticia> {
    const noticia = await this.noticiaModel.findById(idNoticia).exec();
    if (!noticia) {
      throw new NotFoundException({
        status: false,
        message: 'Noticia no encontrada.',
      });
    }
    return noticia;
  }

  async searchNoticia(termino: string): Promise<Noticia[]> {
    const regex = new RegExp(termino, 'i');
    return this.noticiaModel
      .find({
        $or: [{ titulo: regex }, { autor: regex }],
      })
      .exec();
  }

  async putNoticia(id: string, noticiaDto: NoticiaDto): Promise<any> {
    const updateNoticia = await this.noticiaModel
      .findByIdAndUpdate(id, { $set: noticiaDto }, { new: true })
      .exec();
    if (!updateNoticia) {
      throw new NotFoundException({
        status: false,
        message: 'Noticia no encontrada.',
      });
    }
    return updateNoticia;
  }

  async deleteNoticia(id: string): Promise<any> {
    const deletedNoticia = await this.noticiaModel.findByIdAndDelete(id).exec();
    if (!deletedNoticia) {
      throw new NotFoundException({
        status: false,
        message: 'Noticia no encontrada.',
      });
    }
    return deletedNoticia;
  }

  async getSecciones(): Promise<any[]> {
    return this.noticiaModel.find().distinct('seccion').exec();
  }

  async getNoticiasBySeccion(seccion: string): Promise<Noticia[]> {
    const regex = new RegExp(seccion, 'i');
    return this.noticiaModel.find({ 'seccion.nombre': regex }).exec();
  }

  async addComentario(
    idNoticia: string,
    comentarioDto: ComentarioDto,
  ): Promise<Noticia> {
    const updateNoticia = await this.noticiaModel
      .findByIdAndUpdate(
        idNoticia,
        { $push: { comentarios: comentarioDto } },
        { new: true },
      )
      .exec();

    if (!updateNoticia) {
      throw new NotFoundException({
        status: false,
        message: 'Noticia no encontrada para añadir el comentario.',
      });
    }
    return updateNoticia;
  }

  async getNoticiasBySeccionPaginated(
    seccion: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.noticiaModel
        .find({ 'seccion.nombre': seccion })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.noticiaModel.countDocuments({ 'seccion.nombre': seccion }).exec(),
    ]);

    return {
      data,
      info: {
        totalNoticias: total,
        totalPages: Math.ceil(total / limit),
        page,
        limit,
      },
    };
  }
}
