// App.js
import ProductCard from './productCard.js';

const app = Vue.createApp({
  components: {
    ProductCard
  },
  data() {
    return {
      products: [
        { id: 1, name: "Smartphone", price: 799, description: "A high-end smartphone.", imageUrl: "https://via.placeholder.com/150",onSale:true },
        { id: 2, name: "Laptop", price: 1200, description: "A powerful laptop.", imageUrl: "https://via.placeholder.com/150",onSale:true }
      ]
    };
  },
   methods: {
        addToCart(product) {
            alert('Buy Now! Only $' + product.price);
        }
    }
});

app.mount('#app');
