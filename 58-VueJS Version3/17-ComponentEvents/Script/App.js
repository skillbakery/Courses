import ProductComponent from './ProductComponent.js';

const app = Vue.createApp({
  components: {
    ProductComponent
  },
  data() {
    return {
      products: [
        { id: 1, name: "Smartphone", price: 799, description: "A high-end smartphone.", imageUrl: "https://via.placeholder.com/150" },
        { id: 2, name: "Laptop", price: 1200, description: "A powerful laptop.", imageUrl: "https://via.placeholder.com/150" }
      ],
      cart: [],
      quantities: [1, 1] // Array to track quantities of each product
    };
  },
  methods: {
    // Method to handle the product-added event from the child
    handleProductAdded(product) {
      this.cart.push(product);
      alert(`${product.name} (x${product.quantity}) was added to your cart!`);
    }
  }
});

// Template that uses the product component and listens to the custom event
app.component('product-component', ProductComponent);
app.mount('#app');
