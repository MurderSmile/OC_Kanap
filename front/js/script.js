//  Affichage des Articles dans la page index.html  //
presentation()
    
async function presentation(){

  //  Récupération des éléments de chaque article se trouvant dans l'api  //
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

  .catch(error => {
    console.log(error)
    alert("404")
  })

} 