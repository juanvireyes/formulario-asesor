import { getTipificacions } from "./lib/services.js";

const params = new URLSearchParams(window.location.search);
const botId = params.get("botId");
const chatId = params.get("chatId");
const sessionId = params.get("sessionId");
const count = params.get("count");

const userData = document.getElementById("user-data");
const autSection = document.getElementById("authorization-data");
const tipificationSection = document.getElementById("tipification-section");
const hideUserBtn = document.getElementById("hide-user");
const hideAuthBtn = document.getElementById("hide-auth");
const hideTipifBtn = document.getElementById("hide-tipification");

hideUserBtn.addEventListener("click", () => {
  // console.log("Tiene hide", userData.classList.contains("hide"));
  hideSection(userData);
});

hideAuthBtn.addEventListener("click", () => {
  hideSection(autSection);
});

hideTipifBtn.addEventListener("click", () => {
  hideSection(tipificationSection);
});

/** Se obtienen las tipificaciones desde el servicio */
async function fetchTipifications() {
  const rawArray = await getTipificacions();

  if (rawArray.status !== 200) {
    alert("Error al obtener las tipificaciones");
  } else {
    const data = rawArray.message;

    const groupedData = {};

    data.forEach((item) => {
      if (!groupedData[item.reason]) groupedData[item.reason] = {};

      if (!groupedData[item.reason][item.tag_lvl1])
        groupedData[item.reason][item.tag_lvl1] = {};

      if (!groupedData[item.reason][item.tag_lvl1][item.tag_lvl2])
        groupedData[item.reason][item.tag_lvl1][item.tag_lvl2] = [];

      groupedData[item.reason][item.tag_lvl1][item.tag_lvl2].push(
        item.tag_lvl3
      );
    });
    return groupedData;
  }
}

// (async () => {
//   const res = await fetchTipifications();
//   console.log(res);
// })();

let dataArray = [
  {
    motivo: "Autorizaciones",
    nivel1: [
      {
        texto: "Solicitud y consulta de autorizaciones",
        nivel2: [
          {
            texto: "Autorización de servicios médicos mayor de 60 años",
            nivel3: [],
          },
          {
            texto: "Autorización de medicamentos  mayor de 60 años",
            nivel3: [],
          },
          {
            texto: "Demora autorización / Conector caso 30 min",
            nivel3: [],
          },
          {
            texto: "Incidencia en Autorización / No prioritario",
            nivel3: [],
          },
          {
            texto: "Incidencia en Autorización / Respuesta inmediata",
            nivel3: [],
          },
          {
            texto: "Renovación de Autorización",
            nivel3: [],
          },
          {
            texto: "Solicitud de autorización (Menores de 60 años)",
            nivel3: [
              {
                texto:
                  "Solicitud de autorización prestaciones (Servicios Médicos)",
              },
              {
                texto: "Solicitud de autorización medicamentos",
              },
            ],
          },
          {
            texto: "Consulta de autorizaciones (Menores de 60 años)",
            nivel3: [
              {
                texto: "Consulta de autorizaciones - Prestaciones",
              },
              {
                texto: "Consulta de autorizaciones - Medicamentos",
              },
            ],
          },
        ],
      },
      {
        texto: "Consumo de medicamentos",
        nivel2: [
          {
            texto: "Servicios médicos",
            nivel3: [
              {
                texto: "Incidencia en Autorización de Medicamentos",
              },
              {
                texto:
                  "Información Post egreso hospitalario y Urgencias (medicamentos)",
              },
            ],
          },
          {
            texto: "Novedades con Cruz Verde",
            nivel3: [
              {
                texto: "Medicamentos agotados o descontinuados",
              },
              {
                texto: "Medicamentos no entregados",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    motivo: "Acompañamiento canal virtual",
    nivel1: [
      {
        texto: "Zona pública",
        nivel2: [
          {
            texto: "Consultas y transacciones",
            nivel3: [
              {
                texto: "Portal",
              },
              {
                texto: "App",
              },
              {
                texto: "Chatbot - María Paula",
              },
            ],
          },
        ],
      },
      {
        texto: "Zona privada",
        nivel2: [
          {
            texto: "Consultas y transacciones",
            nivel3: [
              {
                texto: "Portal",
              },
              {
                texto: "App",
              },
              {
                texto: "Chatbot - María Paula",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    motivo: "Actualización de datos de contacto - BH",
    nivel1: [
      {
        texto: "Actualización de datos personales",
        nivel2: [
          {
            texto: "Actualización de datos de contacto",
            nivel3: [],
          },
        ],
      },
    ],
  },
  {
    motivo: "Certificados",
    nivel1: [
      {
        texto: "Certificado para efectos tributarios",
        nivel2: [
          {
            texto: "Generación y/o envío de cerficado de retefuente y pagos",
            nivel3: [],
          },
          {
            texto: "Trámite en línea MP - Radicación de Conector",
            nivel3: [],
          },
        ],
      },
      {
        texto:
          "Generación de certificado de seguro de viaje (Consular-Migratorio)",
        nivel2: [
          {
            texto: "Envío certificado cobertura internacional",
            nivel3: [],
          },
        ],
      },
    ],
  },
  {
    motivo: "Consultas",
    nivel1: [
      {
        texto: "Consulta de factura (Consulta y/o envío)",
        nivel2: [
          {
            texto: "Generación y/o envío factura",
            nivel3: [],
          },
        ],
      },
      {
        texto: "Historial de pagos",
        nivel2: [
          {
            texto: "Consulta pago cuenta o pago en línea PSE",
            nivel3: [],
          },
        ],
      },
      {
        texto:
          "Resultado de la última transacción (Pago de factura realizada en el canal María Paula",
        nivel2: [
          {
            texto:
              "Transacción en zona de pagos no regista / Transacción en zona de pagos pendiente",
            nivel3: [],
          },
        ],
      },
      {
        texto: "Novedades de cartera",
        nivel2: [
          {
            texto:
              "Acompañamiento para radicación y consulta de novedades de cartera (Portal de usuarios de MP)",
            nivel3: [
              {
                texto: "Valores facturados",
              },
              {
                texto:
                  "Inscripción de cuenta bancaria para pago (Débito bancario)",
              },
              {
                texto: "Inconsistencias en el pago",
              },
              {
                texto: "Cambiar periodicidad de facturación",
              },
              {
                texto: "Radicación de Conector por novedades de cartera",
              },
            ],
          },
          {
            texto: "Liquidador pago anticipado",
            nivel3: [
              {
                texto: "Consultas y novedades de pago anticipado",
              },
            ],
          },
        ],
      },
      {
        texto: "Consulta de mis planes",
        nivel2: [
          {
            texto: "Solicitud de inclusiones o nuevas afiliaciones",
            nivel3: [
              {
                texto:
                  "Envío de información al formulario de Gcia. Comercial (SalesForce)",
              },
            ],
          },
          {
            texto: "Novedades al contrato",
            nivel3: [
              {
                texto: "Solicitud de cancelaciones",
              },
              {
                texto: "Certificados de antigüedad",
              },
              {
                texto: "Certificados de preexistencias",
              },
              {
                texto: "Certificado de utilizaciones",
              },
              {
                texto: "Radicación de Conector",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    motivo: "Citas médicas Banrep",
    nivel1: [
      {
        texto:
          "Citas Banrep (Incluye consulta externa con todas sus especialidades: odontología, optometría, imágenes Dx y Px Dx",
        nivel2: [
          {
            texto: "Médico puerta de entrada",
            nivel3: [
              {
                texto: "Asig. y/o confir. Cita puerta de entrada",
              },
              {
                texto: "Canc. y/o traslado cita Médico puerta de entrada",
              },
              {
                texto: "Canc. y/o traslado cita Odontólogo Puerta de Entrada",
              },
            ],
          },
          {
            texto: "Preagendamiento",
            nivel3: [
              {
                texto: "Asig. y/o confir. Cita especialista (preagendamiento)",
              },
              {
                texto: "Canc. y/o traslado cita especialista (preagendamiento)",
              },
            ],
          },
          {
            texto: "Canc. y/o traslado cita Puerta de Entrada",
            nivel3: [
              {
                texto: "Médico Puerta de Entrada",
              },
              {
                texto: "Odontólogo Puerta de Entrada",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    motivo: "Vales electrónicos",
    nivel1: [
      {
        texto: "Consulta vales (Disponibles y consumidos)",
        nivel2: [
          {
            texto:
              "Compra de vales - Consulta en pasarela de pagos (Paymentez)",
            nivel3: [
              {
                texto: "Consulta de transacciones - Datáfono Colsanitas",
              },
              {
                texto: "Consulta de Transacciones - Datáfono Medisanitas",
              },
              {
                texto:
                  "Consulta de transacciones - Corresponsal bancario Colsanitas",
              },
              {
                texto:
                  "Consulta de transacciones - Corresponsal bancario Medisnaitas",
              },
            ],
          },
          {
            texto: "Consulta de Vales - MFT de Recaudo",
            nivel3: [
              {
                texto: "Vales Consumidos",
              },
              {
                texto: "Vales Habilitados",
              },
              {
                texto: "Vale comprado para otro contrato",
              },
              {
                texto: "Consulta de Prestador que Redimió el Vale",
              },
            ],
          },
          {
            texto: "Incidencia Vales Electrónicos",
            nivel3: [
              {
                texto:
                  "Demora en la asignación - Transacción Pendiente en  la Pasarela de Pagos",
              },
              {
                texto:
                  "Demora en la asignación - Aprobada en Pasarela pero no en Replicador Tecnología Keralty",
              },
              {
                texto:
                  "Demora en la asignación - Incidencia en Transacciones Pasarela ACH / TDC",
              },
              {
                texto: "No registra Vale",
              },
              {
                texto: "Radicación de Conector a  Recaudo",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    motivo: "Resultados médicos",
    nivel1: [
      {
        texto: "Consulta de imágenes diagnósticas",
        nivel2: [
          {
            texto: "Consulta de resultados de imágenes diagnósticas",
            nivel3: [],
          },
          {
            texto:
              "Envío de resultados de imágenes díagnosticas por novedad de la OFV (Por Excepción)",
            nivel3: [],
          },
        ],
      },
      {
        texto: "Consulta de resultados de laboratorio",
        nivel2: [
          {
            texto: "Consulta de resultados de laboratorios",
            nivel3: [],
          },
          {
            texto:
              "Envío de resultados de laboratorios por novedad de la OFV (Por Excepción)",
            nivel3: [],
          },
        ],
      },
    ],
  },
  {
    motivo: "Directorios",
    nivel1: [
      {
        texto: "Directorio de oficinas",
        nivel2: [
          {
            texto: "Información directorio de oficinas",
            nivel3: [],
          },
        ],
      },
      {
        texto: "Directorio médico",
        nivel2: [
          {
            texto: "Información Directorio Médico",
            nivel3: [],
          },
          {
            texto: "Reporte de  Novedades de  Directorio Médico",
            nivel3: [],
          },
        ],
      },
    ],
  },
  {
    motivo: "Seguro de viaje",
    nivel1: [
      {
        texto: "Activación de seguro de viaje",
        nivel2: [
          {
            texto: "Activación WTA",
          },
        ],
      },
      {
        texto: "Consulta de activación de seguro de viaje",
        nivel2: [
          {
            texto: "Consulta WTA",
            nivel3: [],
          },
        ],
      },
    ],
  },
];
// const csvFilePath = "tipificacionesAsesor.csv";

// // Obtener el archivo CSV de tipificaciones (asumiendo que está en la misma carpeta que main.js)
// fetch(csvFilePath)
//   .then((response) => response.text())
//   // Lee el archivo y lo convierte en un array de objetos
//   .then((data) => {
//     // Utilizar PapaParse para parsear el CSV
//     Papa.parse(data, {
//       header: true, // Indica que la primera fila es el encabezado
//       complete: function (result) {
//         // El resultado es un objeto con propiedades como "data", "errors", etc.
//         dataArray = result.data;
//         console.log(dataArray);
//         fillReasons(dataArray);
//         fillLevel1(dataArray);
//       },
//       error: function (error) {
//         console.error(
//           "Hubo un error al parsear el archivo CSV:",
//           error.message
//         );
//       },
//     });
//   })
//   .catch((error) =>
//     console.error("Hubo un error al cargar el archivo:", error)
//   );

const idTypesList = [
  {
    id: 1,
    name: "Cédula de Ciudadania",
    value: "1",
    stringValue: "CC",
  },
  {
    id: 8,
    name: "Tarjeta de Identidad",
    value: "8",
    stringValue: "TI",
  },
  {
    id: 7,
    name: "Registro Civil",
    value: "7",
    stringValue: "RC",
  },
  {
    id: 2,
    name: "Cédula Extranjería",
    value: "2",
    stringValue: "CE",
  },
  {
    id: 6,
    name: "Pasaporte",
    value: "6",
    stringValue: "PA",
  },
  {
    id: 3,
    name: "Menor sin Identificación",
    value: "3",
    stringValue: "MSI",
  },
  {
    id: 4,
    name: "Número de Identificación Tributaria",
    value: "4",
    stringValue: "NIT",
  },
  {
    id: 5,
    name: "Número de Identificación Patronal",
    value: "5",
    stringValue: "NIP",
  },
  {
    id: 9,
    name: "Carné Diplomático",
    value: "9",
    stringValue: "CD",
  },
  {
    id: 10,
    name: "Certificado de Nacido Vivo",
    value: "10",
    stringValue: "CN",
  },
  {
    id: 11,
    name: "Salvoconducto de Permanencia",
    value: "11",
    stringValue: "SC",
  },
  {
    id: 12,
    name: "Pasaporte ONU",
    value: "12",
    stringValue: "ONU",
  },
  {
    id: 13,
    name: "Permiso Especial",
    value: "13",
    stringValue: "PE",
  },
  {
    id: 14,
    name: "Permiso por protección Temporal",
    value: "14",
    stringValue: "PT",
  },
];

var dateInit = new Date();
var day = dateInit.getDate();
var month = dateInit.getMonth();
var year = dateInit.getFullYear();
var date = `${day}/${month}/${year}`;

// Array temporal data de prueba
const tempData = [
  {
    id: 1,
    nombre: "Pepito Perez",
    tipoId: 1,
    numeroId: "123456789",
    edad: "32",
    telefono: "1234567890",
    correo: "pepito@example.com",
    contrato: "5698741",
    plan: "COLSANITAS MODULAR PENSIONADOS TELECOM",
    ciudad: "Medellín",
    telefonoContacto: "Llega del formulario",
    correoFormulario: "Llega del formulario",
    fechaConversacion: date,
    tipificacion: "Validaciones y estados de cuenta",
    contratoEps: "142589 HABILITADO",
    contratosFamilia: "COLSANITAS BLA BLA",
    idConversacion: "1547891445",
    autorizaciones: [
      {
        numeroAutorizacion: "243508076",
        sucursal: "CENTRAL DE AUTORIZACIONES BOGOTA",
        fechaExpedicion: "5/10/2023",
        fechaExpiracion: "1/11/2023",
        producto: "Colsanitas",
        estado: "Impresa aprobada",
        nombrePrestador: "GALLO MEJIA JUAN CARLOS",
        procedimientoMedicamento: "471110 - APENDICECTOMIA VIA LAPAROSCOPICA",
        observacion1: `AMPLIACION DE HISTORIA CLINICA - 72 MESES DE ANTIGUEDAD//
        SIN PREEXISTENCIAS//
        9 MESES DE EVOLUCION//
        PERTINENTE IMPRIMIR SI`,
        observacion2: `PRESENTAR CARNÉ Y DOC. DE IDENTIFICACIÓN`,
        observacion3: `SS INYECCION DE ANESTSIA DENTRO DE NERVIO PERIFERICOP CON FINES ANALGESICOS // AURICULOTEMPORALES ,SUPRAORBITARIO Y OCCIPITAL MAYOR BILATERAL - IMPRIMIR SI`,
      },
      {
        numeroAutorizacion: "243506240",
        sucursal: "CENTRAL DE AUTORIZACIONES BOGOTA",
        fechaExpedicion: "5/10/2023",
        fechaExpiracion: "27/03/2024",
        producto: "Colsanitas",
        estado: "Impresa aprobada",
        nombrePrestador: "CLINICA DE MARLY S A",
        procedimientoMedicamento: "883103 - RESONANCIA MAGNETICA DE ORBITAS",
        observacion1: `MASIVO, SERVICIO OXÍGENOS SEPTIEMBRE 2023,NO IMPRIMIR AUTORIZACIÓN`,
        observacion2: `INCLUYE MEDIO DE CONTRASTE`,
        observacion3: `ANEXAR VALE(S) DE ASISTENCIA MEDICA (FÍSICO O ELECTRÓNICO)`,
      },
    ],
  },
  {
    id: 2,
    nombre: "Juanito Pérez",
    tipoId: 1,
    numeroId: "0987654321",
    edad: "44",
    telefono: "1234567890",
    correo: "juanito@example.com",
    contrato: "459874",
    plan: "COLSANITAS INTEGRAL",
    ciudad: "Bogotá",
    telefonoContacto: "Llega del formulario",
    correoFormulario: "Llega del formulario",
    fechaConversacion: date,
    tipificacion: "Autorizaciones",
    contratoEps: "523456 HABILITADO",
    contratosFamilia: "",
    idConversacion: "8965412389",
    autorizaciones: [],
  },
  {
    id: 3,
    nombre: "María García",
    tipoId: 1,
    numeroId: "1029384756",
    edad: "28",
    telefono: "5555555555",
    correo: "maria@example.com",
    contrato: "745698",
    plan: "COLSANITAS",
    ciudad: "Manizales",
    telefonoContacto: "Llega del formulario",
    correoFormulario: "Llega del formulario",
    fechaConversacion: date,
    tipificacion: "Autorizaciones",
    contratoEps: "523456 NO HABILITADO",
    contratosFamilia: "",
    idConversacion: "8965445698",
    autorizaciones: [],
  },
];

// Cargamos las opciones en el selector de tipos de documento
const docTypeSelector = document.getElementById("id-type");
docTypeSelector.addEventListener("change", getDocTypes());

const docNum = document.getElementById("doc-num");
const userDataSection = document.getElementById("data-result");
const authorizationsSection = document.getElementById("authorization-data");

function getDocTypes() {
  const emptyOption = document.createElement("option");
  emptyOption.setAttribute("value", "");
  docTypeSelector.appendChild(emptyOption);

  idTypesList.forEach((element) => {
    docTypeSelector.insertAdjacentHTML(
      "beforeend",
      `<option value="${element.value}">${element.name}</option>`
    );
  });
}

// Función para colapsar las secciones
function hideSection(element) {
  if (element.classList.contains("hide")) {
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}

// Primero tomamos el formulario y validamos el usuario
const userForm = document.getElementById("user-form");
userForm.addEventListener("submit", validateUser);

// Función para validar el usuario
function validateUser(e) {
  e.preventDefault();

  let docType = docTypeSelector.value;
  let docNumber = docNum.value;

  let apiData = {
    idType: docType,
    idNumber: docNumber,
  };

  // console.log("Esta es la data que irá a la validación", apiData);

  // Hacemos una petición para encontrar el usuario en el array utilizando el formulario
  // Validación dummy
  const user = tempData.find(
    (element) => element.numeroId === apiData.idNumber
  );

  console.log("El elemento está en el array", user);

  if (user) {
    userDataSection.innerHTML = `
    <div class="user-name">
      <p class="name-label">Nombre:</p>
      <p class="name-value">${user.nombre}</p>
    </div>
    <div class="tipo-doc">
      <p class="tipo-doc-label">Tipo de documento:</p>
      <p class="tipo-doc-value">${user.tipoId}</p>
    </div>
    <div class="num-doc">
      <p class="num-doc-label">Número de documento:</p>
      <p class="num-doc-value">${user.numeroId}</p>
    </div>
    <div class="edad">
      <p class="edad-label">Edad:</p>
      <p class="edad-value">${user.edad}</p>
    </div>
    <div class="telefono">
      <p class="telefono-label">Teléfono BH:</p>
      <p class="telefono-value">${user.telefono}</p>
    </div>
    <div class="correo">
      <p class="correo-label">Correo BH:</p>
      <p class="correo-value">${user.correo}</p>
    </div>
    <div class="contrato">
      <p class="contrato-label">Contrato:</p>
      <p class="contrato-value">${user.contrato}</p>
    </div>
    <div class="plan">
      <p class="plan-label">Plan:</p>
      <p class="plan-value">${user.plan}</p>
    </div>
    <div class="telefono-form">
      <p class="telefono-form-label">Teléfono de contacto:</p>
      <p class="telefono-form-value">${user.telefonoContacto}</p>
    </div>
    <div class="email-form">
      <p class="email-form-label">Correo formulario:</p>
      <p class="email-form-value">${user.correoFormulario}</p>
    </div>
    <div class="fecha">
      <p class="fecha-label">Recibida:</p>
      <p class="fecha-value">${user.fechaConversacion}</p>
    </div>
    <div class="skill">
      <p class="skill-label">Ingresa por:</p>
      <p class="skill-value">${user.tipificacion}</p>
    </div>
    <div class="contratos-eps">
      <p class="contratos-eps-label">Contratos de EPS:</p>
      <p class="contratos-eps-value">${user.contratoEps}</p>
    </div>
    <div class="contratos-familia">
      <p class="contratos-familia-label">Contratos y familia:</p>
      <p class="contratos-familia-value">${user.contratosFamilia}</p>
    </div>
    <div class="id-conversacion">
      <p class="id-conversacion-label">Id conversación:</p>
      <p class="id-conversacion-value">${user.idConversacion}</p>
    </div>
    `;

    // Se crea el contenido de la sección de autorizaciones también
    autSection.innerHTML = `
    <table class="authorizations-table">
      <thead>
        <tr>
          <th>Número de autorización</th>
          <th>Sucursal</th>
          <th>Fecha de expedición</th>
          <th>Vigencia hasta</th>
          <th>Producto</th>
          <th>Estado</th>
          <th>Nombre prestador</th>
          <th>Procedimiento / Medicamento</th>
          <th>Observaciones 1</th>
          <th>Observaciones 2</th>
          <th>Observaciones 3</th>
        </tr>
      </thead>
      <tbody>
        ${
          user.autorizaciones.length > 0
            ? user.autorizaciones.map(
                (element) =>
                  `
          <tr>
            <td>${element.numeroAutorizacion}</td>
            <td>${element.sucursal}</td>
            <td>${element.fechaExpedicion}</td>
            <td>${element.fechaExpiracion}</td>
            <td>${element.producto}</td>
            <td>${element.estado}</td>
            <td>${element.nombrePrestador}</td>
            <td>${element.procedimientoMedicamento}</td>
            <td>${element.observacion1}</td>
            <td>${element.observacion2}</td>
            <td>${element.observacion3}</td>
          </tr>
          `
              )
            : `
        <tr>
          <td class="colspan-5">El usuario no tiene autorizaciones disponibles</td>
        </tr>
        `
        }
      </tbody>
    </table>
    `;
  } else {
    userDataSection.innerHTML = `
    <div class="no-results">
      <h1 class="no-results-title">Ningún usuario coincide con los datos ingresados</h1>
    </div>
    `;
  }
  userDataSection.classList.remove("hide");
}

// En este punto limpiamos el formulario
const resetFormBtn = document.getElementById("reset-form");
resetFormBtn.addEventListener("click", resetForm);

// Función limpiar fomulario validación
function resetForm(e) {
  e.preventDefault();
  docTypeSelector.value = "";
  docNum.value = "";
  userDataSection.innerHTML = "";
  autSection.innerHTML = "";
}

// Se obtiene el formulario y el contenedor de los selectores de las tipificaciones
const tipificationForm = document.getElementById("form-tipification");
const tipificationContainer = document.getElementById("tipification-cont");
const addRowBtn = document.getElementById("add-row-btn");
const commentsInfo = document.getElementById("observations");

// Selectores motivos
const motivosSelectors = document.getElementsByName("reason");
const motSelectors = Array.from(motivosSelectors);
const level1Select = document.getElementsByName("level-1");
const lvlOneSel = Array.from(level1Select);
const level2Select = document.getElementsByName("level-2");
const lvlTwoSel = Array.from(level2Select);
const level3Select = document.getElementsByName("level-3");
const lvlThreeSel = Array.from(level3Select);

window.onload = async function () {
  // Llenamos los select de motivos con data desde el principio
  motSelectors.forEach((field) => {
    fillReasons(dataArray, field);
  });
};

motSelectors.forEach((field) => {
  field.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    console.log("Seleccionado", selectedValue);
    let fieldId = field.id;
    let level1Field = document.querySelector(`#${fieldId}-level-1`);

    console.log(level1Field);

    if (selectedValue !== "") {
      const lvlOneArray = dataArray.filter((element) => {
        // console.log("Element", element);
        // console.log(
        //   "Motivo",
        //   element.motivo.toLowerCase().replaceAll(" ", "-"),
        //   "selected",
        //   selectedValue
        // );
        return (
          element.motivo.toLowerCase().replaceAll(" ", "-") === selectedValue
        );
      });
      console.log("Filtered", lvlOneArray);
      fillLevel(lvlOneArray[0].nivel1, level1Field);
    } else {
      level1Field.innerHTML = "";
    }
  });
});

lvlOneSel.forEach((field, index) => {
  field.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    let fieldId = field.id;
    fieldId = fieldId.replace("-level-1", "");
    let level2Field = document.querySelector(`#${fieldId}-level-2`);

    if (selectedValue !== "") {
      console.log("Valor", selectedValue, "value2", field);
      const lvlTwoArray = dataArray.filter((element) => {
        // console.log("Elemento", element.nivel1[index].nivel2);
        // console.log("Valor", selectedValue);
        // console.log("Texto", element.nivel1[index].texto);
        return (
          element.nivel1[index].texto.toLowerCase().replaceAll(" ", "-") ===
          selectedValue
        );
      });

      console.log(
        "Array",
        lvlTwoArray[0].nivel1[index].nivel2,
        "element",
        level2Field
      );
      fillLevel(lvlTwoArray[0].nivel1[index].nivel2, level2Field);
    } else {
      level2Field.innerHTML = "";
    }
  });
});

lvlTwoSel.forEach((field, index) => {
  field.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    console.log("Val", selectedValue);
    let fieldId = field.id;
    fieldId = fieldId.replace("-level-2", "");
    let level3Field = document.querySelector(`#${fieldId}-level-3`);
    console.log("level3 field", level3Field);

    if (selectedValue !== "") {
      const lvlThreeArray = dataArray.filter((element) => {
        return (
          element.nivel1[index].nivel2[index].texto
            .toLowerCase()
            .replaceAll(" ", "-") === selectedValue
        );
      });

      if (lvlThreeArray.length === 0) {
        level3Field.setAttribute("disabled", true);
      }
      // console.log(
      //   "Array",
      //   lvlThreeArray[0].nivel1[index].nivel2[index].nivel3,
      //   "element",
      //   level3Field
      // );
      fillLevel(
        lvlThreeArray[0].nivel1[index].nivel2[index].nivel3,
        level3Field
      );
    }
  });
});

// Se agrega el event listener para el formulario, enviar el objeto con la data para Cari
tipificationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let comments = commentsInfo.value;
  console.log("El asesor envía comentarios", comments);
});

// Función para llenar los motivos en el select
function fillReasons(data, select) {
  // Limpiar opciones existentes en cada select
  select.innerHTML = "";
  // Agregar la opción vacía
  let emptyOption = document.createElement("option");
  emptyOption.setAttribute("value", "");
  select.appendChild(emptyOption);

  /*if (typeof data === "object") {
    console.log("Data en object entries", data);
    Object.entries(data).forEach(([key, value]) => {
      console.log("Element en fill reasons", key);
      let option = document.createElement("option");
      option.setAttribute("value", key.replaceAll(" ", "-").toLowerCase());
      option.textContent = key;
      select.appendChild(option);
    });
  } else {
    
  }*/
  data.forEach((element) => {
    // console.log("Element en fill reasons", element);
    let option = document.createElement("option");
    option.setAttribute(
      "value",
      element.motivo.replaceAll(" ", "-").toLowerCase()
    );
    option.textContent = element.motivo;
    select.appendChild(option);
  });
}

// Función para llenar el nivel 1 en el select
function fillLevel(data, levelSelector) {
  // console.log("Data en selector", data);
  levelSelector.innerHTML = "";
  // Agregar la opción vacía
  let emptyOption = document.createElement("option");
  emptyOption.setAttribute("value", "");
  emptyOption.setAttribute("selected", true);
  emptyOption.setAttribute("disabled", true);
  emptyOption.textContent = "Seleccione una opción";
  levelSelector.appendChild(emptyOption);

  console.log("Valor selector en fillLevel", levelSelector.value);
  // if (levelSelector.value === "") {
  //   return; // Si no hay ningún motivo seleccionado, no se llenan los niveles 1, 2 y 3
  // }

  data.forEach((element) => {
    console.log("Elemento", element);
    let option = document.createElement("option");
    let valueNormalization = element.texto.toLowerCase().replaceAll(" ", "-");
    option.setAttribute("value", valueNormalization);
    option.textContent = element.texto;
    levelSelector.appendChild(option);
  });
}
/**
 * Pendientes:
 *
 * 1. Pendiente un servicio para consumir las tipificaciones. La idea es que lleve la misma estructura que el array quemado. Edwin lo genera
 * 2. Solicitar la api para validar el usuario y que devuelva toda la metadata necesaria y un array de autorizaciones. Edwin lo arma
 *
 * 3. Aplicar algunos estilos en el formulario para hacerlo más "bonito". Algo simple, nada complejo
 * 4. Terminar de armar los event listeners para los selectores de motivos y niveles.
 * 5. Crear el evento submit del formulario para setear el objeto, guardarlo en el array y dejar esa data en sesión del navegador
 */
