
// ========================================
// CODIGOS SECRETOS
// ========================================

let personaSeleccionada = "";

const codigos = {
    Licti: "0506",
    Koral: "0405"
};


// ========================================
// ELEMENTOS DE LAS PANTALLAS
// ========================================

const selector = document.getElementById("selector");
const pantallaCodigo = document.getElementById("pantallaCodigo");

const paginaLicti = document.getElementById("paginaLicti");
const paginaKoral = document.getElementById("paginaKoral");


// ========================================
// SELECCIONAR PERSONA
// ========================================

document.getElementById("elegirLicti").addEventListener("click", function() {
    seleccionarPersona("Licti");
});

document.getElementById("elegirKoral").addEventListener("click", function() {
    seleccionarPersona("Koral");
});

function seleccionarPersona(persona) {

    personaSeleccionada = persona;

    selector.classList.add("oculto");
    pantallaCodigo.classList.remove("oculto");

    document.getElementById("codigoIngresado").value = "";
    document.getElementById("errorCodigo").textContent = "";

    window.scrollTo(0, 0);
}


// ========================================
// VERIFICAR CODIGO
// ========================================

function verificarCodigo() {

    const codigo = document.getElementById("codigoIngresado").value.trim();

    if (codigo === codigos[personaSeleccionada]) {

        pantallaCodigo.classList.add("oculto");

        if (personaSeleccionada === "Licti") {

            paginaLicti.classList.remove("oculto");
            crearCorazones("💗");

        } else if (personaSeleccionada === "Koral") {

            paginaKoral.classList.remove("oculto");
            crearCorazones("💜");

        }

        window.scrollTo(0, 0);

    } else {

        document.getElementById("errorCodigo").textContent =
            "Código incorrecto. Inténtalo nuevamente 💗";

    }
}


// ========================================
// VOLVER AL MENU PRINCIPAL
// ========================================

function volverInicio() {

    paginaLicti.classList.add("oculto");
    paginaKoral.classList.add("oculto");
    pantallaCodigo.classList.add("oculto");

    selector.classList.remove("oculto");

    personaSeleccionada = "";

    document.getElementById("codigoIngresado").value = "";
    document.getElementById("errorCodigo").textContent = "";

    window.scrollTo(0, 0);

}


// ========================================
// GUARDAR Y RECUPERAR LAS SORPRESAS
// ========================================

function guardarEstado(id, elemento) {

    const estado = elemento.classList.contains("mostrar")
        ? "abierto"
        : "cerrado";

    localStorage.setItem(id, estado);

}

function recuperarEstado(id, elemento) {

    if (localStorage.getItem(id) === "abierto") {

        elemento.classList.remove("oculto");
        elemento.classList.add("mostrar");

    } else {

        elemento.classList.remove("mostrar");
        elemento.classList.add("oculto");

    }

}


// ========================================
// CONFIGURAR BOTONES DE SORPRESA Y REGALO
// ========================================

function configurarSorpresa(botonId, mensajeId, regaloBotonId, regaloId) {

    const boton = document.getElementById(botonId);
    const mensaje = document.getElementById(mensajeId);

    const botonRegalo = document.getElementById(regaloBotonId);
    const regalo = document.getElementById(regaloId);


    // RECUPERAR ESTADOS GUARDADOS

    recuperarEstado(mensajeId, mensaje);
    recuperarEstado(regaloId, regalo);


    // ACTUALIZAR TEXTOS DE LOS BOTONES

    boton.textContent = mensaje.classList.contains("mostrar")
        ? "Ocultar sorpresa ❤️"
        : "Abrir sorpresa ❤️";

    botonRegalo.textContent = regalo.classList.contains("mostrar")
        ? "Ocultar regalo 🎁"
        : "Abrir regalo 🎁";


    // ========================================
    // MOSTRAR U OCULTAR CARTA
    // ========================================

    boton.addEventListener("click", function() {

        if (mensaje.classList.contains("mostrar")) {

            mensaje.classList.remove("mostrar");
            mensaje.classList.add("oculto");

            boton.textContent = "Abrir sorpresa ❤️";

        } else {

            mensaje.classList.remove("oculto");
            mensaje.classList.add("mostrar");

            boton.textContent = "Ocultar sorpresa ❤️";

            crearCorazones("💗");

            mensaje.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        guardarEstado(mensajeId, mensaje);

    });


    // ========================================
    // MOSTRAR U OCULTAR REGALO
    // ========================================

    botonRegalo.addEventListener("click", function() {

        if (regalo.classList.contains("mostrar")) {

            regalo.classList.remove("mostrar");
            regalo.classList.add("oculto");

            botonRegalo.textContent = "Abrir regalo 🎁";

        } else {

            regalo.classList.remove("oculto");
            regalo.classList.add("mostrar");

            botonRegalo.textContent = "Ocultar regalo 🎁";

            crearCorazones("💗");

            regalo.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

        guardarEstado(regaloId, regalo);

    });

}


// ========================================
// CONFIGURAR SORPRESAS DE LICTI
// ========================================

configurarSorpresa(
    "botonSorpresaLicti",
    "mensajeLicti",
    "botonRegaloLicti",
    "regaloLicti"
);


// ========================================
// CONFIGURAR SORPRESAS DE KORAL
// ========================================

configurarSorpresa(
    "botonSorpresaKoral",
    "mensajeKoral",
    "botonRegaloKoral",
    "regaloKoral"
);


// ========================================
// ANIMACION DE CORAZONES
// ========================================

function crearCorazones(simbolo) {

    for (let i = 0; i < 20; i++) {

        const corazon = document.createElement("span");

        corazon.textContent = simbolo;
        corazon.style.position = "fixed";
        corazon.style.left = Math.random() * 100 + "vw";
        corazon.style.top = "-30px";
        corazon.style.fontSize = "25px";
        corazon.style.zIndex = "100";
        corazon.style.pointerEvents = "none";

        document.body.appendChild(corazon);

        let posicion = -30;

        const movimiento = setInterval(function() {

            posicion += 3;
            corazon.style.top = posicion + "px";

            if (posicion > window.innerHeight) {

                clearInterval(movimiento);
                corazon.remove();

            }

        }, 30);

    }

}
