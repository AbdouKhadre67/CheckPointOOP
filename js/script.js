document.addEventListener("DOMContentLoaded", function() {
    
    class ShoppingCart {
        constructor() {
            this.initializeCart();
            this.updateTotal();
        }

        // Fonction pour mettre à jour le total
        updateTotal() {
            let total = 0;
            document.querySelectorAll('.card').forEach((card) => {
                const priceText = card.querySelector('.unit-price').innerText.trim();
                const price = parseFloat(priceText.replace('$', '').replace(',', ''));
                const quantity = parseInt(card.querySelector('.quantity').innerText);
                
                // Vérifier si le prix et la quantité sont des nombres valides
                if (!isNaN(price) && !isNaN(quantity)) {
                    total += price * quantity;
                }
            });
            document.querySelector('.total').innerText = 'Total: $' + total.toFixed(2);
        }

        // Fonction pour gérer la mise à jour de la quantité
        updateQuantity(e) {
            const quantityElement = e.target.parentNode.querySelector('.quantity');
            let quantity = parseInt(quantityElement.innerText);

            if (e.target.classList.contains('fa-plus-circle')) {
                quantity += 1;
            } else if (e.target.classList.contains('fa-minus-circle') && quantity > 0) {
                quantity -= 1;
            }

            quantityElement.innerText = quantity;
            this.updateTotal();
        }

        // Fonction pour gérer la suppression de produit
        removeProduct(e) {
            const card = e.target.closest('.card');
            if (card) {
                card.remove();
                this.updateTotal();
            }
        }

        // Fonction pour gérer l'ajout aux favoris
        toggleFavorite(e) {
            const icon = e.target;
            icon.style.color = icon.style.color === 'red' ? 'black' : 'red';
        }

        // Initialisation des événements
        initializeCart() {
            document.querySelectorAll('.fa-plus-circle, .fa-minus-circle').forEach((icon) => {
                icon.addEventListener('click', this.updateQuantity.bind(this));
            });

            document.querySelectorAll('.fa-trash-alt').forEach((icon) => {
                icon.addEventListener('click', this.removeProduct.bind(this));
            });

            document.querySelectorAll('.fa-heart, .fa-heart-o').forEach((icon) => {
                icon.addEventListener('click', this.toggleFavorite.bind(this));
            });
        }
    }

    // Initialiser le panier d'achat
    new ShoppingCart();
});
