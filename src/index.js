import "zd-styles/es/Button.css";
import { profileMapping } from "./profileMapping";
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
    if (profile === "no_identificado") {
      const messages = profileData?.alerta_operador;
      displayUnknownProfileAlert(messages);
    }

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
           </div>`
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
          const value = profileData[subField.key] ?? "";

          groupContent.insertAdjacentHTML(
            "beforeend",
            getFieldBlueprint(subField.label, value, subField.key)
          );
        });
      } else {
        // campo plano
        const value = profileData[field.key] ?? "";

        content.insertAdjacentHTML(
          "beforeend",
          getFieldBlueprint(field.label, value, field.key)
        );
      }
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

  const header = e.target.closest(".group-header, .profile-header");
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
  const BASE_URL =
    "https://devrrhh.iie.cl/rrhh_api/edd-dashboard/proxy-docente-mas?rut=";

  let requestConfig = {
    url: BASE_URL + rut,
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
    .then(function (fieldsResponse) {
      console.log(fieldsResponse);
      console.log(fieldsResponse["ticketForm.fields"]);
      if (data.rut) {
        ZOHODESK.set("ticketForm.cf_rut", {
          value: `${data.rut}-${data.dv || ""}`,
        });
      }
      if (data.nombres) {
        ZOHODESK.set("ticketForm.contactId", {
          value: `${data.nombres} ${data.primer_apellido || ""} ${
            data.segundo_apellido || ""
          }`,
        });
      }
      if (data.correo_electronico) {
        ZOHODESK.set("ticketForm.email", {
          value: data.correo_electronico,
        });
      }
      if (data.numero_contacto_1) {
        ZOHODESK.set("ticketForm.phone", { value: data.numero_contacto_1 });
      }
    })
    .catch(function (error) {
      unableToFill();
    });
}
