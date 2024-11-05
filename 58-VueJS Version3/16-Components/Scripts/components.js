// Define a Product component
const ProductComponent = {
  template: `
    <div class="card h-100">
      <img :src="product.imageUrl" class="card-img-top" :alt="product.name">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">{{ product.description }}</p>
        <p class="card-text">$ {{ product.price }}</p>
        <button class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  `,
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    discountedPrice() {
      // Compute a 10% discount
      return (this.product.price * 0.9).toFixed(2);
    }
  },
   watch: {
    cartCount(newValue, oldValue) {
      console.log(`Cart count changed from ${oldValue} to ${newValue}`);
    }
  },
 data() {
    return {
      cartCount: 0,
    };
  },
  methods: {
    addToCart(product) {
         this.cartCount += 1;
      alert(`${product.name} added to cart!`);
    },
  },
    mounted() {
    console.log(`Component for ${this.product.name} has been mounted.`);
  }
};

// Vue App definition
const app = Vue.createApp({
  data() {
    return {
      products: [
        { id: 1, name: "Smartphone", price: 699.99, description: "Latest model with 5G support", imageUrl: "https://via.placeholder.com/150x150.png?text=Smartphone" },
        { id: 2, name: "Laptop", price: 999.99, description: "Powerful laptop with 16GB RAM", imageUrl: "https://via.placeholder.com/150x150.png?text=Laptop" },
        { id: 3, name: "Tablet", price: 399.99, description: "Portable with 10-inch display", imageUrl: "https://via.placeholder.com/150x150.png?text=Tablet" }
      ]
    };
  },
});

// Register the ProductComponent globally
app.component('product-component', ProductComponent);

// Mount the Vue app
app.mount("#app");