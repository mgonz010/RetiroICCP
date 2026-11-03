import random

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def generar_porcentaje_asistencia():
    if random.random() < 0.15:
        return 100
    return random.randint(60, 99)


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    nombre = db.Column(db.String(100))
    rol = db.Column(db.String(50))


class Alumno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    apellido = db.Column(db.String(100))
    curso = db.Column(db.String(20))
    rut = db.Column(db.String(20))
    asistencia = db.Column(db.Integer, nullable=False, default=generar_porcentaje_asistencia)