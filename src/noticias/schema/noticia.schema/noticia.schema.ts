import { Schema } from 'mongoose';

const ComentarioSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  texto: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

const SeccionSchema = new Schema({
  nombre: { type: String, required: true },
  icono: { type: String, required: true },
  _id: { type: Schema.Types.ObjectId, required: false }
});

export const NoticiaSchema = new Schema(
  {
    imagenes: { type: [String], required: true },
    titulo: { type: String, required: true, index: true },
    subtitulo: { type: String, required: true },
    seccion: { type: SeccionSchema, required: true },
    autor: { type: String, required: true, index: true },
    fecha: { type: Date, default: Date.now },
    contenido: { type: String, required: true },
    comentarios: { type: [ComentarioSchema], default: [] },
  },
  { versionKey: false },
);
