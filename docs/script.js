function sendMessage() {
  console.log("to be implemented");
  alert("Désolé, je ne n'ai pas eu le temps d'implémenter cette fonctionnalité, mais si le projet vous a plu, n'hésitez pas à me contacter par email : korneel.loy@gmail.com");
}

function showAdmin() {
  const adminPart = document.getElementById("adminPart");
  const finPart = document.getElementById("finPart");
  const comPart = document.getElementById("comPart");

  const isVisible = !adminPart.hasAttribute("hidden");

  adminPart.setAttribute("hidden", true);
  finPart.setAttribute("hidden", true);
  comPart.setAttribute("hidden", true);

  if (!isVisible) {
    adminPart.removeAttribute("hidden");
    adminPart.scrollIntoView({ behavior: "smooth" });
  }
}

function showFin() {
  const adminPart = document.getElementById("adminPart");
  const finPart = document.getElementById("finPart");
  const comPart = document.getElementById("comPart");

  const isVisible = !finPart.hasAttribute("hidden");

  adminPart.setAttribute("hidden", true);
  finPart.setAttribute("hidden", true);
  comPart.setAttribute("hidden", true);

  if (!isVisible) {
    finPart.removeAttribute("hidden");
    finPart.scrollIntoView({ behavior: "smooth" });
  }
}

function showCom() {
  const adminPart = document.getElementById("adminPart");
  const finPart = document.getElementById("finPart");
  const comPart = document.getElementById("comPart");

  const isVisible = !comPart.hasAttribute("hidden");

  adminPart.setAttribute("hidden", true);
  finPart.setAttribute("hidden", true);
  comPart.setAttribute("hidden", true);

  if (!isVisible) {
    comPart.removeAttribute("hidden");
    comPart.scrollIntoView({ behavior: "smooth" });
  }
}
