let montantTotal = localStorage.getItem("total");
console.log(montantTotal);
let orderId = localStorage.getItem("orderId");
console.log(orderId);
let confirmation = document.querySelector("#confirmation");

let confirmationCommande = `
  <div class="container_confirmation">
    <div class="remerciements">Nous vous remercions d'avoir commandé sur Orinounours.</div>
    <div class="prix_total">Le montant total de votre commande est de : ${montantTotal}</div>
    <div class="order_id">Le numéro de votre commande est le : ${orderId}</div>
  </div>
`;
confirmation.insertAdjacentHTML("beforeend", confirmationCommande);

localStorage.clear();