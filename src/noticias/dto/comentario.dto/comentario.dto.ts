import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
