//  Affichage des Articles sur la page index.html  //
presentation()
    
async function presentation(){

  //  Récupération  de la réponse de l'api par article se trouvant dans le localStorage  //
  let articlesJson = await get().then(response => response)
  for(article of articlesJson){

    document.getElementById("items").innerHTML += "<a href='./product.html?id="+article._id+"'><article><img src="+article.imageUrl+" alt="+article.altTxt+"><h3 class='productName'>"+article.name+"</h3><p class='productDescription'>"+article.description+"</p></article></a>";
  }
    
}

//  Récupération des articles dans l'api  //
function get(){

  return fetch("http://localhost:3000/api/products/")

  .then(res => res.json())

  .then(articlesJson => {
    return articlesJson
  })

  .catch(err => {
    console.log(err)
    alert("404")
  })
} 