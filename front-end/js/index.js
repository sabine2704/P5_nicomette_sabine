//Formatage du prix en euros :
const euro = new Intl.NumberFormat('fr-FR', {
   style: 'currency',
   currency: 'EUR',
   minimumFractionDigits: 2
   });

//Appel de l'api :
function fetchData () {
   fetch("http://localhost:3000/api/teddies")
      .then(response =>{
         return response.json();
      })
      .then(data => {
         console.log(data);
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
            console.log(html);
            document.querySelector("#teddies").insertAdjacentHTML("afterbegin", html);
         })
      //Message s'il y a une erreur :
      .catch(erreur => {
         alert("Il y a eu un problème lors de la récupération des produits : " + erreur.message)
      });
}

fetchData();
