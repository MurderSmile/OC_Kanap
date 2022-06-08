//  Index Panier  //

  //  LocalStorage  //
  const local = JSON.parse(localStorage.getItem("commande")) 

  //  Tableau quantité Total  //
  let quantityArticles = []

  //  Tableau montant Total  //
  let montantArticles = []


//  Classement des articles dans le panier  //
if(local){
  
  local.sort((a, b) => {

    if (a.idCommande < b.idCommande) return -1
    if (a.idCommande > b.idCommande) return 1
    if (a.idCommande = b.idCommande){

      if (a.colorCommande < b.colorCommande) return -1
      if (a.colorCommande > b.colorCommande) return 1

    }

  })

}


//  Affichage du panier sur la page cart.html  //
  presentation()
    
  async function presentation(){

    //  Avertissement aucun article dans le panier  //
    if(!local || local == ""){
      document.getElementById("cart__items").innerHTML = "<p id='error__local' >Aucun article ne se trouve dans votre Panier</p>"
      document.getElementById('error__local').style.fontWeight = "bold"
      document.getElementById('error__local').style.fontSize = '20px'
    }

    for(let i in local){

      //  Récupération  de la réponse de l'api par article se trouvant dans le localStorage  //
      let articleJson = await get(i).then(response => response)

      document.getElementById("cart__items").innerHTML += "<article class='cart__item' data-id= "+local[i].idCommande+" data-color="+local[i].colorCommande+"><div class='cart__item__img'><img src="+articleJson.imageUrl+" alt="+articleJson.altTxt+"></div><div class='cart__item__content'><div class='cart__item__content__description'><h2>"+articleJson.name+"</h2><p>"+local[i].colorCommande+"</p><p>"+articleJson.price+" €</p></div><div class='cart__item__content__settings'><div class='cart__item__content__settings__quantity'><p>Qté : </p><input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value="+local[i].quantityCommande+"></div><div class='cart__item__content__settings__delete'><p class='deleteItem'>Supprimer</p></div></div></div></article>" 
    
    } 
    //  Affichage de la Quantité Total  //
    quantity()

    //  Affichage du Montant Total  //
    montant()

    //  Suppression d'un article  //
    supp()

  }
  

  //  Récupération  de la réponse de l'api par article se trouvant dans le localStorage  //
  function get(i){

    return fetch("http://localhost:3000/api/products/"+local[i].idCommande+"")

    .then(res => res.json())

    .then(articleJson => {
      return articleJson
    })

    .catch(error => {
      console.log(error)
      alert("404")
    })

  }   


  //  Affichage de la Quantité Total depuis le localStorage  //
  function quantity(){

    for(let i in local){
   
      quantityArticles.push(local[i].quantityCommande - '' )
      let totalQuantityArticles = quantityArticles.reduce((previousValue, currentValue) => previousValue += currentValue, 0)
      document.getElementById("totalQuantity").innerText = totalQuantityArticles

      //  Modification de la quantité des articles via les inputs ".itemQuantity" //
      modifQuantity(i)

      //  Sauvegarde de la modification de la quantité des articles dans le localStorage  //
      saveLocalQuantity(i)

    }

  }


  //  Modification de la quantité des articles via les inputs ".itemQuantity" //
  function modifQuantity(i){

    let itemQuantity = document.querySelectorAll(".itemQuantity")

    itemQuantity[i].addEventListener("input", function(e){

      quantityArticles[i] = e.target.value - ''
      let totalQuantityArticles = quantityArticles.reduce((previousValue, currentValue) => previousValue += currentValue, 0)
      document.getElementById("totalQuantity").innerText = totalQuantityArticles

    })

  }


  //  Sauvegarde de la modification de la quantité des articles dans le localStorage  //
  function saveLocalQuantity(i){

    let itemQuantity = document.querySelectorAll(".itemQuantity")

    itemQuantity[i].addEventListener("input", function(e){

      local[i].quantityCommande = e.target.value + ''
      localStorage.setItem("commande",JSON.stringify(local))

    })

  } 

  
  // Affichage du Montant Total depuis le localStorage //
  async function montant(){

    for(let i in local){
     
      let articleJson = await get(i).then(response => response)
      montantArticles.push(local[i].quantityCommande * articleJson.price - '' ) 
      let totalMontantArticles = montantArticles.reduce((previousValue, currentValue) => previousValue += currentValue, 0)
      document.getElementById("totalPrice").innerText = totalMontantArticles

      //  Mise à jour du montant total via les inputs ".itemQuantity"  //
      modifMontant(i, articleJson)

    }

  }


  //  Mise à jour du montant total via les inputs ".itemQuantity"  //
  function modifMontant(i, articleJson){

    let itemQuantity = document.querySelectorAll(".itemQuantity")

    itemQuantity[i].addEventListener("input", function(e){

      montantArticles[i] = e.target.value * articleJson.price - ''
      let totalMontantArticles = montantArticles.reduce((previousValue, currentValue) => previousValue += currentValue, 0)
      document.getElementById("totalPrice").innerText = totalMontantArticles  

    })   

  }


  //  Suppression de l'article concerné  //
  async function supp(){

    let deleteItem = document.getElementsByClassName("deleteItem")

    for(let i in local){   
       
      let articleJson = await get(i).then(response => response)

      deleteItem[i].addEventListener("click", function(){

        if (confirm("Voulez-vous vraiment supprimer le(s) canapé(s): "+articleJson.name+" de COULEUR: "+local[i].colorCommande+" ?") == true) {

          local.splice(i, 1)
          localStorage.setItem("commande",JSON.stringify(local))
          location.reload()

        }

      })

    }

  }


//  Index Formulaire  //
  
  //  Champ Prénom  //
  const firstName = document.getElementById("firstName")

  //  Champ Nom  //
  const lastName = document.getElementById("lastName")

  //  Champ Addresse  //
  const address = document.getElementById("address")

  //  Champ Ville //
  const city = document.getElementById("city")

  //  Champ Email  //
  const email = document.getElementById("email")

  //  Bouton Commander  //
  const order = document.getElementById("order")


//  Conformité du formulaire  //

  //  Conformité Prénom  //
    let reponseFirstName = ""
    let validityFirstName = ""

    firstName.addEventListener("change", function(e){

      reponseFirstName = e.target.value

      if(/^[a-zA-Zàâéèëêïîôùüçœ\'’ -]{3,20}$/.test(reponseFirstName)){
        document.getElementById("firstNameErrorMsg").innerHTML = ""
        firstName.style.color = ""
        firstName.style.fontWeight = "normal"
        validityFirstName = true
      }

      else if(reponseFirstName == ""){
        document.getElementById("firstNameErrorMsg").innerHTML = ""
        firstName.style.color = ""
        firstName.style.fontWeight = "normal"
        validityFirstName = false
      }

      else{
        document.getElementById("firstNameErrorMsg").innerHTML = "ERREUR: Chiffre et symboles non autorisés dans le formulaire, Format: 3 - 20 caractères"
        document.getElementById("firstNameErrorMsg").style.color = "white"
        firstName.style.color = "red"
        firstName.style.fontWeight = "bold"
        validityFirstName = false
      }

    })


  //  Conformité Nom  //
    let reponseLastName = ""
    let validityLastName = ""

    lastName.addEventListener("change", function(e){

      reponseLastName = e.target.value

      if(/^[a-zA-Zàâéèëêïîôùüçœ\'’ -]{3,20}$/.test(reponseLastName)){
        document.getElementById("lastNameErrorMsg").innerHTML = ""
        lastName.style.color = ""
        lastName.style.fontWeight = "normal"
        validityLastName = true
      }

      else if(reponseLastName == ""){
        document.getElementById("lastNameErrorMsg").innerHTML = ""
        lastName.style.color = ""
        lastName.style.fontWeight = "normal"
        validityLastName = false
      }

      else{
        document.getElementById("lastNameErrorMsg").innerHTML = "ERREUR: Chiffre et symboles non autorisés dans le formulaire, Format: 3 - 20 caractères"
        document.getElementById("lastNameErrorMsg").style.color = "white"
        lastName.style.color = "red"
        lastName.style.fontWeight = "bold"
        validityLastName = false
      }

    })

    
  //  Conformité Adresse  // 
    let reponseAddress = ""
    let validityAddress = ""

    address.addEventListener("change", function(e){

      reponseAddress = e.target.value

      if(/^[a-zA-Z0-9\s,.'-]{3,}$/.test(reponseAddress)){
        document.getElementById("addressErrorMsg").innerHTML = ""
        address.style.color = ""
        address.style.fontWeight = "normal"
        validityAddress = true
      }

      else if(reponseAddress == ""){
        document.getElementById("addressErrorMsg").innerHTML = ""
        address.style.color = ""
        address.style.fontWeight = "normal"
        validityAddress = false
      }

      else{
        document.getElementById("addressErrorMsg").innerHTML = "ERREUR: Symboles non autorisés dans le formulaire, Format: 3 caractères minimum"
        document.getElementById("addressErrorMsg").style.color = "white"
        address.style.color = "red"
        address.style.fontWeight = "bold"
        validityAddress = false
      }

    })


  //  Conformité Ville  //
    let reponseCity = ""
    let validityCity =""

    city.addEventListener("change", function(e){

      reponseCity = e.target.value

      if(/^[a-zA-Zàâéèëêïîôùüçœ\'’ -]{3,20}$/.test(reponseCity)){
        document.getElementById("cityErrorMsg").innerHTML = ""
        city.style.color = ""
        city.style.fontWeight = "normal"
        validityCity = true
      }

      else if(reponseCity == ""){
        document.getElementById("cityErrorMsg").innerHTML = ""
        city.style.color = ""
        city.style.fontWeight = "normal"
        validityCity = false
      }

      else{
        document.getElementById("cityErrorMsg").innerHTML = "ERREUR: Chiffre et symboles non autorisés dans le formulaire, Format: 3 - 20 caractères"
        document.getElementById("cityErrorMsg").style.color = "white"
        city.style.color = "red"
        city.style.fontWeight = "bold"
        validityCity = false
      }

    })
    

  //  Conformité Email  //  
    let reponseEmail = ""
    let validityEmail = ""

    email.addEventListener("change", function(e){

      reponseEmail = e.target.value

      if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(reponseEmail)){
        document.getElementById("emailErrorMsg").innerHTML = ""
        email.style.color = ""
        email.style.fontWeight = "normal"
        validityEmail = true
      }

      else if(reponseEmail == ""){
        document.getElementById("emailErrorMsg").innerHTML = ""
        email.style.color = ""
        email.style.fontWeight = "normal"
        validityEmail = false
      }

      else{
        document.getElementById("emailErrorMsg").innerHTML = "ERREUR: Ceci n'est pas une adresse mail (ex: jean.dupont@gmail.com)"
        document.getElementById("emailErrorMsg").style.color = "white"
        email.style.color = "red"
        email.style.fontWeight = "bold"
        validityEmail = false
      }

    })


//  Validation du formulaire  //
  order.addEventListener("click", function(e){

    if(!local || local == ""){

      alert("Aucun article ne se trouve dans votre Panier")

    }

    else if(validityFirstName == true && validityLastName == true && validityAddress == true && validityCity == true && validityEmail == true){
      
      e.preventDefault()

      let tabProducts = []
      for(localCommande of local){
        tabProducts.push(localCommande.idCommande)
      }

      const form = {firstName: reponseFirstName, lastName: reponseLastName, address: reponseAddress, city: reponseCity, email: reponseEmail}
      
      const finalCommande = {contact: form, products: tabProducts}

      post(finalCommande)

    }

  })


//  Envoi pour confirmation de la commande  //
  function post(finalCommande){

    return fetch("http://localhost:3000/api/products/order", {
	    method: "POST",
	    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	    body: JSON.stringify(finalCommande)
    })

    .then(res => res.json())

    .then(resJson => {
      sessionStorage.setItem("confirmation",JSON.stringify(resJson.orderId))
      window.location.href = "/front/html/confirmation.html"
    })

    .catch(error => {
      console.log(error)
      alert("404")
    })

  }