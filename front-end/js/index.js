function fetchData () {
    fetch("http://localhost:3000/api/teddies")
        .then(response =>{
            return response.json();
            console.log(data);
        })
        .then(data => {
            console.log(data);
            const html = data
                .map(boxProduits => {
                    return `
                    <div class="boxProduits">
                        <div class="image">
                            <img src=${boxProduits.imageUrl} alt="image de nounours">
                        </div>
                        <div class="description">
                            <div class="nom">${boxProduits.name}</div>
                            <div class="prix">${(boxProduits.price/100) + "€"}</div>
                    </div>
                    </div>
                    `;
                })
                .join("");
            console.log(html);
            document.querySelector("#teddies").insertAdjacentHTML("afterbegin", html);
        })
        .catch(erreur => {
            alert("Il y a eu un problème lors de la récupération des produits : " + erreur.message)
        });
}

fetchData();