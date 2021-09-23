let produitAuPanier = recupPanier();

// Sélection de la classe où le code va être injecté :
const containerPanier = document.querySelector(".container_panier");

// Si le panier est vide, afficher le panier est vide :
if (produitAuPanier.length == 0) {
  const panierVide = `
  <div class="panier_vide">
    <p>Le panier est vide</p>
  </div>
  `;
  containerPanier.innerHTML = panierVide;
} else {
  // Si le panier n'est pas vide, afficher les produits dans le localStorage :
  let structureProduitPanier = [];
  for (i = 0; i < produitAuPanier.length; i++) {
    structureProduitPanier =
      structureProduitPanier +
      `
      <div class="container_panier">
        <div class="container_recap_produit">
          <div class="recap_produit">
            <div class="designation">
              <div class="nom">Produit : ${produitAuPanier[i].produitSelect}</div>
              <div class="couleur">Couleur : ${produitAuPanier[i].couleurChoisit}</div>
              <div class="quantite">Quantité : ${produitAuPanier[i].quantite}</div>
              <div class="prix_unitaire">${produitAuPanier[i].prixProduit}</div>
            </div>
          </div>
          <div class="prix_total">Total = ${produitAuPanier[i].prixTotal}</div>
        </div>
      </div>      
  `;
  }
  if (i == produitAuPanier.length) {
    containerPanier.innerHTML = structureProduitPanier;
  }
}

//----------------------Bouton vider le panier----------------------------
// Insertion du bouton dans le HTML :
containerPanier.insertAdjacentHTML("beforeend", `
  <div class="vider_panier">
    <button class="btn_vider_panier">Vider le panier</button>
  </div>
`);
// Sélection du bouton Vider le panier :
const btnViderPanier = document.querySelector(".btn_vider_panier");
// Supression de la key "panier" dans le localStorage pour vider le panier :
btnViderPanier.addEventListener("click", (e) => {
  e.preventDefault;
  localStorage.removeItem("panier");
  alert("Le panier a été vidé");
  window.location.assign("panier.html");
});

//----------------Calcul du montant total de la commande-------------------
let calculTotalCommande = [];

// récupérer les prix dans le panier :
for (let j = 0; j < produitAuPanier.length; j++) {
  let prixDansPanier = produitAuPanier[j].prixTotal;

  // Mettre les prix du panier dans tableau calculTotalCommande :
  calculTotalCommande.push(prixDansPanier);
}

// Transformer les prix en nombre afin de pouvoir les additionner :
calculTotalCommande = calculTotalCommande.map((x) => parseFloat(x));

// Additionner les prix du tableau "prixDansPanier" :
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const total = calculTotalCommande.reduce(reducer);

// Afficher le résultat dans le total de la commande en HTML :
const totalCommande = `
  <div class="total_commande">Total de la commande : ${euro.format(total)}</div>
`;

// Insertion de la DIV total de commande dans le HTML :
containerPanier.insertAdjacentHTML("beforeend", totalCommande);

//------------------------Formulaire-------------------------------

  //Vérification du formulaire avant envoi au localStorage
  document.querySelector(".form input[type='button']").addEventListener("click", function (){
    let valid = true;
    for (let input of document.querySelectorAll(".form input")){
    valid = valid && input.reportValidity();
    if(!valid){
      break;
    }
  }
  if(valid){
    const contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#mail").value,
    };
    localStorage.setItem("contact", JSON.stringify(contact));

  // Mettre les valeurs du formulaire et les produits selectionnés dans un objet à envoyer au serveur :
    let products = produitAuPanier.map((p) => p.idNounours);
    const order = {
      contact,
      products,
    };

    // Envoi au serveur :
    const envoiServeur = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    };

    let confirmationPrix = euro.format(total);

    fetch("http://localhost:3000/api/teddies/order", envoiServeur)
      .then((response) => response.json())
      .then((data) => {
        
        localStorage.setItem("orderId", data.orderId);
        localStorage.setItem("total", confirmationPrix);
        document.location.assign("confirmation.html");
      })
      .catch((erreur) => {
        alert("Il y a eu une erreur : " + erreur.message);
      });
  }
});