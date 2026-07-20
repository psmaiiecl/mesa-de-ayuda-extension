// docente-2026: punto de edición para las diferencias del proceso 2026.
// Por ahora es una copia exacta de docente-2025.
const docente2025 = [
  {
    type: "group",
    label: "Datos Personales",
    content: [
      { key: "rut", label: "RUT" },
      { key: "dv", label: "Dígito Verificador" },
      { key: "nombre_completo", label: "Nombre Completo" },
      { key: "correo_electronico", label: "Email" },
      { key: "numero_contacto_1", label: "Teléfono" },
      { key: "numero_contacto_2", label: "Teléfono Alternativo" },
    ],
  },
  {
    type: "group",
    label: "Información Docente Más",
    content: [
      { key: "estado_inscripcion", label: "Estado Inscripción" },
      { key: "validacion", label: "Estado Validación" },
      { key: "rinde_pf", label: "Rinde / No Rinde" },
      { key: "debe_rendir", label: "Debe Rendir" },
      { key: "agrupacion", label: "Agrupacion" },
      { key: "asignatura", label: "Asignatura" },
      // { key: "a19ñ", label: "Beneficio: 19Ñ" },
      // { key: "avolun", label: "Beneficio: Tramo Voluntario" },
      // { key: "uaplaza", label: "Beneficio: Aplazamiento Proceso Evaluativo" },
      {
        type: "benefits",
        label: "Beneficios (Acogido / No Acogido)",
        content: [
          { key: "t19n", label: "Artículo 19Ñ", acogidoKey: "a19ñ" },
          { key: "pvolun", label: "Tramo Voluntario", acogidoKey: "avolun" },
          {
            key: "taplaza",
            label: "Aplazamiento Proceso 2024",
            acogidoKey: "uaplaza",
          },
          {
            key: "tienepf2022",
            label: "Portafolio Corregido",
            acogidoKey: "tienepf2022",
          },
        ],
      },
      { key: "estado_susp", label: "Estado Solicitud Suspensión" },
      { key: "fecha_agendamiento", label: "Fecha de agendamiento" },
      { key: "estado_grab_raptor", label: "Grabación (Raptor)" },
      { key: "estado_grab_dmas", label: "Grabación (D+)" },
      { key: "seguimiento_sd", label: "Seguimiento SD" },
    ],
  },
  {
    type: "group",
    label: "Información Solicitudes",
    content:[
      {
        type: "chips",
        label: "Solicitudes realizadas",
        content: [
          { key: "tiene_vse", label: "Susp/Ex" },
          { key: "tiene_vrbd", label: "Cambio EE" },
          { key: "tiene_vasig", label: "Ag/Asig" },
        ],
      },
      { key: "estado_susp", label: "Estado Solicitud Suspensión" },
      { key: "intentos_estado_susp", label: "# Solicitud Suspensión" },
      { key: "estado_rbd", label: "Estado Solicitud EE" },
      { key: "intentos_estado_rbd", label: "# Solicitud EE" },
      { key: "estado_asig", label: "Estado Solicitud Asig" },
      { key: "intentos_estado_asig", label: "# Solicitud Asig" },
    ]
  },
  {
    type: "group",
    label: "Información EE y Sostenedor",
    content: [
      { key: "rbd", label: "RBD" },
      { key: "nombre_establecimiento", label: "Nombre Establecimiento" },
      { key: "dependencia", label: "Dependencia" },
      { key: "rut_sostenedor", label: "RUT Sostenedor" },
      { key: "nombre_sostenedor", label: "Nombre Sostenedor" },
    ],
  },
];

const docente2026 = [
  {
    type: "group",
    label: "Datos Personales",
    content: [
      { key: "rut", label: "RUT" },
      { key: "dv", label: "Dígito Verificador" },
      { key: "nombre_completo", label: "Nombre Completo" },
      { key: "correo_electronico", label: "Email" },
      { key: "numero_contacto_1", label: "Teléfono" },
      { key: "numero_contacto_2", label: "Teléfono Alternativo" },
    ],
  },
  {
    type: "group",
    label: "Información Docente Más",
    content: [
      { key: "estado_inscripcion", label: "Estado Inscripción" },
      { key: "validacion", label: "Estado Validación" },
      { key: "rinde_pf", label: "Rinde / No Rinde" },
      { key: "debe_rendir", label: "Debe Rendir" },
      { key: "agrupacion", label: "Agrupacion" },
      { key: "asignatura", label: "Asignatura" },
      // { key: "a19ñ", label: "Beneficio: 19Ñ" },
      // { key: "avolun", label: "Beneficio: Tramo Voluntario" },
      // { key: "uaplaza", label: "Beneficio: Aplazamiento Proceso Evaluativo" },
      {
        type: "benefits",
        label: "Beneficios (Acogido / No Acogido)",
        content: [
          { key: "t19n", label: "Artículo 19Ñ", acogidoKey: "a19ñ" },
          { key: "pvolun", label: "Tramo Voluntario", acogidoKey: "avolun" },
          {
            key: "taplaza",
            label: "Aplazamiento Proceso 2024",
            acogidoKey: "uaplaza",
          },
          {
            key: "tienepf2022",
            label: "Portafolio Corregido",
            acogidoKey: "tienepf2022",
          },
        ],
      },
      { key: "estado_susp", label: "Estado Solicitud Suspensión" },
      { key: "fecha_agendamiento", label: "Fecha de agendamiento" },
      { key: "modalidad_grabacion", label: "Modalidad Grabación" },
      { key: "estado_grabacion", label: "Estado Grabación" },
      { key: "fecha_grabacion", label: "Fecha de grabacion" },
      // { key: "seguimiento_sd", label: "Seguimiento SD" },
    ],
  },
  {
    type: "group",
    label: "Información Solicitudes",
    content:[
      {
        type: "chips",
        label: "Solicitudes realizadas",
        content: [
          { key: "tiene_vse", label: "Susp/Ex" },
          { key: "tiene_vrbd", label: "Cambio EE" },
          { key: "tiene_vasig", label: "Ag/Asig" },
        ],
      },
      { key: "estado_susp", label: "Estado Solicitud Suspensión" },
      { key: "intentos_estado_susp", label: "# Solicitud Suspensión" },
      { key: "estado_rbd", label: "Estado Solicitud EE" },
      { key: "intentos_estado_rbd", label: "# Solicitud EE" },
      { key: "estado_asig", label: "Estado Solicitud Asig" },
      { key: "intentos_estado_asig", label: "# Solicitud Asig" },
    ]
  },
  {
    type: "group",
    label: "Información EE y Sostenedor",
    content: [
      { key: "rbd", label: "RBD" },
      { key: "nombre_establecimiento", label: "Nombre Establecimiento" },
      { key: "dependencia", label: "Dependencia" },
      { key: "rut_sostenedor", label: "RUT Sostenedor" },
      { key: "nombre_sostenedor", label: "Nombre Sostenedor" },
    ],
  },
];

//SOSTENEDOR
const representante = [
  {
    type: "group",
    label: "Datos Personales",
    content: [
      { key: "rut", label: "RUT" },
      { key: "dv", label: "Dígito Verificador" },
      { key: "nombre_completo", label: "Nombre Completo" },
      { key: "correo_electronico", label: "Email" },
      { key: "numero_contacto_1", label: "Teléfono" },
    ],
  },
  {
    type: "group",
    label: "Información EE y Sostenedor",
    content: [
      { key: "rbd", label: "RBD" },
      { key: "nombre_establecimiento", label: "Nombre Establecimiento" },
      { key: "dependencia", label: "Dependencia" },
      { key: "rut_sostenedor", label: "RUT Sostenedor" },
      { key: "nombre_sostenedor", label: "Nombre Sostenedor" },
    ],
  },
  { key: "estrategico", label: "Estratégico" },
  { key: "ultimo_ingreso", label: "Último acceso" },
];

const director = [
  {
    type: "group",
    label: "Datos Personales",
    content: [
      { key: "rut", label: "RUT" },
      { key: "dv", label: "Dígito Verificador" },
      { key: "nombre_completo", label: "Nombre Completo" },
      { key: "correo_electronico", label: "Email" },
      { key: "numero_contacto_1", label: "Teléfono" },
    ],
  },
  {
    type: "group",
    label: "Información EE y Sostenedor",
    content: [
      { key: "rbd", label: "RBD" },
      { key: "nombre_establecimiento", label: "Nombre Establecimiento" },
      { key: "dependencia", label: "Dependencia" },
      { key: "rut_sostenedor", label: "RUT Sostenedor" },
      { key: "nombre_sostenedor", label: "Nombre Sostenedor" },
    ],
  },
  { key: "ultimo_ingreso", label: "Último acceso" },
];

const coordinador_grabacion = [
  {
    type: "group",
    label: "Datos Personales",
    content: [
      { key: "rut", label: "RUT" },
      { key: "dv", label: "Dígito Verificador" },
      { key: "nombre_completo", label: "Nombre Completo" },
      { key: "correo_electronico", label: "Email" },
      { key: "numero_contacto_1", label: "Teléfono" },
    ],
  },
  {
    type: "group",
    label: "Información EE y Sostenedor",
    content: [
      { key: "rbd", label: "RBD" },
      { key: "nombre_establecimiento", label: "Nombre Establecimiento" },
      { key: "dependencia", label: "Dependencia" },
      { key: "rut_sostenedor", label: "RUT Sostenedor" },
      { key: "nombre_sostenedor", label: "Nombre Sostenedor" },
    ],
  },
  { key: "ultimo_ingreso", label: "Último acceso" },
];

const encargado = [
  {
    type: "group",
    label: "Datos Personales",
    content: [
      { key: "rut", label: "RUT" },
      { key: "dv", label: "Dígito Verificador" },
      { key: "nombre_completo", label: "Nombre Completo" },
      { key: "correo_electronico", label: "Email" },
      { key: "numero_contacto_1", label: "Teléfono" },
    ],
  },
  {
    type: "group",
    label: "Información EE y Sostenedor",
    content: [
      { key: "rbd", label: "RBD" },
      { key: "nombre_establecimiento", label: "Nombre Establecimiento" },
      { key: "dependencia", label: "Dependencia" },
      { key: "rut_sostenedor", label: "RUT Sostenedor" },
      { key: "nombre_sostenedor", label: "Nombre Sostenedor" },
    ],
  },
  { key: "estrategico", label: "Estratégico" },
  { key: "ultimo_ingreso", label: "Último acceso" },
];

const no_identificado = [
  { key: "rut", label: "RUT" },
  { key: "dv", label: "Dígito Verificador" },
];

const profileFieldsByYear = {
  2025: {
    docente: docente2025,
    representante,
    director,
    coordinador_grabacion,
    encargado,
    no_identificado,
  },
  2026: {
    docente: docente2026,
    representante,
    director,
    coordinador_grabacion,
    encargado,
    no_identificado,
  },
};

export function getProfileFields(year, profile) {
  const definedYears = Object.keys(profileFieldsByYear)
    .map(Number)
    .sort((a, b) => a - b);
  const latestYear = definedYears[definedYears.length - 1];

  const yearMapping =
    profileFieldsByYear[year] || profileFieldsByYear[latestYear];

  return yearMapping[profile] || yearMapping.no_identificado;
}

export function getProfileFillMapper(profile) {
  switch (profile) {
    case "docente":
      return "Docente o Educador/a";
      break;
    case "representante":
      return "Sostenedor/a o Encargado/a de Evaluación";
      break;
    case "encargado":
      return "Sostenedor/a o Encargado/a de Evaluación";
      break;
    case "director":
      return "Director/a";
      break;
    case "coordinador_grabacion":
      return "Coordinador/a de Grabaciones";
      break;
    default:
      return "--Ninguna--";
      break;
  }
}

export function getDependencyFillMapper(dependency) {
  switch (dependency) {
    case "INTEGRA":
    case "JUNJI":
      return "Jardines Infantiles";

    case "Municipal - DAEM":
    case "Municipal Corporación":
    case "Parvulo - Servicio Local de Educación (SLE)":
    case "Servicio Local de Educación":
    case "Vía Transferencia de Fondos":
      return "Municipal y Servicio Local de Educación";

    case "Administración Delegada":
    case "Convenio de Administración Delegada":
    case "Particular Subvencionado":
      return "Part. Subvencionado y Adm. Delegada";

    case "Sin Información":
      return "Otro";

    case null:
    case undefined:
    case "":
      return "--Ninguna--";

    default:
      return "--Ninguna--";
  }
}
