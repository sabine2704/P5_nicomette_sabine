let params = new URL(document.location).searchParams;
let id = params.get("id");

//Formatage du prix en euros :
const euro = new Intl.NumberFormat('fr-FR', {
   style: 'currency',
   currency: 'EUR',
   minimumFractionDigits: 2
   });


fetch(`http://localhost:3000/api/teddies/${id}`)
.then(data => data.json())
.then(jsonProduit => {
   console.log(jsonProduit)
   let options = "";
   const { colors, name, price, imageUrl, description } = jsonProduit;
   for (let i = 0; i < colors.length; i++){
      options += `<option value="${colors[i]}">${colors[i]}<option>`;
   }
      document.querySelector("#produit").innerHTML =
         `<div class="container_produit">
            <div class="image_produit">
               <img src=${imageUrl} alt="image de nounours">
            </div>
            <div class="container_details">
               <div class="nom">${name}</div>
               <div class="prix">Prix : ${(euro.format(price/100))}</div>
               <div class="description">Description : ${description}</div>
               <div class="couleurs">
                  Couleur : <select name="couleurs" id="colors">
                  <option value="Choisir couleur">Choisissez votre couleur</option>
                  ${options}
                  </select>
               </div>
               <div class="commande">
                  <label for="commande">Quantité :</label>
                  <input id="qte" type="number" name="nombre" value="0" min="1" max="100">
                  <input id="validation" type="submit" value="Ajouter au panier">
               </div>
            </div>
         </div>`
   })
   .catch(erreur => {
      alert("Il y a eu un problème lors de la récupération des produits : " + erreur.message)
   });


