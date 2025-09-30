import { profileMapping } from "./profileMapping";
import "zd-styles/es/Button.css";

//Botón de recarga + evento
document.getElementById("reload").addEventListener("click", () => {
  loadTicket();
});

function showLoader() {
  const loader = document.getElementById("load-panel");
  loader.classList.remove("inactive");
  loader.classList.add("active");
}

function hideLoader() {
  const loader = document.getElementById("load-panel");
  loader.classList.remove("active");
  loader.classList.add("inactive");
}

//Entry point
ZOHODESK.extension.onload().then(function (App) {
  loadTicket();
});

function loadTicket() {
  ZOHODESK.get("ticket")
    .then((res) => {
      showLoader();
      const { ticket } = res;
      //console.log("DATA TICKET", ticket);
      //console.log(ticket.cf.cf_rut);
      const ticketRut = ticket.cf.cf_rut;
      // const ticketRut = '28740493-K';

      const BASE_URL =
        "https://devrrhh.iie.cl/rrhh_api/edd-dashboard/proxy-docente-mas?rut=";
      // const BASE_URL =
      //   "https://dashboard-edd.iie.cl/back/public/api2025/2025-persona-mesa-ayuda?rut=";

      let initialRequestConfig = {
        url: BASE_URL + ticketRut,
        type: "GET",
        postBody: {},
        headers: {
          "Content-Type": "application/json",
        },
      };

      ZOHODESK.request(initialRequestConfig)
        .then((res) => {
          let data = JSON.parse(res).response;
          data = JSON.parse(data);
          // console.log(data);
          renderProfiles(data);
        })
        .catch((err) => {
          console.error("Error en request", err);
        })
        .finally(() => {
          hideLoader();
        });
    })
    .catch(function (err) {
      console.error("Error al extraer info TICKET", err);
    });
}

function renderProfiles(profiles) {
  const container = document.querySelector(".user-info");
  container.innerHTML = "";

  profiles.forEach((profileData, index) => {
    const profile = profileData.perfil?.toLowerCase() || "no_identificado";
    const mapping = profileMapping[profile] || profileMapping.no_identificado;

    if (profile === "NO_IDENTIFICADO") {
      const messages = response?.alerta_operador;
      displayNoProfileAlert(messages);
    }

    const sectionId = `profile-${index}`;
    const section = document.createElement("div");
    section.classList.add("profile-section");

    section.innerHTML = `
      <div class="profile-header" data-toggle="${sectionId}">
        <h3>Perfil: ${profile.replaceAll("_", " ")}</h3>
        <span class="arrow">▼</span>
      </div>
      <div class="profile-content inactive" id="${sectionId}"></div>
    `;

    container.appendChild(section);

    const content = section.querySelector(".profile-content");

    mapping.forEach((field) => {
      const value = profileData[field.key] ?? "";
      const uniqueId = `${field.key}-${Math.random()
        .toString(36)
        .substring(2, 5)}`;

      content.insertAdjacentHTML(
        "beforeend",
        `<div class="user__field">
            <label>${field.label}</label>
            <div class="input-wrapper">
              <input type="text" readonly value="${value}" id="${uniqueId}">
              <button class="copy-btn" data-target="${uniqueId}" title="Copiar">
                <img src="../app/img/copy.svg" class="icon-copy"/>
              </button>
            </div>
          </div>`
      );
    });
  });

}

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".copy-btn");
  if (btn) {
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (input) {
      navigator.clipboard.writeText(input.value);
    }
  }

  const header = e.target.closest(".profile-header");
  if (header) {
    const contentId = header.getAttribute("data-toggle");
    const content = document.getElementById(contentId);
    content.classList.toggle("inactive");
    header.querySelector(".arrow").textContent = content.classList.contains(
      "inactive"
    )
      ? "▼"
      : "▲";
  }
});

function displayNoProfileAlert(messages) {
  ZOHODESK.showpopup({
    title: "Perfil no encontrado",
    content: "Procedimiento: " + messages.join(", "),
    type: "alert",
    contentType: "html",
    color: "red",
    okText: "Aceptar",
    cancelText: "Cancelar",
  }).then(
    (res) => {
      console.log("success");
    },
    (err) => {
      console.log("err", err);
    }
  );
}
