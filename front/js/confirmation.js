// récupération de l'ID de commande dans le sessionStorage //
const idFinalCommande = JSON.parse(sessionStorage.getItem("confirmation"))

// Affichage de l'ID de commande //
document.getElementById("orderId").innerText = idFinalCommande

// suppression du sessionStorage //
sessionStorage.removeItem('confirmation')