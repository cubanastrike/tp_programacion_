'use strict';

/* ════════════════════════════════════════════════════════════
   PORTFOLIO — Matías Barú
   script.js
   Funcionalidades: render dinámico de tecnologías, buscador,
   descripciones al pasar el mouse, tabla de estadísticas,
   validación del formulario de contacto y contador de caracteres.
   ════════════════════════════════════════════════════════════ */


/* ── ARRAY DE DATOS ──────────────────────────────────────────
   Toda la sección "Tecnologías" (grilla + tabla + descripciones)
   se construye a partir de este array. Agregar una tecnología
   nueva es tan simple como sumar un objeto acá. */
const tecnologias = [
  {
    nombre: 'HTML5', clase: 't-html', badge: 'b-front', categoria: 'front-end',
    nivel: 'inter', nivelTexto: 'intermedio', dots: 2, desde: '2024',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    descripcion: 'Lenguaje de marcado que uso para estructurar el contenido de todos mis proyectos web.'
  },
  {
    nombre: 'CSS3', clase: 't-css', badge: 'b-front', categoria: 'front-end',
    nivel: 'inter', nivelTexto: 'intermedio', dots: 2, desde: '2024',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    descripcion: 'Con esto armo el diseño, la paleta de colores y las animaciones de mis sitios.'
  },
  {
    nombre: 'JavaScript', clase: 't-js', badge: 'b-front', categoria: 'front-end',
    nivel: 'inter', nivelTexto: 'básico', dots: 1, desde: '2025',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    descripcion: 'Lo estoy aprendiendo para sumar interactividad real a mis páginas, como este buscador.'
  },
  {
    nombre: 'C#', clase: 't-cs', badge: 'b-back', categoria: 'back-end',
    nivel: 'inter', nivelTexto: 'intermedio', dots: 2, desde: '2024',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    descripcion: 'Lo uso para programar lógica de back-end y aplicaciones de escritorio.'
  },
  {
    nombre: '.NET', clase: 't-net', badge: 'b-back', categoria: 'back-end',
    nivel: 'inter', nivelTexto: 'intermedio', dots: 2, desde: '2024',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
    descripcion: 'Framework que combino con C# para armar servicios y APIs.'
  },
  {
    nombre: 'MySQL', clase: 't-mysql', badge: 'b-db', categoria: 'base de datos',
    nivel: 'inter', nivelTexto: 'intermedio', dots: 2, desde: '2025',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    descripcion: 'Motor de base de datos que uso para modelar, normalizar y consultar información.'
  },
  {
    nombre: 'Git', clase: 't-git', badge: 'b-ver', categoria: 'versionado',
    nivel: 'avan', nivelTexto: 'avanzado', dots: 3, desde: '2025',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    descripcion: 'Uso ramas, commits y merges en todos mis proyectos, incluido este portfolio.'
  },
  {
    nombre: 'GitHub', clase: 't-github', badge: 'b-ver', categoria: 'versionado',
    nivel: 'avan', nivelTexto: 'avanzado', dots: 3, desde: '2025',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg',
    descripcion: 'Ahí alojo mis repositorios y llevo el historial de todos mis trabajos.'
  },
  {
    nombre: 'VS Code', clase: 't-vscode', badge: 'b-ed', categoria: 'editor',
    nivel: 'inter', nivelTexto: 'intermedio', dots: 2, desde: '2024',
    icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    descripcion: 'Mi editor de código de todos los días, con extensiones para HTML, CSS y JS.'
  }
];


/* ── REFERENCIAS AL DOM ──────────────────────────────────── */
const tecGrid          = document.getElementById('tec-grid');
const tecTablaBody      = document.getElementById('tec-tabla-body');
const buscadorTec       = document.getElementById('buscador-tec');
const tecResultados      = document.getElementById('tec-resultados');
const tecDescripcion    = document.getElementById('tec-descripcion');
const btnVerTabla       = document.getElementById('btn-ver-tabla');
const tablaOuter        = document.getElementById('tabla-outer');
const linkAbrirPdf      = document.getElementById('link-abrir-pdf');
const formContacto      = document.getElementById('form-contacto');
const mensajeTextarea   = document.getElementById('mensaje');
const contadorMensaje   = document.getElementById('contador-mensaje');
const formMensaje       = document.getElementById('form-mensaje');


/* ════════════════════════════════════════════════════════════
   FUNCIÓN 1: renderizar tecnologías (grilla + tabla)
   Manipulación del DOM: crea elementos desde cero (createElement)
   y los agrega a la página (appendChild).
   ════════════════════════════════════════════════════════════ */
function renderTecnologias(lista) {
  // limpiamos lo que haya antes de volver a dibujar
  tecGrid.innerHTML = '';
  tecTablaBody.innerHTML = '';

  if (lista.length === 0) {
    const aviso = document.createElement('p');
    aviso.className = 'tec-sin-resultados';
    aviso.textContent = 'No encontré tecnologías que coincidan con la búsqueda.';
    tecGrid.appendChild(aviso);
  }

  lista.forEach(function (tech) {
    // ── tarjeta de la grilla ──
    const card = document.createElement('div');
    card.className = 'tech ' + tech.clase;
    card.dataset.nombre = tech.nombre;

    const img = document.createElement('img');
    img.src = tech.icono;
    img.alt = tech.nombre;

    const span = document.createElement('span');
    span.textContent = tech.nombre;

    card.appendChild(img);
    card.appendChild(span);
    tecGrid.appendChild(card);

    // ── fila de la tabla de estadísticas ──
    const fila = document.createElement('tr');
    fila.innerHTML =
      '<td>' + tech.nombre + '</td>' +
      '<td><span class="badge ' + tech.badge + '">' + tech.categoria + '</span></td>' +
      '<td><div class="nivel ' + tech.nivel + '"><div class="nivel-dots">' +
        generarDots(tech.dots) +
      '</div><span>' + tech.nivelTexto + '</span></div></td>' +
      '<td><span class="año">' + tech.desde + '</span></td>';
    tecTablaBody.appendChild(fila);
  });

  // fila fija al pie de la tabla
  const filaFooter = document.createElement('tr');
  filaFooter.className = 'footer-row';
  filaFooter.innerHTML = '<td colspan="4">// tecnologías en aprendizaje continuo</td>';
  tecTablaBody.appendChild(filaFooter);
}

// función auxiliar de renderTecnologias: arma los puntitos de nivel
function generarDots(cantidadActivos) {
  let html = '';
  for (let i = 0; i < 3; i++) {
    html += i < cantidadActivos ? '<span class="dot on"></span>' : '<span class="dot"></span>';
  }
  return html;
}


/* ════════════════════════════════════════════════════════════
   FUNCIÓN 2: filtrar tecnologías (buscador)
   Evento: input
   ════════════════════════════════════════════════════════════ */
function filtrarTecnologias(evento) {
  const texto = evento.target.value.trim().toLowerCase();

  const filtradas = tecnologias.filter(function (tech) {
    return tech.nombre.toLowerCase().includes(texto) ||
           tech.categoria.toLowerCase().includes(texto);
  });

  renderTecnologias(filtradas);

  tecResultados.textContent = texto === ''
    ? ''
    : filtradas.length + ' resultado(s)';
}


/* ════════════════════════════════════════════════════════════
   FUNCIÓN 3 y 4: mostrar / ocultar descripción de una tecnología
   Eventos: mouseover / mouseout (delegados en el contenedor)
   ════════════════════════════════════════════════════════════ */
function mostrarDescripcionTecnologia(evento) {
  const card = evento.target.closest('.tech');
  if (!card) return;

  const tech = tecnologias.find(function (t) { return t.nombre === card.dataset.nombre; });
  if (!tech) return;

  tecDescripcion.textContent = '// ' + tech.descripcion;
  tecDescripcion.classList.add('visible');
}

function ocultarDescripcionTecnologia(evento) {
  const card = evento.target.closest('.tech');
  if (!card) return;

  tecDescripcion.textContent = '// pasá el mouse sobre una tecnología para ver más info';
  tecDescripcion.classList.remove('visible');
}


/* ════════════════════════════════════════════════════════════
   FUNCIÓN 5: mostrar la tabla de estadísticas y hacer scroll
   Evento: click
   ════════════════════════════════════════════════════════════ */
function mostrarTabla() {
  // el checkbox ya se encarga de abrir la tabla vía CSS;
  // acá solo hacemos que la vista baje suavemente hasta ella.
  setTimeout(function () {
    tablaOuter.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
}


/* ════════════════════════════════════════════════════════════
   FUNCIÓN 6: contador de caracteres del mensaje
   Evento: keyup
   ════════════════════════════════════════════════════════════ */
function actualizarContador(evento) {
  const largo = evento.target.value.length;
  const maximo = evento.target.maxLength;

  contadorMensaje.textContent = largo + ' / ' + maximo;

  contadorMensaje.classList.remove('limite-cerca', 'limite-lleno');
  if (largo >= maximo) {
    contadorMensaje.classList.add('limite-lleno');
  } else if (largo >= maximo * 0.85) {
    contadorMensaje.classList.add('limite-cerca');
  }
}


/* ════════════════════════════════════════════════════════════
   FUNCIÓN 7: validar los datos del formulario
   Lanza errores (throw) que se atrapan con try/catch en
   manejarEnvioFormulario().
   ════════════════════════════════════════════════════════════ */
function validarFormulario(datos) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (datos.nombre === '' || datos.email === '' || datos.mensaje === '') {
    throw new Error('Completá todos los campos obligatorios (nombre, email y mensaje).');
  }
  if (datos.nombre.length < 3) {
    throw new Error('El nombre tiene que tener al menos 3 caracteres.');
  }
  if (!regexEmail.test(datos.email)) {
    throw new Error('Ingresá un email válido.');
  }
  if (datos.mensaje.length < 10) {
    throw new Error('El mensaje es muy corto, contame un poco más.');
  }

  return true;
}


/* ════════════════════════════════════════════════════════════
   FUNCIÓN 8: manejar el envío del formulario
   Evento: submit
   ════════════════════════════════════════════════════════════ */
function manejarEnvioFormulario(evento) {
  evento.preventDefault();

  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim(),
    asunto: document.getElementById('asunto').value.trim(),
    mensaje: document.getElementById('mensaje').value.trim()
  };

  // reseteamos los estilos de error de intentos anteriores
  document.querySelectorAll('.campo-error').forEach(function (campo) {
    campo.classList.remove('campo-error');
  });

  try {
    validarFormulario(datos);
    mostrarMensajeFormulario('¡Mensaje enviado! Te voy a responder a la brevedad.', 'exito');
    formContacto.reset();
    contadorMensaje.textContent = '0 / 500';
  } catch (error) {
    mostrarMensajeFormulario(error.message, 'error');
    marcarCamposInvalidos(datos);
  }
}

// función auxiliar: pinta de rojo los campos que fallaron
function marcarCamposInvalidos(datos) {
  if (datos.nombre === '' || datos.nombre.length < 3) {
    document.getElementById('nombre').classList.add('campo-error');
  }
  if (datos.email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
    document.getElementById('email').classList.add('campo-error');
  }
  if (datos.mensaje === '' || datos.mensaje.length < 10) {
    document.getElementById('mensaje').classList.add('campo-error');
  }
}

// función auxiliar: muestra el mensaje de éxito/error debajo del botón
function mostrarMensajeFormulario(texto, tipo) {
  formMensaje.textContent = texto;
  formMensaje.className = 'form-mensaje visible ' + tipo;

  setTimeout(function () {
    formMensaje.classList.remove('visible');
  }, 4000);
}


/* ════════════════════════════════════════════════════════════
   INICIALIZACIÓN Y EVENTOS
   ════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  // primer render de la sección tecnologías con el array completo
  renderTecnologias(tecnologias);

  // buscador de tecnologías (evento: input)
  buscadorTec.addEventListener('input', filtrarTecnologias);

  // descripción al pasar el mouse por una tarjeta (eventos: mouseover / mouseout)
  tecGrid.addEventListener('mouseover', mostrarDescripcionTecnologia);
  tecGrid.addEventListener('mouseout', ocultarDescripcionTecnologia);

  // botón "Estadísticas" (evento: click)
  btnVerTabla.addEventListener('click', mostrarTabla);

  // evita que el click en "abrir.pdf" también dispare el toggle de la tarjeta (evento: click)
  linkAbrirPdf.addEventListener('click', function (evento) {
    evento.stopPropagation();
  });

  // contador de caracteres del mensaje (evento: keyup)
  mensajeTextarea.addEventListener('keyup', actualizarContador);

  // validación del formulario de contacto (evento: submit)
  formContacto.addEventListener('submit', manejarEnvioFormulario);
});

