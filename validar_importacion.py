from app import app, cargar_alumnos_desde_csv
from models import db, Alumno

with app.app_context():
    db.create_all()
    cargar_alumnos_desde_csv()
    total = Alumno.query.count()
    alumno_344 = Alumno.query.filter_by(codigo=344).first()
    print(f"total_alumnos={total}")
    print(f"alumno_344={alumno_344.nombre if alumno_344 else 'sin_dato'}")
    print(f"asistencia_344={alumno_344.asistencia if alumno_344 else 'sin_dato'}")
