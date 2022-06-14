//  Récupération de l'ID de commande dans le sessionStorage  //
const idFinalCommande = JSON.parse(sessionStorage.getItem("confirmation"))

//  Affichage de l'ID de commande dans la page confirmation.html  //
document.getElementById("orderId").innerText = idFinalCommande

//  Suppression des Storages //
localStorage.removeItem('commande')

sessionStorage.removeItem('confirmation')