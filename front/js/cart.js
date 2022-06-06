//  Index Panier  //

  //  LocalStorage  //
  const local = JSON.parse(localStorage.getItem("commande")) 
  console.table(local)

  //  Tableau quantité Total  //
  let quantityArticles = []
  console.log(quantityArticles)

  //  Tableau montant Total  //
  let montantArticles = []
  console.log(montantArticles)


//  Affichage du panier sur la page cart.html  //
  presentation()
    
  async function presentation(){

    //  avertissement aucun article dans le panier  //
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

      //  sauvegarde de la modification de la quantité des articles dans le localStorage  //
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


  //  sauvegarde de la modification de la quantité des articles dans le localStorage  //
  function saveLocalQuantity(i){

    let itemQuantity = document.querySelectorAll(".itemQuantity")
    itemQuantity[i].addEventListener("input", function(e){

      local[i].quantityCommande = e.target.value + ''
      localStorage.setItem("commande",JSON.stringify(local))
      console.log(local[i])
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
        if (confirm("Voulez-vous vraiment supprimer le(s) article(s): "+articleJson.name+" de COULEUR: "+local[i].colorCommande+" ?") == true) {

          local.splice(i, 1)
          localStorage.setItem("commande",JSON.stringify(local))
          location.reload()
        }
      })
    }
  }



  /* //exemple
  function detectDeleteBtn(value) {
    let deleteBtns = document.querySelectorAll(".deleteItem");
    for (deleteBtn of deleteBtns) {
        let parentBlock = deleteBtn.parentNode.parentNode.parentNode.parentNode;
        let idItemToDel = parentBlock.getAttribute("data-id");
        let colorItemToDel = parentBlock.getAttribute("data-color");
        deleteBtn.addEventListener("click", function (e) {
            deleteInTab(idItemToDel, colorItemToDel);
            deleteInDom(parentBlock, value);
        });
    }
}

function deleteInDom(deletedBlock, value) {
    deletedBlock.parentNode.removeChild(deletedBlock);
    priceCart(value);
}

for(let i=0;i<local.length;i++) {//ton code if(i==local.lentgh-1) {supp()}}
  */



//  Index Formulaire  //
  const firstName = document.getElementById("firstName")
  const lastName = document.getElementById("lastName")
  const address = document.getElementById("address")
  const city = document.getElementById("city")
  const email = document.getElementById("email")
  const order = document.getElementById("order")


//  Conformité du formulaire  //

  //  Conformité Prénom  //
    let reponseFirstName = ""
    let validityFirstName = ""
    firstName.addEventListener("change", function(e){
      reponseFirstName = e.target.value
      console.log(reponseFirstName) 

      if(/^[a-zA-Zàâéèëêïîôùüçœ\'’ -]{3,20}$/.test(reponseFirstName)){
        console.log("Prénom conforme")
        document.getElementById("firstNameErrorMsg").innerHTML = ""
        firstName.style.color = ''
        validityFirstName = true
      }

      else if(reponseFirstName == ""){
        document.getElementById("firstNameErrorMsg").innerHTML = ""
        firstName.style.color = ''
        validityFirstName = false
      }

      else{
        console.log("Prémon non conforme")
        document.getElementById("firstNameErrorMsg").innerHTML = "ERREUR: Chiffre et symboles non autorisés dans le formulaire, Format: 3 - 20 caractères"
        document.getElementById("firstNameErrorMsg").style.color = "white"
        firstName.style.color = 'red'
        validityFirstName = false
      }
    })


  //  Conformité Nom  //
    let reponseLastName = ""
    let validityLastName = ""
    lastName.addEventListener("change", function(e){
      reponseLastName = e.target.value
      console.log(reponseLastName)

      if(/^[a-zA-Zàâéèëêïîôùüçœ\'’ -]{3,20}$/.test(reponseLastName)){
        console.log("Nom conforme")
        document.getElementById("lastNameErrorMsg").innerHTML = ""
        lastName.style.color = ''
        validityLastName = true
      }

      else if(reponseLastName == ""){
        document.getElementById("lastNameErrorMsg").innerHTML = ""
        lastName.style.color = ''
        validityLastName = false
      }

      else{
        console.log("Nom non conforme")
        document.getElementById("lastNameErrorMsg").innerHTML = "ERREUR: Chiffre et symboles non autorisés dans le formulaire, Format: 3 - 20 caractères"
        document.getElementById("lastNameErrorMsg").style.color = "white"
        lastName.style.color = 'red'
        validityLastName = false
      }
    })

    
  //  Conformité Adresse  // 
    let reponseAddress = ""
    let validityAddress = ""
    address.addEventListener("change", function(e){
      reponseAddress = e.target.value
      console.log(reponseAddress)

      if(/^[a-zA-Z0-9\s,.'-]{3,}$/.test(reponseAddress)){
        console.log("Addresse conforme")
        document.getElementById("addressErrorMsg").innerHTML = ""
        address.style.color = ''
        validityAddress = true
      }

      else if(reponseAddress == ""){
        document.getElementById("addressErrorMsg").innerHTML = ""
        address.style.color = ''
        validityAddress = false
      }

      else{
        console.log("Addresse non conforme")
        document.getElementById("addressErrorMsg").innerHTML = "ERREUR: Symboles non autorisés dans le formulaire, Format: 3 caractères minimum"
        document.getElementById("addressErrorMsg").style.color = "white"
        address.style.color = 'red'
        validityAddress = false
      }
    })


  //  Conformité Ville  //
    let reponseCity = ""
    let validityCity =""
    city.addEventListener("change", function(e){
      reponseCity = e.target.value
      console.log(reponseCity)

      if(/^[a-zA-Zàâéèëêïîôùüçœ\'’ -]{3,20}$/.test(reponseCity)){
        console.log("Ville conforme")
        document.getElementById("cityErrorMsg").innerHTML = ""
        city.style.color = ''
        validityCity = true
      }

      else if(reponseCity == ""){
        document.getElementById("cityErrorMsg").innerHTML = ""
        city.style.color = ''
        validityCity = false
      }

      else{
        console.log("Ville non conforme")
        document.getElementById("cityErrorMsg").innerHTML = "ERREUR: Chiffre et symboles non autorisés dans le formulaire, Format: 3 - 20 caractères"
        document.getElementById("cityErrorMsg").style.color = "white"
        city.style.color = 'red'
        validityCity = false
      }
    })
    

  //  Conformité Email  //  
    let reponseEmail = ""
    let validityEmail = ""
    email.addEventListener("change", function(e){
      reponseEmail = e.target.value
      console.log(reponseEmail)

      if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(reponseEmail)){
        console.log("Email conforme")
        document.getElementById("emailErrorMsg").innerHTML = ""
        email.style.color = ''
        validityEmail = true
      }

      else if(reponseEmail == ""){
        document.getElementById("emailErrorMsg").innerHTML = ""
        email.style.color = ''
        validityEmail = false
      }

      else{
        console.log("Email non conforme")
        document.getElementById("emailErrorMsg").innerHTML = "ERREUR: Ceci n'est pas une adresse mail (ex: jean.dupont@gmail.com)"
        document.getElementById("emailErrorMsg").style.color = "white"
        email.style.color = 'red'
        validityEmail = false
      }
    })


//  Validation du formulaire  //
  order.addEventListener("click", function(){

    let tabProducts = []
    for(localCommande of local){
      tabProducts.push(localCommande.idCommande)
    }

    if(validityFirstName == true && validityLastName == true && validityAddress == true && validityCity == true && validityEmail == true){
      const form = {firstName: reponseFirstName, lastName: reponseLastName, address: reponseAddress, city: reponseCity, email: reponseEmail}
      const finalCommande = {contact: form, products: tabProducts}

      console.log("Validé")

      post(finalCommande)
    }

    else{
      console.log("Refusé")
    }
  })


//  Envoi pour confirmation de la commande  //
  function post(finalBasket){

    return fetch("http://localhost:3000/api/products/order", {
	    method: "POST",
	    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
	    body: JSON.stringify(finalBasket)
    })

    .then(res => {
      return res.json()
    })

    .then(resJson => {
      sessionStorage.setItem("confirmation",JSON.stringify(resJson.orderId))
      window.location.href = "/front/html/confirmation.html"
    })

    .catch(error => {
      console.log(error)
      alert("404")
    })
  }