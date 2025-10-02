export function displayUnknownProfileAlert(messages) {
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

export function displayInvalidRutAlert() {
  ZOHODESK.showpopup({
    title: "Error de entrada",
    content: "Ingrese un RUT válido, por favor.",
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

export function unableToFill(){
  ZOHODESK.showpopup({
    title: "Error ",
    content: "No puede llenar el ticket.",
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
