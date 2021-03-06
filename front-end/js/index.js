//Appel de l'api :
function fetchData () {
   fetch("http://localhost:3000/api/teddies")
      .then(response =>{
         return response.json();
      })
      .then(data => {
         const html = data
         // Formatage de la liste des produits :
            .map(boxProduits => {
               return `
               <div class="boxProduits">
                  <a href="produit.html?id=${boxProduits._id}">
                        <div class="container">
                           <div class="image_produits">
                              <img src=${boxProduits.imageUrl} alt="image de nounours">
                           </div>
                           <div class="description">
                              <div class="nom">${boxProduits.name}</div>
                              <div class="prix">${(euro.format(boxProduits.price/100))}</div>
                           </div>
                        </div
                  </a>
               </div>
               `;
            })
            .join("");
            document.querySelector("#teddies").insertAdjacentHTML("afterbegin", html);
         })
      //Message s'il y a une erreur :
      .catch(erreur => {
         alert("Il y a eu un problème lors de la récupération des produits : " + erreur.message)
      });
}

fetchData();
