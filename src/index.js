import "zd-styles/es/Button.css";
import {
  getDependencyFillMapper,
  getProfileFillMapper,
  profileMapping,
} from "./profileMapping";
import { showLoader, hideLoader } from "./LoaderHelpers";
import {
  displayInvalidRutAlert,
  displayUnknownProfileAlert,
} from "./PopUpHelpers";
import {
  getFieldBlueprint,
  getGroupBlueprint,
  getProfileBlueprint,
} from "./Components";

let selectedYear = 2026;

document.addEventListener("DOMContentLoaded", () => {
  const yearSelector = document.getElementById("yearSelector");

  selectedYear = parseInt(yearSelector.value);

  yearSelector.addEventListener("change", (e) => {
    selectedYear = parseInt(e.target.value);
    console.log("Año seleccionado:", selectedYear);
    // refreshData();
  });
});

//Botón de recarga + evento
document.getElementById("reload").addEventListener("click", () => {
  loadTicket();
});

//Entry point
ZOHODESK.extension.onload().then(function (App) {
  loadTicket();
});

function loadTicket() {
  ZOHODESK.get("ticket")
    .then((res) => {
      const { ticket } = res;
      //console.log("DATA TICKET", ticket);
      //console.log(ticket.cf.cf_rut);
      const ticketRut = ticket.cf.cf_rut.toUpperCase();
      // const ticketRut = '28740493-K';
      fetchInfo(ticketRut);
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
    // if (profile === "no_identificado") {
    //   const messages = profileData?.alerta_operador;
    //   displayUnknownProfileAlert(messages);
    // }

    const sectionId = `profile-${index}`;
    const section = document.createElement("div");
    section.classList.add("profile-section");

    let parsedProfile = `${profile.replaceAll("_", " ")}`;
    parsedProfile =
      parsedProfile.charAt(0).toUpperCase() + parsedProfile.slice(1);

    section.innerHTML = getProfileBlueprint(parsedProfile, sectionId);

    container.appendChild(section);

    const content = section.querySelector(".profile-content");

    ZOHODESK.get("ticketForm.fields")
      .then(() => {
        content.insertAdjacentHTML(
          "afterbegin",
          `<div class="auto-fill">
             <button class="fill-btn" data-index="${index}">Completar</button>
           </div>`,
        );

        const fillBtn = section.querySelector(".fill-btn");
        if (fillBtn) {
          fillBtn.addEventListener("click", () => {
            fillTicketForm(profileData);
          });
        }
      })
      .catch(() => {
        // No estamos en ticketForm → no mostramos botón
      });

    mapping.forEach((field, subIndex) => {
      if (field.type === "group") {
        const groupId = `${sectionId}-group-${subIndex}`;
        const groupWrapper = document.createElement("div");
        groupWrapper.classList.add("group-section");

        groupWrapper.innerHTML = getGroupBlueprint(field?.label, groupId);

        content.appendChild(groupWrapper);

        const groupContent = groupWrapper.querySelector(".group-content");

        field.content.forEach((subField) => {
          if (subField.type === "benefits") {
            const benefitsWrapper = document.createElement("div");
            benefitsWrapper.classList.add("benefits-section");

            benefitsWrapper.innerHTML = `
              <div class="benefits-label">${subField.label}</div>
              <div class="benefits-chips"></div>
            `;

            const chipsContainer =
              benefitsWrapper.querySelector(".benefits-chips");

            subField.content.forEach((benefit) => {
              const tiene = profileData[benefit.key] || null;
              const acoge = profileData[benefit.acogidoKey] || null;

              let colorClass = "chip-none";
              if (tiene === "Sí" && acoge === "Sí") {
                colorClass = "chip-accepted"; // verde
              } else if (tiene === "Sí" && (acoge === "No" || !acoge)) {
                colorClass = "chip-has"; // rojo
              }

              const chip = document.createElement("span");
              chip.classList.add("benefit-chip", colorClass);
              chip.textContent = benefit.label;
              chipsContainer.appendChild(chip);
            });
            groupContent.appendChild(benefitsWrapper);
          } else {
            const value = profileData[subField.key] ?? "";
            groupContent.insertAdjacentHTML(
              "beforeend",
              getFieldBlueprint(subField.label, value, subField.key),
            );
          }
        });
      } else {
        // campo plano
        const value = profileData[field.key] ?? "";
        content.insertAdjacentHTML(
          "beforeend",
          getFieldBlueprint(field.label, value, field.key),
        );
      }
    });

    //BREVO
    const email = profileData.correo_electronico || null;

    const brevoWrapper = document.createElement("div");
    brevoWrapper.classList.add("brevo-section");

    brevoWrapper.innerHTML = `
      <button class="brevo-btn" ${!email ? "disabled" : ""} data-email="${email || ""}">
        Obtener campañas de correo
      </button>
    `;

    content.appendChild(brevoWrapper);

    const brevoBtn = brevoWrapper.querySelector(".brevo-btn");

    if (brevoBtn && email) {
      brevoBtn.addEventListener("click", () => {
        console.log("Buscando campañas para:", email);

        fetchBrevoCampaigns(email, sectionId);
      });
    }
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

  const header = e.target.closest(".group-header, .profile-header");
  if (header) {
    const contentId = header.getAttribute("data-toggle");
    const content = document.getElementById(contentId);
    content.classList.toggle("inactive");
    header.querySelector(".arrow").textContent = content.classList.contains(
      "inactive",
    )
      ? "▼"
      : "▲";
  }
});

const autoTab = document.getElementById("auto-tab");
const manualTab = document.getElementById("manual-tab");
const manualPanel = document.getElementById("manual-panel");

autoTab.addEventListener("click", () => {
  autoTab.classList.add("selected");
  manualTab.classList.remove("selected");
  manualPanel.classList.add("inactive");
  loadTicket();
});

manualTab.addEventListener("click", () => {
  manualTab.classList.add("selected");
  autoTab.classList.remove("selected");
  manualPanel.classList.remove("inactive");
  document.querySelector(".user-info").innerHTML = "";
});

document.getElementById("manual-search").addEventListener("click", () => {
  manualSearch();
});

document.getElementById("manual-rut").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    manualSearch();
  }
});

function fetchInfo(rut) {
  showLoader();

  const year = selectedYear;

  const BASE_URL = `https://dashboard-edd.iie.cl/back/public/api2025/2025-persona-mesa-ayuda?rut=${rut}&year=${year}`;
  // "https://devrrhh.iie.cl/rrhh_api/edd-dashboard/proxy-docente-mas?rut=";
  console.log("fetching", BASE_URL);

  let requestConfig = {
    url: BASE_URL,
    type: "GET",
    postBody: {},
    headers: { "Content-Type": "application/json" },
  };

  ZOHODESK.request(requestConfig)
    .then((res) => {
      let data = JSON.parse(res).response;
      data = JSON.parse(data);
      renderProfiles(data);
    })
    .catch((err) => {
      console.error("Error en request:", err);
    })
    .finally(() => hideLoader());
}

function manualSearch() {
  const rut = document.getElementById("manual-rut").value.trim().toUpperCase();
  if (!rut) {
    displayInvalidRutAlert();
    return;
  }
  fetchInfo(rut);
}

function fillTicketForm(data) {
  ZOHODESK.get("ticketForm.fields")
    .then(async function (fieldsResponse) {
      console.log(fieldsResponse);

      // if (data.nombre_completo) {
      //    await ZOHODESK.set("ticketForm.contactId", {
      //      value: data.nombre_completo,
      //    });
      //  }

      if (data.correo_electronico) {
        await ZOHODESK.set("ticketForm.email", {
          value: data.correo_electronico,
        });
      }

      if (data.rut) {
        await ZOHODESK.set("ticketForm.cf_rut", {
          value: `${data.rut}-${data.dv || ""}`,
        });
      }

      if (data.numero_contacto_1) {
        await ZOHODESK.set("ticketForm.phone", {
          value: "" + data.numero_contacto_1,
        });
      }

      const perfil = data?.perfil.toLowerCase() || "no_identificado";
      await ZOHODESK.set("ticketForm.cf_perfil_de_solicitud", {
        value: getProfileFillMapper(perfil),
      });

      if (data.dependencia) {
        await ZOHODESK.set("ticketForm.cf_dependencia", {
          value: getDependencyFillMapper(data.dependencia || ""),
        });
      }

      if (data.rbd) {
        await ZOHODESK.set("ticketForm.cf_rbd", {
          value: data.rbd || "",
        });
      }
    })
    .catch(function (error) {
      unableToFill();
    });
}

//BREVO

async function fetchBrevoCampaigns(email, sectionId) {
  console.log("Llamando API Brevo con:", email);

  const proxyUrl = "https://devrrhh.iie.cl/rrhh_api/edd-dashboard/proxy";
  const target =
    "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2026/integraciones/brevo/participant";

  try {
    const response = await fetch(
      `${proxyUrl}?url=${encodeURIComponent(target)}&email=${encodeURIComponent(email)}`,
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    console.log("Respuesta Brevo:", data);

    renderBrevoCampaigns(data, sectionId, email);
  } catch (error) {
    console.error("Error al obtener campañas:", error);
  }
}

function renderBrevoCampaigns(data, sectionId, email) {
  const container = document.getElementById(sectionId);

  // eliminar sección previa si existe
  const existing = container.querySelector(".brevo-campaigns");
  if (existing) existing.remove();

  // wrapper principal
  const wrapper = document.createElement("div");
  wrapper.classList.add("brevo-campaigns");

  const campaignsId = `${sectionId}-brevo`;

  wrapper.innerHTML = `
    <div class="group-header" data-toggle="${campaignsId}">
      <span>Campañas de correo</span>
      <span class="arrow">▼</span>
    </div>
    <div class="group-content inactive" id="${campaignsId}"></div>
  `;

  container.appendChild(wrapper);

  const content = wrapper.querySelector(".group-content");

  if (!data || data.length === 0) {
    content.innerHTML = `<div class="empty-state">No hay campañas registradas</div>`;
    return;
  }

  data.forEach((campaign, index) => {
    const campaignId = `${campaignsId}-item-${index}`;

    const campaignEl = document.createElement("div");
    campaignEl.classList.add("campaign-item");

    campaignEl.innerHTML = `
      <div class="group-header" data-toggle="${campaignId}">
        <span>${campaign.nombre}</span>
        <span class="arrow">▼</span>
      </div>
      <div class="group-content inactive" id="${campaignId}">
        <div class="campaign-field">
          <label>Asunto</label>
          <div>${campaign.asunto || "-"}</div>
        </div>
        <div class="campaign-field">
          <label>Sender</label>
          <div>${campaign.sender || "-"}</div>
        </div>

        <div class="campaign-events">
          <div><strong>Enviado:</strong> ${campaign.eventos.enviado || "-"}</div>
          <div><strong>Entregado:</strong> ${campaign.eventos.entregado || "-"}</div>
          <div><strong>Aperturas:</strong> ${campaign.eventos.aperturas}</div>
          <div><strong>Última apertura:</strong> ${campaign.eventos.ultima_apertura || "-"}</div>
          <div><strong>Clicks:</strong> ${campaign.eventos.clicks}</div>
        </div>

        <button 
          class="template-btn" 
          data-id="${campaign.campaign_id}"
          data-email="${email}"
        >
          Ver template
        </button>
      </div>
    `;

    content.appendChild(campaignEl);
  });

  // attachToggleEvents();
  attachTemplateEvents(wrapper);
}

function attachTemplateEvents(wrapper) {
  const buttons = wrapper.querySelectorAll(".template-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const campaignId = btn.dataset.id;
      const email = btn.dataset.email;

      const proxyUrl = "https://devrrhh.iie.cl/rrhh_api/edd-dashboard/proxy";

      const target =
        "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2026/integraciones/brevo/participant/overview";

      const finalUrl = `${proxyUrl}?url=${encodeURIComponent(target)}&email=${encodeURIComponent(email)}&id_campaña=${encodeURIComponent(campaignId)}`;

      window.open(finalUrl, "_blank", "noopener,noreferrer");
    });
  });
}

async function fetchBrevoTemplate(campaignId) {
  console.log("Fetching template for:", campaignId);

  // aquí después conectamos con endpoint real
}
