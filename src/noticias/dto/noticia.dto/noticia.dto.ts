import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SeccionDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  icono: string;
}

export class NoticiaDto {
  @IsOptional()
  @IsString()
  _id?: string;

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

  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsOptional()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  contenido: string;

  @ValidateNested()
  @Type(() => SeccionDto)
  @IsNotEmpty()
  seccion: SeccionDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComentarioDto)
  comentarios: ComentarioDto[];
}

export class ComentarioDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  texto: string;
}