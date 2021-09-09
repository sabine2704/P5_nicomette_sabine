let params = new URL(document.location).searchParams;
let id = params.get("id");

// Récupération de l'id du produit sélectionné et mise en forme du formulaire pour ajouter au panier :
fetch(`http://localhost:3000/api/teddies/${id}`)
  .then((data) => data.json())
  .then((jsonProduit) => {
    console.log(jsonProduit);
    let options = "";
    for (let i = 0; i < jsonProduit.colors.length; i++) {
      options += `<option value="${jsonProduit.colors[i]}">${jsonProduit.colors[i]}</option>`;
    }
    document.querySelector(
      "#produit"
    ).innerHTML = `<div class="container_produit">
            <div class="image_produit">
               <img src=${jsonProduit.imageUrl} alt="image de nounours">
            </div>
            <div class="container_details">
               <div class="nom">${jsonProduit.name}</div>
               <div class="prix">Prix : ${euro.format(jsonProduit.price / 100)}</div>
               <div class="description">Description : ${jsonProduit.description}</div>
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
        // Récupération des valeurs sélectionnées :
        let produitAjoute = {
          idNounours: id,
          produitSelect: document.querySelector(".nom").innerText,
          prixProduit: document.querySelector(".prix").innerText,
          quantite: parseFloat(document.querySelector("#qte").value),
          couleurChoisit: document.querySelector("#option_produit").value,
          prixTotal: euro.format((qte.value * jsonProduit.price) / 100),
        };
        console.log(produitAjoute);

        //----------------------Localstorage--------------------------
        // Mettre au format JSON les données qui sont en objet dans le localstorage :
        let produitAuPanier = JSON.parse(localStorage.getItem("panier"));

        //   Fonction fenêtre popup de confirmation d'ajout au panier :
        let popupConfirmation = () => {
          if (
            window.confirm(
              `${produitAjoute.quantite} nounours ${produitAjoute.produitSelect} ${produitAjoute.couleurChoisit}, ajouté(s) au panier.\nPour consulter le panier, cliquez sur OK ou sur ANNULER pour revenir à la page d'accueil des nounours `
            )
          ) {
            window.location.href = "panier.html";
          } else {
            window.location.href = "index.html";
          }
        };

        // Fonction ajouter un produit selectionné dans le localStorage :
        const ajoutProduitLocalStorage = () => {
          // ajout dans le tableau de l'objet avec les values choisi par l'utilisateur :
          produitAuPanier.push(produitAjoute);
          // transformation en format JSON et envoi dans la key "produit" du localStorage :
          localStorage.setItem("panier", JSON.stringify(produitAuPanier));
        };

        //Vérification s'il y a des produits dans le localstorage :
        // s'il y a des produits d'enregistrés dans le localStorage :
        if (produitAuPanier) {
          ajoutProduitLocalStorage();
          console.log(produitAuPanier);
          popupConfirmation();
          // s'il n'y a pas de produit d'enregistré dans le localStorage :
        } else {
          produitAuPanier = [];
          ajoutProduitLocalStorage();
          console.log(produitAuPanier);
          popupConfirmation();
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
