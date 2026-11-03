/* =========================================================
   CONDOREDU
   Sistema institucional de gestión escolar
   JavaScript principal
   ========================================================= */

/* =========================================================
   1. CONFIGURACIÓN Y DATOS
   ========================================================= */

const STORAGE_KEY = "condoredu_data_v1";
const THEME_KEY = "condoredu_theme";

const CURSOS_BASE = [
    "7° Básico",
    "8° Básico",
    "1° Medio A",
    "1° Medio B",
    "1° Medio C",
    "1° Medio D",
    "2° Medio A",
    "2° Medio B",
    "2° Medio C",
    "2° Medio D",
    "3° Medio A",
    "3° Medio B",
    "3° Medio C",
    "3° Medio D",
    "4° Medio A",
    "4° Medio B",
    "4° Medio C",
    "4° Medio D"
];

function generarAsistenciaAleatoria() {
    if (Math.random() < 0.15) {
        return 100;
    }
    return 60 + Math.floor(Math.random() * 40);
}

function aplicarTema(tema = localStorage.getItem(THEME_KEY) || "light") {
    document.body.dataset.theme = tema;
    const boton = document.getElementById("themeToggle");

    if (boton) {
        boton.textContent = tema === "dark" ? "☀️" : "🌙";
        boton.setAttribute(
            "aria-label",
            tema === "dark"
                ? "Activar tema claro"
                : "Activar tema oscuro"
        );
    }
}

function poblarCursosDisponibles() {
    const select = document.getElementById("course");

    if (!select) return;

    const cursos = [...new Set(
        datos.alumnos
            .map(alumno => alumno.curso)
            .filter(Boolean)
    )];

    const ordenados = [...cursos].sort((a, b) => {
        const indiceA = CURSOS_BASE.indexOf(a);
        const indiceB = CURSOS_BASE.indexOf(b);

        if (indiceA !== -1 && indiceB !== -1) return indiceA - indiceB;
        if (indiceA !== -1) return -1;
        if (indiceB !== -1) return 1;
        return String(a).localeCompare(String(b), "es");
    });

    const valorActual = select.value || "Todos";
    const opciones = ["Todos", ...ordenados];

    select.innerHTML = opciones
        .map(curso => `
            <option value="${curso}">
                ${curso === "Todos" ? "Todos los cursos" : curso}
            </option>
        `)
        .join("");

    select.value = opciones.includes(valorActual) ? valorActual : "Todos";
}

const usuarios = [
    {
        usuario: "admin",
        password: "1234",
        nombre: "Administrador",
        rol: "Administrador",
        permisos: [
            "dashboard",
            "retiros",
            "asistencia",
            "alumnos",
            "apoderados",
            "auditoria",
            "usuarios"
        ]
    },
    {
        usuario: "inspector",
        password: "1234",
        nombre: "Inspector General",
        rol: "Inspector",
        permisos: [
            "dashboard",
            "retiros",
            "asistencia",
            "alumnos",
            "apoderados",
            "auditoria"
        ]
    },
    {
        usuario: "profesor",
        password: "1234",
        nombre: "Profesor",
        rol: "Profesor",
        permisos: [
            "dashboard",
            "retiros",
            "asistencia",
            "alumnos"
        ]
    },
    {
        usuario: "apoderado",
        password: "1234",
        nombre: "Apoderado Demo",
        rol: "Apoderado",
        permisos: [
            "dashboard",
            "asistencia",
            "alumnos",
            "retiros"
        ]
    }
];


/* =========================================================
   DATOS DE PRUEBA
   ========================================================= */

const datosIniciales = {

    alumnos: [
        {
            id: 1,
            nombre: "Benjamín Soto",
            rut: "21.111.111-1",
            curso: "3° Medio A",
            asistencia: 95
        },
        {
            id: 2,
            nombre: "Camila Rojas",
            rut: "21.222.222-2",
            curso: "3° Medio A",
            asistencia: 91
        },
        {
            id: 3,
            nombre: "Diego Pérez",
            rut: "21.333.333-3",
            curso: "3° Medio B",
            asistencia: 88
        },
        {
            id: 4,
            nombre: "Martina González",
            rut: "21.444.444-4",
            curso: "3° Medio B",
            asistencia: 97
        },
        {
            id: 5,
            nombre: "Tomás Muñoz",
            rut: "21.555.555-5",
            curso: "4° Medio A",
            asistencia: 86
        },
        {
            id: 6,
            nombre: "Sofía Silva",
            rut: "21.666.666-6",
            curso: "4° Medio A",
            asistencia: 94
        },
        {
            id: 7,
            nombre: "Vicente Morales",
            rut: "21.777.777-7",
            curso: "4° Medio B",
            asistencia: 90
        },
        {
            id: 8,
            nombre: "Antonia Castillo",
            rut: "21.888.888-8",
            curso: "4° Medio B",
            asistencia: 98
        }
    ],

    apoderados: [
        {
            id: 0,
            nombre: "Apoderado Universal",
            rut: "11.111.111-1",
            telefono: "+56 9 0000 0000",
            email: "universal@escuela.cl",
            alumnoId: null,
            parentesco: "General",
            estado: "Activo"
        },
        {
            id: 1,
            nombre: "Carolina Soto",
            rut: "12.111.111-1",
            telefono: "+56 9 1111 1111",
            email: "carolina@email.com",
            alumnoId: 1,
            parentesco: "Madre",
            estado: "Activo"
        },
        {
            id: 2,
            nombre: "Jorge Rojas",
            rut: "12.222.222-2",
            telefono: "+56 9 2222 2222",
            email: "jorge@email.com",
            alumnoId: 2,
            parentesco: "Padre",
            estado: "Activo"
        },
        {
            id: 3,
            nombre: "María Pérez",
            rut: "12.333.333-3",
            telefono: "+56 9 3333 3333",
            email: "maria@email.com",
            alumnoId: 3,
            parentesco: "Madre",
            estado: "Activo"
        },
        {
            id: 4,
            nombre: "Patricia Muñoz",
            rut: "12.444.444-4",
            telefono: "+56 9 4444 4444",
            email: "patricia@email.com",
            alumnoId: 5,
            parentesco: "Madre",
            estado: "Activo"
        }
    ],

    retiros: [],

    auditoria: []
};


/* =========================================================
   VARIABLES GLOBALES
   ========================================================= */

let datos = cargarDatos();

function asegurarApoderadoUniversal() {

    if (!Array.isArray(datos.apoderados)) {
        datos.apoderados = [];
    }

    const universal =
        datos.apoderados.find(
            g =>
                g && (
                    Number(g.id) === 0 ||
                    g.nombre === "Apoderado Universal" ||
                    g.rut?.toLowerCase() === "11.111.111-1"
                )
        ) || null;

    const apoderadoUniversal = {
        id: 0,
        nombre: "Apoderado Universal",
        rut: "11.111.111-1",
        telefono: "+56 9 0000 0000",
        email: "universal@escuela.cl",
        alumnoId: null,
        parentesco: "General",
        estado: "Activo"
    };

    if (!universal) {
        datos.apoderados.unshift(apoderadoUniversal);
        guardarDatos();
        return;
    }

    Object.assign(universal, apoderadoUniversal, {
        id: 0,
        alumnoId: null,
        estado: "Activo"
    });

    guardarDatos();
}

asegurarApoderadoUniversal();

let usuarioActual = null;

let dashboardChart = null;

let attendanceChart = null;

async function cargarAlumnosDesdeServidor() {

    try {

        const respuesta = await fetch("/api/alumnos");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar la lista de alumnos");
        }

        const alumnosServidor = await respuesta.json();

        datos.alumnos = alumnosServidor.map(alumno => ({
            id: alumno.id,
            nombre: `${alumno.nombre} ${alumno.apellido}`.trim(),
            apellido: alumno.apellido,
            rut: alumno.rut,
            curso: alumno.curso,
            asistencia: Number.isFinite(alumno.asistencia) && alumno.asistencia > 0
                ? alumno.asistencia
                : generarAsistenciaAleatoria()
        }));

        poblarCursosDisponibles();

        datos.apoderados = datos.apoderados || [];
        datos.retiros = datos.retiros || [];
        datos.auditoria = datos.auditoria || [];

        guardarDatos();

    } catch (error) {

        console.error("Error cargando alumnos desde la base de datos:", error);
    }
}


/* =========================================================
   2. FUNCIONES GENERALES
   ========================================================= */

/*
    Obtiene un elemento HTML mediante su ID.
*/

function $(id) {
    return document.getElementById(id);
}


/*
    Escapa caracteres HTML para evitar problemas
    al insertar información dinámica.
*/

function escaparHTML(texto) {

    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/*
    Devuelve la fecha actual.
*/

function fechaActual() {

    return new Date().toLocaleDateString("es-CL");
}


/*
    Devuelve la hora actual.
*/

function horaActual() {

    return new Date().toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit"
    });
}


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

/*
    Carga los datos guardados en el navegador.

    Esto permite que los registros no desaparezcan
    inmediatamente al cerrar o actualizar la página.
*/

function cargarDatos() {

    try {

        const guardado = localStorage.getItem(STORAGE_KEY);

        if (guardado) {

            return JSON.parse(guardado);

        }

        return structuredClone(datosIniciales);

    } catch (error) {

        console.error("Error cargando datos:", error);

        return structuredClone(datosIniciales);
    }
}


/*
    Guarda todos los datos.
*/

function guardarDatos() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(datos)
    );
}


/* =========================================================
   MENSAJES
   ========================================================= */

/*
    Muestra una notificación temporal.
*/

function toast(mensaje) {

    const elemento = $("toast");

    if (!elemento) return;

    elemento.textContent = mensaje;

    elemento.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        elemento.classList.remove("show");

    }, 2800);
}


/* =========================================================
   3. SISTEMA DE AUDITORÍA
   ========================================================= */

/*
    Registra todas las acciones importantes
    realizadas dentro del sistema.
*/

function registrarAuditoria(
    accion,
    alumno = "-",
    resultado = "Correcto"
) {

    datos.auditoria.unshift({

        id: Date.now(),

        fecha: fechaActual(),

        hora: horaActual(),

        usuario: usuarioActual?.usuario || "sistema",

        accion: accion,

        alumno: alumno,

        resultado: resultado

    });


    /*
        Limitamos el historial a 300 registros
        para evitar que crezca demasiado.
    */

    if (datos.auditoria.length > 300) {

        datos.auditoria =
            datos.auditoria.slice(0, 300);

    }


    guardarDatos();

    renderAuditoria();
}


/* =========================================================
   4. LOGIN
   ========================================================= */

/*
    Comprueba usuario y contraseña.
*/

async function iniciarSesion(event) {

    event.preventDefault();


    const usuario =
        $("username").value
            .trim()
            .toLowerCase();

    const password =
        $("password").value;


    let encontrado = null;

    try {
        const respuesta = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, password })
        });

        const data = await respuesta.json();

        if (data.ok) {
            const base =
                usuarios.find(u => u.usuario === usuario) || {};

            encontrado = {
                usuario: usuario,
                nombre: data.nombre,
                rol: data.rol,
                permisos: base.permisos || []
            };
        }

    } catch (error) {
        console.error("Error al conectar con el servidor:", error);

        $("loginMessage").textContent =
            "No se pudo conectar con el servidor.";

        return;
    }


    /*
        Usuario incorrecto
    */

    if (!encontrado) {

        $("loginMessage").textContent =
            "Usuario o contraseña incorrectos.";

        return;
    }


    /*
        Guardamos el usuario actual.
    */

    usuarioActual = encontrado;


    $("loginMessage").textContent = "";


    /*
        Ocultamos login.
    */

    $("loginView")
        .classList.add("hidden");


    /*
        Mostramos aplicación.
    */

    $("appView")
        .classList.remove("hidden");


    /*
        Mostramos información del usuario.
    */

    $("userName").textContent =
        encontrado.nombre;

    $("userRole").textContent =
        encontrado.rol;

    $("avatar").textContent =
        encontrado.nombre
            .charAt(0)
            .toUpperCase();


    /*
        Aplicamos permisos.
    */

    aplicarPermisos();


    /*
        Cargamos información real desde la base de datos.
    */

    await cargarAlumnosDesdeServidor();

    renderTodo();


    /*
        Abrimos dashboard.
    */

    mostrarSeccion("dashboard");


    /*
        Auditoría.
    */

    registrarAuditoria(
        "Inicio de sesión"
    );


    toast(
        `Bienvenido/a, ${encontrado.nombre}`
    );
}


/* =========================================================
   CERRAR SESIÓN
   ========================================================= */

function cerrarSesion() {

    if (usuarioActual) {

        registrarAuditoria(
            "Cierre de sesión"
        );
    }


    usuarioActual = null;


    $("appView")
        .classList.add("hidden");


    $("loginView")
        .classList.remove("hidden");


    $("loginForm")
        .reset();


    $("username").focus();
}


/* =========================================================
   ROLES Y PERMISOS
   ========================================================= */

/*
    Oculta los módulos que el usuario
    no puede utilizar.
*/

function aplicarPermisos() {

    document
        .querySelectorAll(".nav")
        .forEach(boton => {

            const seccion =
                boton.dataset.section;

            const permitido =
                usuarioActual?.permisos
                    .includes(seccion);


            boton.style.display =
                permitido ? "" : "none";
        });
}


/*
    Comprueba si el usuario tiene
    permiso para una sección.
*/

function tienePermiso(seccion) {

    return usuarioActual?.permisos
        .includes(seccion);
}


/* =========================================================
   5. NAVEGACIÓN
   ========================================================= */

function mostrarSeccion(nombre) {

    /*
        Comprobamos permisos.
    */

    if (!tienePermiso(nombre)) {

        toast(
            "No tienes permisos para acceder a este módulo."
        );

        return;
    }


    /*
        Ocultamos todas las secciones.
    */

    document
        .querySelectorAll(".section")
        .forEach(seccion => {

            seccion.classList.toggle(
                "active",
                seccion.id === nombre
            );
        });


    /*
        Activamos botón correspondiente.
    */

    document
        .querySelectorAll(".nav")
        .forEach(boton => {

            boton.classList.toggle(
                "active",
                boton.dataset.section === nombre
            );
        });
}


/* =========================================================
   6. DASHBOARD
   ========================================================= */

/*
    Calcula promedio de asistencia.
*/

function calcularPromedio() {

    if (!datos.alumnos.length) {

        return 0;
    }


    const total =
        datos.alumnos.reduce(
            (suma, alumno) =>
                suma + Number(alumno.asistencia),
            0
        );


    return Math.round(
        total / datos.alumnos.length
    );
}


/*
    Actualiza tarjetas del dashboard.
*/

function actualizarDashboard() {

    $("totalStudents").textContent =
        datos.alumnos.length;


    $("pending").textContent =
        datos.retiros.filter(
            r => r.estado === "Pendiente"
        ).length;


    $("average").textContent =
        `${calcularPromedio()}%`;


    $("totalGuardians").textContent =
        datos.apoderados.length;
}


/* =========================================================
   GRÁFICA GENERAL
   ========================================================= */

function renderDashboardChart() {

    const canvas =
        $("dashboardChart");


    if (!canvas ||
        typeof Chart === "undefined") {

        return;
    }


    if (dashboardChart) {

        dashboardChart.destroy();
    }


    const asistencia =
        calcularPromedio();


    const inasistencia =
        Math.max(
            0,
            100 - asistencia
        );


    dashboardChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Asistencia",
                    "Inasistencia"
                ],

                datasets: [{

                    data: [
                        asistencia,
                        inasistencia
                    ],

                    backgroundColor: [
                        "#b71925",
                        "#e5e7eb"
                    ],

                    borderWidth: 0
                }]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
}


/* =========================================================
   ACTIVIDAD RECIENTE
   ========================================================= */

function renderActividad() {

    const contenedor =
        $("activity");


    if (!contenedor) return;


    const retiros =
        datos.retiros.slice(0, 5);

    const noticiasFalsas = [
        {
            alumnoNombre: "Comunidad escolar",
            motivo: "Se lanzó la campaña de prevención de inasistencia del mes.",
            hora: "08:30",
            estado: "Boletín"
        },
        {
            alumnoNombre: "Dirección",
            motivo: "Se reforzó el horario de atención para apoderados.",
            hora: "10:15",
            estado: "Aviso"
        },
        {
            alumnoNombre: "Consejo escolar",
            motivo: "Se aprobó la feria científica del próximo viernes.",
            hora: "12:00",
            estado: "Noticias"
        },
        {
            alumnoNombre: "Coord. Académica",
            motivo: "La asistencia promedio subió un 4% respecto a la semana anterior.",
            hora: "15:45",
            estado: "Reporte"
        },
        {
            alumnoNombre: "Departamento de bienestar",
            motivo: "Se habilitó apoyo pedagógico para estudiantes con baja asistencia.",
            hora: "17:20",
            estado: "Programa"
        }
    ];

    const lista = retiros.length ? retiros : noticiasFalsas;

    contenedor.innerHTML =
        lista.map(r => `

            <div class="activity">

                <b>
                    ${escaparHTML(r.alumnoNombre)}
                </b>

                <small>
                    ${escaparHTML(r.motivo)}
                    ·
                    ${escaparHTML(r.hora)}
                    ·
                    ${escaparHTML(r.estado)}
                </small>

            </div>

        `).join("");
}


/* =========================================================
   ALERTAS
   ========================================================= */

function renderAlertas() {

    const contenedor =
        $("alerts");


    if (!contenedor) return;


    const pendientes =
        datos.retiros.filter(
            r => r.estado === "Pendiente"
        ).length;


    const bajaAsistencia =
        datos.alumnos.filter(
            a => a.asistencia < 85
        ).length;


    const alertas = [];

    if (pendientes > 0) {

        alertas.push(`

            <div class="alert warn">

                ⚠️ Hay
                ${pendientes}
                retiro(s)
                pendiente(s) de revisión.

            </div>
        `);
    }

    if (bajaAsistencia > 0) {

        alertas.push(`

            <div class="alert bad">

                ⚠️ Hay
                ${bajaAsistencia}
                alumno(s)
                con asistencia inferior al 85%.

            </div>
        `);
    }

    if (!alertas.length) {

        alertas.push(`

            <div class="alert warn">

                ⚠️ La escuela reporta una jornada de lluvia en la mañana y cambios leves de horario.

            </div>
        `);

        alertas.push(`

            <div class="alert">

                ✓ El taller de robótica obtuvo una participación del 92% en la última actividad escolar.

            </div>
        `);

        alertas.push(`

            <div class="alert bad">

                ⚠️ Se detectó un aumento temporal de ausencias en 2° Medio B durante la última semana.

            </div>
        `);
    }

    contenedor.innerHTML =
        alertas.join("");
}


/* =========================================================
   7. RETIROS
   ========================================================= */

/*
    Llena los selectores de alumnos.
*/

function llenarSelectAlumnos() {

    const selects = [

        $("studentSelect"),

        $("gStudent")

    ].filter(Boolean);


    selects.forEach(select => {

        const valor =
            select.value;

        const textoFiltro =
            select.id === "studentSelect"
                ? normalizarTexto($("studentSearchInput")?.value || "")
                : "";

        const alumnosMostrados =
            !textoFiltro
                ? datos.alumnos
                : datos.alumnos.filter(alumno => {
                    const busqueda = normalizarTexto(
                        `${alumno.nombre || ""} ${alumno.apellido || ""} ${alumno.curso || ""}`
                    );

                    return busqueda.includes(textoFiltro);
                });


        select.innerHTML =

            `<option value="">
                ${alumnosMostrados.length ? "Seleccione alumno..." : "No hay alumnos coincidentes"}
            </option>` +

            alumnosMostrados.map(alumno => `

                <option value="${alumno.id}">

                    ${escaparHTML(alumno.nombre)}
                    ·
                    ${escaparHTML(alumno.curso)}

                </option>

            `).join("");


        if (
            alumnosMostrados.some(
                alumno =>
                    String(alumno.id) === valor
            )
        ) {

            select.value = valor;
        } else {
            select.value = "";
        }
    });
}


/* =========================================================
   VERIFICAR APODERADO
   ========================================================= */

function verificarApoderado() {

    const alumnoId =
        Number(
            $("studentSelect").value
        );


    const rut =
        $("guardianRut")
            .value
            .trim()
            .toLowerCase();


    const caja =
        $("verification");


    /*
        Datos incompletos.
    */

    if (!alumnoId || !rut) {

        caja.className =
            "verify bad";

        caja.textContent =
            "Seleccione un alumno e ingrese el RUT del apoderado.";

        return false;
    }


    const alumno =
        datos.alumnos.find(
            a => a.id === alumnoId
        );


    const apoderado =
        datos.apoderados.find(
            g => {
                const rutValido =
                    String(g.rut || "")
                        .trim()
                        .toLowerCase() === rut;

                const coincideAlumno =
                    g.alumnoId == null ||
                    Number(g.alumnoId) === alumnoId;

                const esUniversal =
                    Number(g.id) === 0 ||
                    g.nombre === "Apoderado Universal" ||
                    g.rut?.toLowerCase() === "11.111.111-1";

                return esUniversal &&
                    rutValido &&
                    coincideAlumno;
            }
        );


    /*
        Apoderado encontrado.
    */

    if (apoderado) {

        caja.className =
            "verify ok";


        caja.innerHTML = `

            <b>
                ✓ APODERADO VERIFICADO
            </b>

            <br>

            ${escaparHTML(apoderado.nombre)}

            ·

            ${escaparHTML(apoderado.parentesco)}

            <br>

            Alumno:

            ${escaparHTML(alumno.nombre)}
        `;


        caja.dataset.verified =
            "true";


        caja.dataset.guardianId =
            apoderado.id;


        return true;
    }


    /*
        Apoderado no encontrado.
    */

    caja.className =
        "verify bad";


    caja.textContent =
        "✕ El RUT no corresponde a un apoderado registrado para este alumno.";


    caja.dataset.verified =
        "false";


    return false;
}


/* =========================================================
   CREAR RETIRO
   ========================================================= */

function crearRetiro(event) {

    event.preventDefault();


    const alumnoId =
        Number(
            $("studentSelect").value
        );


    const alumno =
        datos.alumnos.find(
            a => a.id === alumnoId
        );


    if (!alumno) {

        toast(
            "Seleccione un alumno."
        );

        return;
    }


    /*
        Verificamos apoderado.
    */

    if (!verificarApoderado()) {

        toast(
            "Debe verificar el apoderado antes de crear el retiro."
        );

        return;
    }


    /*
        Creamos objeto retiro.
    */

    const retiro = {

        id: Date.now(),

        fecha: fechaActual(),

        hora: horaActual(),

        alumnoId: alumnoId,

        alumnoNombre: alumno.nombre,

        curso: alumno.curso,

        rutApoderado:
            $("guardianRut").value.trim(),

        personaRetira:
            $("person").value.trim(),

        motivo:
            $("reason").value,

        observacion:
            $("observation").value.trim(),

        estado: "Pendiente",

        creadoPor:
            usuarioActual.usuario
    };


    datos.retiros.unshift(
        retiro
    );


    guardarDatos();


    registrarAuditoria(
        "Creación de retiro",
        alumno.nombre,
        "Pendiente"
    );


    $("withdrawalForm")
        .reset();


    $("verification").className =
        "verify";


    $("verification").textContent =
        "Seleccione alumno e ingrese RUT.";


    $("verification")
        .dataset.verified =
        "false";


    renderTodo();


    toast(
        "Solicitud de retiro creada correctamente."
    );
}


/* =========================================================
   CAMBIAR ESTADO DE RETIRO
   ========================================================= */

function cambiarEstadoRetiro(
    id,
    nuevoEstado
) {

    const retiro =
        datos.retiros.find(
            r => r.id === id
        );


    if (!retiro) return;


    /*
        Para finalizar primero debe
        estar autorizado.
    */

    if (
        nuevoEstado === "Finalizado" &&
        retiro.estado !== "Autorizado"
    ) {

        toast(
            "Primero debe autorizar el retiro."
        );

        return;
    }


    retiro.estado =
        nuevoEstado;


    retiro.actualizadoPor =
        usuarioActual.usuario;


    retiro.actualizadoHora =
        horaActual();


    guardarDatos();


    registrarAuditoria(

        `Retiro ${nuevoEstado.toLowerCase()}`,

        retiro.alumnoNombre,

        nuevoEstado

    );


    renderTodo();


    toast(
        `Retiro ${nuevoEstado.toLowerCase()} correctamente.`
    );
}


/* =========================================================
   MOSTRAR RETIROS
   ========================================================= */

function renderRetiros(filtro = "") {

    const tabla =
        $("withdrawalTable");


    if (!tabla) return;


    const texto =
        filtro
            .toLowerCase()
            .trim();


    const lista =
        datos.retiros.filter(
            r =>
                `${r.alumnoNombre || ""}
                 ${r.personaRetira || ""}
                 ${r.motivo || ""}
                 ${r.estado || ""}`
                    .toLowerCase()
                    .includes(texto)
        );


    if (!lista.length) {

        tabla.innerHTML = `

            <tr>

                <td colspan="6">

                    No hay retiros registrados.

                </td>

            </tr>

        `;

        return;
    }


    tabla.innerHTML =
        lista.map(r => {

            const estadoClass =

                r.estado === "Pendiente"

                    ? "status pending"

                    : r.estado === "Rechazado"

                        ? "status rejected"

                        : "status";


            let acciones = "";


            /*
                Autorización y rechazo.
            */

            if (
                r.estado === "Pendiente" &&
                (
                    usuarioActual?.rol === "Administrador" ||
                    usuarioActual?.rol === "Inspector"
                )
            ) {

                acciones += `

                    <button
                        class="action red"
                        onclick="cambiarEstadoRetiro(
                            ${r.id},
                            'Autorizado'
                        )"
                    >
                        Autorizar
                    </button>

                    <button
                        class="action"
                        onclick="cambiarEstadoRetiro(
                            ${r.id},
                            'Rechazado'
                        )"
                    >
                        Rechazar
                    </button>
                `;
            }


            /*
                Finalización.
            */

            if (
                r.estado === "Autorizado" &&
                (
                    usuarioActual?.rol === "Administrador" ||
                    usuarioActual?.rol === "Inspector"
                )
            ) {

                acciones += `

                    <button
                        class="action red"
                        onclick="cambiarEstadoRetiro(
                            ${r.id},
                            'Finalizado'
                        )"
                    >
                        Finalizar
                    </button>
                `;
            }


            return `

                <tr>

                    <td>
                        ${escaparHTML(r.hora)}
                    </td>

                    <td>
                        ${escaparHTML(r.alumnoNombre)}
                    </td>

                    <td>
                        ${escaparHTML(r.personaRetira)}
                    </td>

                    <td>
                        ${escaparHTML(r.motivo)}
                    </td>

                    <td>

                        <span class="${estadoClass}">

                            ${escaparHTML(r.estado)}

                        </span>

                    </td>

                    <td>

                        ${acciones || "—"}

                    </td>

                </tr>
            `;

        }).join("");
}


/* =========================================================
   8. ASISTENCIA
   ========================================================= */

function obtenerAlumnosFiltrados() {

    const curso =
        $("course")?.value ||
        "Todos";


    if (curso === "Todos") {

        return datos.alumnos;
    }


    return datos.alumnos.filter(
        alumno =>
            alumno.curso === curso
    );
}


/* =========================================================
   GRÁFICA DE ASISTENCIA
   ========================================================= */

function renderAttendanceChart() {

    const canvas =
        $("attendanceChart");


    if (
        !canvas ||
        typeof Chart === "undefined"
    ) {

        return;
    }


    const lista =
        obtenerAlumnosFiltrados();


    if (attendanceChart) {

        attendanceChart.destroy();
    }


    attendanceChart = new Chart(
        canvas,
        {

            type: "bar",

            data: {

                labels:
                    lista.map(
                        alumno =>
                            alumno.nombre
                                .split(" ")[0]
                    ),

                datasets: [{

                    label:
                        "Asistencia %",

                    data:
                        lista.map(
                            alumno =>
                                alumno.asistencia
                        ),

                    backgroundColor:
                        "#b71925",

                    borderRadius: 6

                }]
            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        min: 0,

                        max: 100,

                        ticks: {

                            callback:
                                valor =>
                                    `${valor}%`
                        }
                    }
                },


                plugins: {

                    legend: {
                        display: false
                    }
                }
            }
        }
    );
}


/* =========================================================
   LISTA DE ASISTENCIA
   ========================================================= */

function renderAttendanceList() {

    const contenedor =
        $("attendanceList");


    if (!contenedor) return;


    const lista =
        obtenerAlumnosFiltrados();


    if (!lista.length) {

        contenedor.innerHTML =
            `<p>No hay alumnos.</p>`;

        return;
    }


    contenedor.innerHTML =
        lista.map(alumno => `

            <div
                class="attendance-row"
                onclick="verPerfil(${alumno.id})"
            >

                <div class="attendance-top">

                    <span>

                        ${escaparHTML(alumno.nombre)}

                        ·

                        ${escaparHTML(alumno.curso)}

                    </span>

                    <b>
                        ${alumno.asistencia}%
                    </b>

                </div>


                <div class="progress">

                    <i
                        style="
                            width:${Math.min(
                                100,
                                Math.max(
                                    0,
                                    alumno.asistencia
                                )
                            )}%
                        "
                    ></i>

                </div>

            </div>

        `).join("");
}


/* =========================================================
   INDICADORES DE ASISTENCIA
   ========================================================= */

function actualizarIndicadoresAsistencia() {

    const lista =
        obtenerAlumnosFiltrados();


    const promedio =
        lista.length

            ? Math.round(
                lista.reduce(
                    (suma, alumno) =>
                        suma +
                        Number(alumno.asistencia),
                    0
                ) / lista.length
            )

            : 0;


    const kpis =
        document.querySelectorAll(
            "#asistencia .kpis b"
        );


    if (kpis.length >= 3) {

        kpis[0].textContent =
            `${promedio}%`;

        kpis[1].textContent =
            `${100 - promedio}%`;

        kpis[2].textContent =
            "2%";
    }
}


function actualizarAsistencia() {

    renderAttendanceChart();

    renderAttendanceList();

    actualizarIndicadoresAsistencia();
}


/* =========================================================
   9. ALUMNOS
   ========================================================= */

function normalizarTexto(texto) {
    return String(texto ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function renderAlumnos(filtro = "") {

    const tabla =
        $("studentTable");


    if (!tabla) return;


    const texto =
        normalizarTexto(filtro);


    const lista =
        datos.alumnos.filter(alumno => {
            const haystack = normalizarTexto(
                `${alumno.nombre || ""} ${alumno.apellido || ""} ${alumno.rut || ""} ${alumno.curso || ""}`
            );

            return !texto || haystack.includes(texto);
        });


    if (!lista.length) {

        tabla.innerHTML = `

            <tr>

                <td colspan="5">

                    No se encontraron alumnos.

                </td>

            </tr>
        `;

        return;
    }


    tabla.innerHTML =
        lista.map(alumno => {

            const guardian =
                datos.apoderados.find(
                    g =>
                        g.alumnoId === alumno.id
                );


            return `

                <tr>

                    <td>
                        ${escaparHTML(
                            alumno.nombre
                        )}
                    </td>

                    <td>
                        ${escaparHTML(
                            alumno.curso
                        )}
                    </td>

                    <td>
                        ${alumno.asistencia}%
                    </td>

                    <td>
                        ${escaparHTML(
                            guardian?.nombre ||
                            "Sin registrar"
                        )}
                    </td>

                    <td>

                        <button
                            class="action red"
                            onclick="verPerfil(
                                ${alumno.id}
                            )"
                        >

                            Ver ficha

                        </button>

                    </td>

                </tr>

            `;

        }).join("");
}


/* =========================================================
   FICHA DEL ALUMNO
   ========================================================= */

function verPerfil(alumnoId) {

    const alumno =
        datos.alumnos.find(
            a => a.id === alumnoId
        );


    if (!alumno) return;


    const guardian =
        datos.apoderados.find(
            g => g.alumnoId === alumnoId
        );


    const retiros =
        datos.retiros.filter(
            r =>
                r.alumnoId === alumnoId
        );


    $("profile").innerHTML = `

        <div class="modal-card">

            <div class="panelhead">

                <h3>
                    Ficha del alumno
                </h3>

                <button
                    class="action"
                    onclick="cerrarPerfil()"
                >
                    Cerrar
                </button>

            </div>


            <div class="profile">

                <div>

                    <small>Nombre</small>

                    <b>
                        ${escaparHTML(
                            alumno.nombre
                        )}
                    </b>

                </div>


                <div>

                    <small>RUT</small>

                    <b>
                        ${escaparHTML(
                            alumno.rut
                        )}
                    </b>

                </div>


                <div>

                    <small>Curso</small>

                    <b>
                        ${escaparHTML(
                            alumno.curso
                        )}
                    </b>

                </div>


                <div>

                    <small>Asistencia</small>

                    <b>
                        ${alumno.asistencia}%
                    </b>

                </div>


                <div>

                    <small>Apoderado</small>

                    <b>
                        ${escaparHTML(
                            guardian?.nombre ||
                            "Sin registrar"
                        )}
                    </b>

                </div>


                <div>

                    <small>Teléfono</small>

                    <b>
                        ${escaparHTML(
                            guardian?.telefono ||
                            "—"
                        )}
                    </b>

                </div>

            </div>


            <h3 style="margin-top:20px">

                Historial de retiros

            </h3>


            ${
                retiros.length

                    ? retiros.map(retiro => `

                        <div class="activity">

                            <b>

                                ${escaparHTML(
                                    retiro.fecha
                                )}

                                ·

                                ${escaparHTML(
                                    retiro.estado
                                )}

                            </b>

                            <small>

                                ${escaparHTML(
                                    retiro.motivo
                                )}

                                · Retira:

                                ${escaparHTML(
                                    retiro.personaRetira
                                )}

                            </small>

                        </div>

                    `).join("")

                    :

                    `<p class="muted">
                        No registra retiros.
                    </p>`
            }

        </div>
    `;


    $("profile")
        .classList.remove("hidden");
}


/* =========================================================
   CERRAR FICHA
   ========================================================= */

function cerrarPerfil() {

    $("profile")
        ?.classList.add("hidden");
}


/* =========================================================
   10. APODERADOS
   ========================================================= */

function registrarApoderado(event) {

    event.preventDefault();


    const alumnoId =
        Number(
            $("gStudent").value
        );


    if (!alumnoId) {

        toast(
            "Seleccione un alumno."
        );

        return;
    }


    const nuevo = {

        id: Date.now(),

        nombre:
            $("gName")
                .value
                .trim(),

        rut:
            $("gRut")
                .value
                .trim(),

        telefono:
            $("gPhone")
                .value
                .trim(),

        email:
            $("gEmail")
                .value
                .trim(),

        alumnoId:

            alumnoId,

        parentesco:
            $("gRelation")
                .value,

        estado:
            "Activo"
    };


    /*
        Evitamos duplicar RUT.
    */

    if (
        datos.apoderados.some(
            g =>
                g.rut.toLowerCase() ===
                nuevo.rut.toLowerCase()
        )
    ) {

        toast(
            "Ya existe un apoderado con ese RUT."
        );

        return;
    }


    datos.apoderados.push(
        nuevo
    );


    guardarDatos();


    const alumno =
        datos.alumnos.find(
            a => a.id === alumnoId
        );


    registrarAuditoria(

        "Registro de apoderado",

        alumno?.nombre || "-",

        "Correcto"

    );


    $("guardianForm")
        .reset();


    renderTodo();


    toast(
        "Apoderado registrado correctamente."
    );
}


/* =========================================================
   LISTA DE APODERADOS
   ========================================================= */

function renderApoderados(filtro = "") {

    const tabla =
        $("guardianTable");


    if (!tabla) return;


    const texto =
        filtro
            .toLowerCase()
            .trim();


    const lista =
        datos.apoderados.filter(apoderado => {

            const alumno =
                datos.alumnos.find(
                    a =>
                        a.id ===
                        apoderado.alumnoId
                );


            return `

                ${apoderado.nombre}
                ${apoderado.rut}
                ${apoderado.telefono}
                ${alumno?.nombre || ""}

            `
                .toLowerCase()
                .includes(texto);
        });


    if (!lista.length) {

        tabla.innerHTML = `

            <tr>

                <td colspan="5">

                    No se encontraron apoderados.

                </td>

            </tr>

        `;

        return;
    }


    tabla.innerHTML =
        lista.map(apoderado => {

            const alumno =
                datos.alumnos.find(
                    a =>
                        a.id ===
                        apoderado.alumnoId
                );


            return `

                <tr>

                    <td>
                        ${escaparHTML(
                            apoderado.nombre
                        )}
                    </td>

                    <td>
                        ${escaparHTML(
                            apoderado.rut
                        )}
                    </td>

                    <td>
                        ${escaparHTML(
                            alumno?.nombre ||
                            "—"
                        )}
                    </td>

                    <td>
                        ${escaparHTML(
                            apoderado.telefono
                        )}
                    </td>

                    <td>

                        <span class="status">

                            ${escaparHTML(
                                apoderado.estado
                            )}

                        </span>

                    </td>

                </tr>

            `;

        }).join("");
}


/* =========================================================
   11. AUDITORÍA
   ========================================================= */

function renderAuditoria(filtro = "") {

    const tabla =
        $("auditTable");


    if (!tabla) return;


    const texto =
        filtro
            .toLowerCase()
            .trim();


    const lista =
        datos.auditoria.filter(registro =>

            `

                ${registro.fecha}
                ${registro.hora}
                ${registro.usuario}
                ${registro.accion}
                ${registro.alumno}
                ${registro.resultado}

            `
                .toLowerCase()
                .includes(texto)
        );


    if (!lista.length) {

        tabla.innerHTML = `

            <tr>

                <td colspan="6">

                    No hay registros de auditoría.

                </td>

            </tr>

        `;

        return;
    }


    tabla.innerHTML =
        lista.map(registro => `

            <tr>

                <td>
                    ${escaparHTML(
                        registro.fecha
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        registro.hora
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        registro.usuario
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        registro.accion
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        registro.alumno
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        registro.resultado
                    )}
                </td>

            </tr>

        `).join("");
}


/* =========================================================
   12. USUARIOS
   ========================================================= */

function renderUsuarios() {

    const tabla =
        $("userTable");


    if (!tabla) return;


    tabla.innerHTML =
        usuarios.map(usuario => `

            <tr>

                <td>
                    ${escaparHTML(
                        usuario.usuario
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        usuario.nombre
                    )}
                </td>

                <td>

                    <span class="status">

                        ${escaparHTML(
                            usuario.rol
                        )}

                    </span>

                </td>

                <td>

                    ${usuario.permisos
                        .map(
                            permiso =>
                                escaparHTML(
                                    permiso
                                )
                        )
                        .join(", ")}

                </td>

            </tr>

        `).join("");
}


/* =========================================================
   13. BUSCADOR GLOBAL
   ========================================================= */

function buscarGlobal() {

    const input =
        $("globalSearch");


    const resultados =
        $("globalResults");


    if (!input || !resultados) {

        return;
    }


    const texto =
        input.value
            .toLowerCase()
            .trim();


    /*
        Si está vacío,
        ocultamos resultados.
    */

    if (!texto) {

        resultados.style.display =
            "none";

        resultados.innerHTML =
            "";

        return;
    }


    /*
        Buscar alumnos.
    */

    const alumnos =
        datos.alumnos.filter(
            alumno =>

                `${alumno.nombre}
                 ${alumno.rut}
                 ${alumno.curso}`
                    .toLowerCase()
                    .includes(texto)
        );


    /*
        Buscar apoderados.
    */

    const apoderados =
        datos.apoderados.filter(
            apoderado =>

                `${apoderado.nombre}
                 ${apoderado.rut}`
                    .toLowerCase()
                    .includes(texto)
        );


    const items = [

        ...alumnos.map(alumno => ({

            tipo: "Alumno",

            texto:
                `${alumno.nombre} · ${alumno.curso}`,

            id:
                alumno.id
        })),

        ...apoderados.map(apoderado => ({

            tipo: "Apoderado",

            texto:
                `${apoderado.nombre} · ${apoderado.rut}`,

            id:
                apoderado.id
        }))

    ].slice(0, 8);


    /*
        Sin resultados.
    */

    if (!items.length) {

        resultados.innerHTML = `

            <div>
                No se encontraron resultados.
            </div>

        `;

    } else {

        resultados.innerHTML =

            items.map(item => `

                <div
                    onclick="resultadoGlobal(
                        ${item.id},
                        '${item.tipo}'
                    )"
                >

                    <b>
                        ${escaparHTML(
                            item.tipo
                        )}
                    </b>

                    ·

                    ${escaparHTML(
                        item.texto
                    )}

                </div>

            `).join("");
    }


    resultados.style.display =
        "block";
}


/* =========================================================
   RESULTADO DEL BUSCADOR
   ========================================================= */

function resultadoGlobal(
    id,
    tipo
) {

    $("globalResults")
        .style
        .display = "none";


    $("globalSearch")
        .value = "";


    /*
        Resultado alumno.
    */

    if (tipo === "Alumno") {

        mostrarSeccion(
            "alumnos"
        );


        verPerfil(id);


        return;
    }


    /*
        Resultado apoderado.
    */

    if (tipo === "Apoderado") {

        const apoderado =
            datos.apoderados.find(
                g => g.id === id
            );


        if (!apoderado) return;


        mostrarSeccion(
            "apoderados"
        );


        $("guardianSearch")
            .value =
            apoderado.nombre;


        renderApoderados(
            apoderado.nombre
        );
    }
}


/* =========================================================
   14. ACTUALIZACIÓN GENERAL
   ========================================================= */

function renderTodo() {

    actualizarDashboard();

    llenarSelectAlumnos();

    poblarCursosDisponibles();

    renderRetiros(
        $("withdrawalSearch")
            ?.value || ""
    );

    actualizarAsistencia();

    renderAlumnos(
        $("studentSearch")
            ?.value || ""
    );

    renderApoderados(
        $("guardianSearch")
            ?.value || ""
    );

    renderAuditoria(
        $("auditSearch")
            ?.value || ""
    );

    renderUsuarios();

    renderActividad();

    renderAlertas();

    renderDashboardChart();
}


/* =========================================================
   15. EVENTOS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        aplicarTema();

        $("themeToggle")
            ?.addEventListener(
                "click",
                () => {
                    const temaActual = document.body.dataset.theme === "dark" ? "dark" : "light";
                    const nuevoTema = temaActual === "dark" ? "light" : "dark";
                    localStorage.setItem(THEME_KEY, nuevoTema);
                    aplicarTema(nuevoTema);
                }
            );

        /* =========================
           LOGIN
           ========================= */

        $("loginForm")
            ?.addEventListener(
                "submit",
                iniciarSesion
            );


        /* =========================
           LOGOUT
           ========================= */

        $("logout")
            ?.addEventListener(
                "click",
                cerrarSesion
            );


        /* =========================
           NAVEGACIÓN
           ========================= */

        document
            .querySelectorAll(".nav")
            .forEach(boton => {

                boton.addEventListener(
                    "click",
                    () =>
                        mostrarSeccion(
                            boton.dataset.section
                        )
                );

            });


        /* =========================
           RETIROS
           ========================= */

        $("withdrawalForm")
            ?.addEventListener(
                "submit",
                crearRetiro
            );


        $("verify")
            ?.addEventListener(
                "click",
                verificarApoderado
            );


        /* =========================
           APODERADOS
           ========================= */

        $("guardianForm")
            ?.addEventListener(
                "submit",
                registrarApoderado
            );


        /* =========================
           BUSCADOR GLOBAL
           ========================= */

        $("globalSearch")
            ?.addEventListener(
                "input",
                buscarGlobal
            );


        /* =========================
           BUSCADOR DE RETIROS
           ========================= */

        $("withdrawalSearch")
            ?.addEventListener(
                "input",
                event =>
                    renderRetiros(
                        event.target.value
                    )
            );


        /* =========================
           BUSCADOR DE ALUMNOS
           ========================= */

        $("studentSearch")
            ?.addEventListener(
                "input",
                event =>
                    renderAlumnos(
                        event.target.value
                    )
            );

        $("studentSearchInput")
            ?.addEventListener(
                "input",
                () =>
                    llenarSelectAlumnos()
            );


        /* =========================
           BUSCADOR DE APODERADOS
           ========================= */

        $("guardianSearch")
            ?.addEventListener(
                "input",
                event =>
                    renderApoderados(
                        event.target.value
                    )
            );


        /* =========================
           BUSCADOR DE AUDITORÍA
           ========================= */

        $("auditSearch")
            ?.addEventListener(
                "input",
                event =>
                    renderAuditoria(
                        event.target.value
                    )
            );


        /* =========================
           FILTRO DE CURSO
           ========================= */

        $("course")
            ?.addEventListener(
                "change",
                actualizarAsistencia
            );


        /* =========================
           FILTRO DE PERIODO
           ========================= */

        $("period")
            ?.addEventListener(
                "change",
                actualizarAsistencia
            );


        /* =========================
           CAMBIO DE ALUMNO
           ========================= */

        $("studentSelect")
            ?.addEventListener(
                "change",
                () => {

                    const caja =
                        $("verification");


                    caja.className =
                        "verify";


                    caja.textContent =
                        "Seleccione alumno e ingrese RUT.";


                    caja.dataset.verified =
                        "false";
                }
            );


        /* =========================
           TECLA ESCAPE
           ========================= */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    cerrarPerfil();


                    $("globalResults")
                        ?.style
                        .setProperty(
                            "display",
                            "none"
                        );
                }
            }
        );


        /* =========================
           CLIC FUERA DEL BUSCADOR
           ========================= */

        document.addEventListener(
            "click",
            event => {

                const global =
                    document.querySelector(
                        ".global"
                    );


                if (
                    global &&
                    !global.contains(
                        event.target
                    )
                ) {

                    $("globalResults")
                        ?.style
                        .setProperty(
                            "display",
                            "none"
                        );
                }
            }
        );


        /* =========================
           CARGA INICIAL
           ========================= */

        cargarAlumnosDesdeServidor()
            .finally(() => renderTodo());

    }
);