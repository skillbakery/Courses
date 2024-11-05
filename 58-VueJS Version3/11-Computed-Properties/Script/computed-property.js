const App = {
  data() {
    return {
      name: 'Learning Vue.js with Price Filter',
      priceRange: 500, // Default price range for the slider
      priceInput:'',
      products: [
        { id: 1, name: "Smartphone", price: 699.99, description: "Latest model with 5G support", imageUrl: "https://via.placeholder.com/200x200.png?text=Smartphone" },
        { id: 2, name: "Laptop", price: 999.99, description: "Powerful laptop with 16GB RAM", imageUrl: "https://via.placeholder.com/200x200.png?text=Laptop" },
        { id: 3, name: "Tablet", price: 399.99, description: "Portable and powerful with 10-inch display", imageUrl: "https://via.placeholder.com/200x200.png?text=Tablet" },
        { id: 4, name: "Smartwatch", price: 199.99, description: "Stay connected with fitness tracking", imageUrl: "https://via.placeholder.com/200x200.png?text=Smartwatch" },
        { id: 5, name: "Wireless Earbuds", price: 129.99, description: "Noise-cancelling, high-quality sound", imageUrl: "https://via.placeholder.com/200x200.png?text=Earbuds" },
        { id: 6, name: "Gaming Console", price: 499.99, description: "Next-gen gaming experience", imageUrl: "https://via.placeholder.com/200x200.png?text=Console" },
        { id: 7, name: "Bluetooth Speaker", price: 89.99, description: "Portable speaker with deep bass", imageUrl: "https://via.placeholder.com/200x200.png?text=Speaker" },
        { id: 8, name: "4K TV", price: 799.99, description: "Ultra HD smart TV with vibrant colors", imageUrl: "https://via.placeholder.com/200x200.png?text=4K+TV" },
        { id: 9, name: "DSLR Camera", price: 1199.99, description: "Professional-grade photography", imageUrl: "https://via.placeholder.com/200x200.png?text=Camera" },
        { id: 10, name: "Smart Home Assistant", price: 59.99, description: "Voice-controlled smart home hub", imageUrl: "https://via.placeholder.com/200x200.png?text=Assistant" }
      ]
    };
  },
  computed: {
    // Get the minimum and maximum prices for the slider
    minPrice() {
      return Math.min(...this.products.map(p => p.price));
    },
    maxPrice() {
      return Math.max(...this.products.map(p => p.price));
    },
     // Cached computed property: totalPrice is only recalculated if products change
    totalPrice() {
      console.log("Calculating total price...");
      return this.filteredProducts.reduce((total, product) => total + product.price, 0);
    },
    filteredProducts() {
      const maxPrice = this.priceInput || this.priceRange;  // Use priceInput if provided, otherwise use priceRange
      return this.products.filter(product => product.price <= maxPrice);
    },
    // Setter - updates priceInput when the user enters a new price
    set(newPrice) {
        this.priceInput = newPrice;
    }
  },
  methods: {
    // Method to update the price of the first product
    updatePrice() {
        this.products[0].price = 750.00; // Change the price of the first product
    },
  },
   watch: {
    // Use deep watcher to watch the entire `products` array and detect changes in the nested properties
    products: {
      handler(newValue, oldValue) {
        console.log(`Products changed from`, oldValue, `to`, newValue);
      },
      deep: true, // Ensures nested properties are also watched
    },
  },
};

Vue.createApp(App).mount('#app');
