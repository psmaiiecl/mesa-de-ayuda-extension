import { profileMapping } from "./profileMapping";
import "zd-styles/es/Button.css";

const reloadButton = document.getElementById("reload");
reloadButton.addEventListener("click", () => {
  loadTicket();
});

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

      let initialRequestConfig = {
        url:
          "https://devrrhh.iie.cl/rrhh_api/edd-dashboard/proxy-docente-mas?rut=" +
          ticketRut,
        type: "GET",
        postBody: {},
        headers: {
          "Content-Type": "application/json",
        },
      };

      ZOHODESK.request(initialRequestConfig)
        .then((res) => {
          let personData = JSON.parse(res).response;
          personData = JSON.parse(personData);
          handleTicketResponse(personData);
          //console.log(personData);
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

function handleTicketResponse(response) {
  const profile = response?.perfil || "NO_IDENTIFICADO";
  if (profile === "NO_IDENTIFICADO") {
    const messages = response?.alerta_operador;
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
  renderProfile(response);
}

function renderProfile(data) {
  const profile = data.perfil?.toLowerCase() || "no_identificado";
  const mapping = profileMapping[profile] || profileMapping.no_identificado;
  const title = document.getElementById("profile");
  title.innerHTML = "Perfil " + profile.replaceAll("_", " ");

  const container = document.querySelector(".user-info");
  container.innerHTML = "";

  mapping.forEach((field) => {
    const value = data[field.key] ?? "";
    container.innerHTML += `
      <div class="user__field">
        <label>${field.label}</label>
        <input type="text" readonly value="${value}" id="${field.key}">
        <button class="copy-btn" data-target="${field.key}" title="Copiar">
        📋
        </button>
      </div>
    `;
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
      const targetId = e.target.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (input) {
        navigator.clipboard
          .writeText(input.value)
          .then(() => {
            //console.log("Copiado:", input.value);
            e.target.innerText = "✅"; 
            setTimeout(() => (e.target.innerText = "📋"), 1000);
          })
          .catch((err) => console.error("Error al copiar:", err));
      }
    }
  });
}

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
