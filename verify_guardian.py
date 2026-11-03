def asegurar_apoderado_universal(datos):
    if not isinstance(datos.get("apoderados"), list):
        datos["apoderados"] = []
    universal = next((
        g for g in datos["apoderados"]
        if g and (
            int(g.get("id", -1) or -1) == 0 or
            g.get("nombre") == "Apoderado Universal" or
            str(g.get("rut", "")).lower() == "11.111.111-1"
        )
    ), None)
    apoderado_universal = {
        "id": 0,
        "nombre": "Apoderado Universal",
        "rut": "11.111.111-1",
        "telefono": "+56 9 0000 0000",
        "email": "universal@escuela.cl",
        "alumnoId": None,
        "parentesco": "General",
        "estado": "Activo",
    }
    if not universal:
        datos["apoderados"].insert(0, apoderado_universal)
        return True
    universal.update({**apoderado_universal, "id": 0, "alumnoId": None, "estado": "Activo"})
    return True

for apoderados in (
    [{"id": 2, "nombre": "Otro", "rut": "12.222.222-2", "alumnoId": 2}],
    [],
):
    datos = {"apoderados": apoderados, "alumnos": [{"id": 1, "nombre": "Ana"}, {"id": 2, "nombre": "Beto"}]}
    asegurar_apoderado_universal(datos)
    alumno_id = 2
    rut = "11.111.111-1"
    encontrado = next((
        g for g in datos["apoderados"]
        if g and
        (str(g.get("rut", "")).strip().lower() == rut) and
        (g.get("alumnoId") is None or int(g.get("alumnoId")) == alumno_id) and
        (int(g.get("id", -1) or -1) == 0 or
         g.get("nombre") == "Apoderado Universal" or
         str(g.get("rut", "")).lower() == "11.111.111-1")
    ), None)
    print(f"len={len(datos['apoderados'])} guardado={datos['apoderados'][0]['rut']} encontrado={bool(encontrado)}")
