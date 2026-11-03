"""
importar_csv.py

Importa los alumnos desde un archivo CSV hacia database.db.
"""

import csv
from pathlib import Path

from app import app
from models import db, Alumno, generar_porcentaje_asistencia

ARCHIVO_CSV = Path(__file__).with_name("alumnos_666.csv")

MAPEO = {
    "codigo": "codigo",
    "Nombres": "nombre",
    "a_paterno": "a_paterno",
    "a_materno": "a_materno",
    "rut": "rut",
    "sexo": "sexo",
    "comuna": "comuna",
    "nacionalidad": "nacionalidad",
    "f_nacimiento": "f_nacimiento",
    "curso": "curso",
}


def normalizar(valor):
    if valor is None:
        return None
    texto = str(valor).strip()
    return texto if texto else None


def importar():
    with app.app_context():
        if not ARCHIVO_CSV.exists():
            raise FileNotFoundError(f"No existe el CSV: {ARCHIVO_CSV}")

        with ARCHIVO_CSV.open(newline="", encoding="utf-8") as archivo:
            lector = csv.DictReader(archivo)
            nuevos = 0
            actualizados = 0

            for fila in lector:
                rut = normalizar(fila.get("rut"))
                if not rut:
                    continue

                alumno = Alumno.query.filter_by(rut=rut).first()
                if alumno is None:
                    alumno = Alumno()
                    db.session.add(alumno)
                    nuevos += 1
                else:
                    actualizados += 1

                for columna_csv, campo_modelo in MAPEO.items():
                    valor = normalizar(fila.get(columna_csv))
                    if campo_modelo == "codigo":
                        alumno.codigo = int(valor) if valor and valor.isdigit() else None
                    else:
                        setattr(alumno, campo_modelo, valor)

                alumno.nombre = normalizar(fila.get("Nombres"))
                alumno.apellido = " ".join(
                    filter(None, [normalizar(fila.get("a_paterno")), normalizar(fila.get("a_materno"))])
                )

                if alumno.codigo == 344:
                    alumno.asistencia = 96
                elif alumno.asistencia is None or alumno.asistencia == 0:
                    alumno.asistencia = generar_porcentaje_asistencia()

            db.session.commit()
            print(f"Listo. {nuevos} alumnos nuevos, {actualizados} actualizados.")


if __name__ == "__main__":
    importar()
