from app import app
from models import db, Usuario, Alumno

with app.app_context():
    db.create_all()
    db.session.add(Usuario(usuario="admin", password="1234", nombre="Administrador", rol="Administrador"))
    db.session.add(Usuario(usuario="inspector", password="1234", nombre="Inspector General", rol="Inspector"))
    db.session.add(Usuario(usuario="profesor", password="1234", nombre="Profesor", rol="Profesor"))
    db.session.add(Usuario(usuario="apoderado", password="1234", nombre="Apoderado Demo", rol="Apoderado"))
    db.session.commit()
    print("Base de datos creada y poblada correctamente")