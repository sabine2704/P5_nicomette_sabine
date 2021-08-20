let params = new URL(document.location).searchParams;
let id = params.get("id");

//Formatage du prix en euros :
const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

// Récupération de l'id du produit sélectionné et mise en forme du formulaire pour ajouter au panier :
fetch(`http://localhost:3000/api/teddies/${id}`)
  .then((data) => data.json())
  .then((jsonProduit) => {
    console.log(jsonProduit);
    let options = "";
    const { colors, name, price, imageUrl, description } = jsonProduit;
    for (let i = 0; i < colors.length; i++) {
      options += `<option value="${colors[i]}">${colors[i]}</option>`;
    }
    document.querySelector(
      "#produit"
    ).innerHTML = `<div class="container_produit">
            <div class="image_produit">
               <img src=${imageUrl} alt="image de nounours">
            </div>
            <div class="container_details">
               <div class="nom">${name}</div>
               <div class="prix">Prix : ${euro.format(price / 100)}</div>
               <div class="description">Description : ${description}</div>
               <div class="couleurs">
                  Couleur : <select name="option_couleurs" id="option_produit">
                  <option value="couleur" select="selected">Choissisez votre couleur${options}</option>
                  </select>
               </div>
               <div class="commande">
                  <label for="commande">Quantité :</label>
                     <input id="qte" type="number" name="nombre" value="1" min="1" max="100">
                     
                     <input id="envoyer" type="submit" value="Ajouter au panier">
               </div>
            </div>
         </div>`;

    // --------------Gestion du panier-----------------------

    // Sélection du bouton ajouter au panier dans le DOM :
    let envoyerPanier = document.querySelector("#envoyer");

    // Ecouter le bouton et envoyer le panier
    envoyerPanier.addEventListener("click", function (event) {
      if (qte.value > 0 && qte.value < 100) {
        //   alert("Produit ajouté au panier !");

        // Récupération des valeurs sélectionnées :
        let produitAjoute = {
          idNounours: id,
          produitSelect: document.querySelector(".nom").innerText,
          prixProduit: document.querySelector(".prix").innerText,
          quantité: parseFloat(document.querySelector("#qte").value),
          couleurChoisit: document.querySelector("#option_produit").value,
        };
        console.log(produitAjoute);

        //----------------------Localstorage--------------------------
        // Mettre au format JSON les données qui sont en objet dans le localstorage :
        let produitAuPanier = JSON.parse(localStorage.getItem("panier"));
        //Vérification s'il y a des produits dans le localstorage :
        if (produitAuPanier) {
          produitAuPanier.push(produitAjoute);
          localStorage.setItem("panier", JSON.stringify(produitAuPanier));
          console.log(produitAuPanier);
        } else {
          produitAuPanier = [];
          produitAuPanier.push(produitAjoute);
          localStorage.setItem("panier", JSON.stringify(produitAuPanier));
          console.log(produitAuPanier);
        }
      }
    });
  })
  .catch((erreur) => {
    alert(
      "Il y a eu un problème lors de la récupération des produits : " +
        erreur.message
    );
  });
