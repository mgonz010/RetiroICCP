from flask import Flask, jsonify, request, render_template
from sqlalchemy import text

from models import db, Usuario, Alumno, generar_porcentaje_asistencia

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


def asegurar_columna_asistencia():
    with app.app_context():
        columnas = [col['name'] for col in db.inspect(db.engine).get_columns('alumno')]
        if 'asistencia' not in columnas:
            db.session.execute(text('ALTER TABLE alumno ADD COLUMN asistencia INTEGER NOT NULL DEFAULT 0'))
            db.session.commit()

        for alumno in Alumno.query.all():
            if alumno.asistencia is None or alumno.asistencia == 0:
                alumno.asistencia = generar_porcentaje_asistencia()
        db.session.commit()


with app.app_context():
    db.create_all()
    asegurar_columna_asistencia()

    if not Usuario.query.first():
        db.session.add_all([
            Usuario(usuario='admin', password='1234', nombre='Administrador', rol='Administrador'),
            Usuario(usuario='inspector', password='1234', nombre='Inspector General', rol='Inspector'),
            Usuario(usuario='profesor', password='1234', nombre='Profesor', rol='Profesor'),
            Usuario(usuario='apoderado', password='1234', nombre='Apoderado Demo', rol='Apoderado'),
        ])
        db.session.commit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/alumnos', methods=['GET'])
def get_alumnos():
    alumnos = Alumno.query.order_by(Alumno.id).all()

    for alumno in alumnos:
        if alumno.asistencia is None or alumno.asistencia == 0:
            alumno.asistencia = generar_porcentaje_asistencia()
    db.session.commit()

    return jsonify([
        {
            "id": a.id,
            "nombre": a.nombre,
            "apellido": a.apellido,
            "curso": a.curso,
            "rut": a.rut,
            "asistencia": int(a.asistencia)
        }
        for a in alumnos
    ])

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    usuario = data.get('usuario')
    password = data.get('password')

    if not usuario or not password:
        return jsonify({"ok": False, "error": "Faltan credenciales"}), 400

    user = Usuario.query.filter_by(usuario=usuario, password=password).first()
    if user:
        return jsonify({"ok": True, "nombre": user.nombre, "rol": user.rol})
    return jsonify({"ok": False, "error": "Credenciales incorrectas"}), 401

if __name__ == '__main__':
    app.run(debug=True)