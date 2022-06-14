//  Récuperation de l'ID dans l'URL  //
  const idProduit = window.location.search.split("?id=%20").join("");


//  Affichage des données de l'Article dans la page product.html  //
  presentation()

  async function presentation(){

    //  Récupération des articles dans l'API  //
    let articleJson = await get().then(response => response)

    document.querySelector(".item__img").innerHTML = `<img src= ${articleJson.imageUrl} alt= ${articleJson.altTxt} ></img>`
    document.getElementById("title").textContent = articleJson.name
    document.getElementById("price").textContent = articleJson.price
    document.getElementById("description").textContent = articleJson.description
    for(color of articleJson.colors){
      document.getElementById("colors").innerHTML += `<option value= ${color} > ${color} </option>`
    }

  }
  

  //  Récupération des articles dans l'API  //
  function get(){

    return fetch(`http://localhost:3000/api/products/${idProduit}`)

    .then(res => res.json())

    .then(articleJson => {
      return articleJson
    })

    .catch(error => {
      console.log(error)
      alert("404")
    })

  }


//  Envoi de l'Article vers le LocalStorage  //
  addLocalStorage()

  function addLocalStorage(){

    document.getElementById("addToCart").addEventListener('click', function(e){

      e.stopPropagation()

      let local = JSON.parse(localStorage.getItem("commande"))
      let quantityProduit = document.getElementById("quantity").value
      let colorProduit = document.getElementById("colors").value
      let addBasket = { idCommande: idProduit, quantityCommande: quantityProduit, colorCommande: colorProduit}
      

      //  Vérification que la quantité et/ou la couleur ne soit pas null  //
      if(quantityProduit < 1 ||quantityProduit > 100 || colorProduit == ''){
        alert("ATTENTION: Quantité et/ou couleur invalide(s)")
      }

      //  Vérification et ajustement de la quantité en cas d'article de même Id et de même couleur  //
      else if(local){

        //  Indice de répétition d'un article  //
        let repeatArticle = 0

        for( let i in local){
          
          if(addBasket.idCommande === local[i].idCommande && addBasket.colorCommande === local[i].colorCommande){
            repeatArticle++
            const newQuantity = parseInt(local[i].quantityCommande) + parseInt(addBasket.quantityCommande) + ''

            //  Rejet de l'ajout en cas de dépassement de quantité  (100)  //
            if(newQuantity > 100){
              alert(`
                ATTENTION: Vous dépasser la quantité maximal(100.max)
                (${local[i].quantityCommande} article(s) déja commandé(s))
                Vous voulez ajouter ${addBasket.quantityCommande} article(s) soit ${addBasket.quantityCommande - (100 - local[i].quantityCommande)} article(s) de trop.`
              )
            }

            else{
              local[i].quantityCommande = newQuantity
              localStorage.setItem("commande",JSON.stringify(local))
              alert("Article(s) ajouté(s) au panier !")
            }
            
          }

        }   

        if(repeatArticle === 0){
          local.push(addBasket)
          localStorage.setItem("commande",JSON.stringify(local))
          alert("Article(s) ajouté(s) au panier !")
        }
        
      }

      //  Création du panier "commande" dans le localStorage et ajout de l'article  //
      else{
        local = []
        local.push(addBasket)
        localStorage.setItem("commande",JSON.stringify(local))
        alert("Article(s) ajouté(s) au panier !")
      }

    })

  }