import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SeccionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  icono: string;
}

export class NoticiaDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  imagenes: string[];

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  subtitulo: string;

  @ValidateNested()
  @Type(() => SeccionDto)
  @IsNotEmpty()
  seccion: SeccionDto;

  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsOptional()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  contenido: string;
}
