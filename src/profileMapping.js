export const profileMapping = {
  docente: [
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
      label: "Información EE y Sostenedor",
      content: [
        { key: "rbd", label: "RBD" },
        { key: "nombre_establecimiento", label: "Nombre Establecimiento" },
        { key: "dependencia", label: "Dependencia" },
        { key: "rut_sostenedor", label: "RUT Sostenedor" },
        { key: "nombre_sostenedor", label: "Nombre Sostenedor" },
      ],
    },
  ],
  //SOSTENEDOR
  representante: [
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
  ],
  director: [
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
  ],
  coordinador_grabacion: [
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
  ],
  encargado: [
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
  ],
  no_identificado: [
    { key: "rut", label: "RUT" },
    { key: "dv", label: "Dígito Verificador" },
  ],
};

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
