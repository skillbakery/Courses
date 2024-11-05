const App = {
  data() {
    return {
      products: [
        { id: 1, name: "Smartphone", price: 699.99, description: "Latest model with 5G support", imageUrl: "https://via.placeholder.com/200x200.png?text=Smartphone" },
        { id: 2, name: "Laptop", price: 999.99, description: "Powerful laptop with 16GB RAM", imageUrl: "https://via.placeholder.com/200x200.png?text=Laptop" },
        { id: 3, name: "Tablet", price: 399.99, description: "Portable and powerful with 10-inch display", imageUrl: "https://via.placeholder.com/200x200.png?text=Tablet" },
        { id: 4, name: "Smartwatch", price: 199.99, description: "Stay connected with fitness tracking", imageUrl: "https://via.placeholder.com/200x200.png?text=Smartwatch" },
        { id: 5, name: "Wireless Earbuds", price: 129.99, description: "Noise-cancelling, high-quality sound", imageUrl: "https://via.placeholder.com/200x200.png?text=Earbuds" }
      ],
      cart: []
    };
  },
  computed: {
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    totalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
      }
    }
  }
};

Vue.createApp(App).mount('#app');
