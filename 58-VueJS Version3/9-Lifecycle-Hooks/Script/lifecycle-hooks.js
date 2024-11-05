const App = {
  data() {
    return {
      "name": 'Learning Vue.js Lifecycle Hooks with Real Examples',
      "imagePath": 'images/wallpaper-nature-2.jpg',
      "imageAlt": 'A beautiful nature wallpaper.',
      "imageWidth": '600',
      "imageHeight": '400',
      "products": [
        { 
          "id": 1, 
          "name": "Smartphone", 
          "price": 699.99, 
          "description": "Latest model with 5G support", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Smartphone" 
        },
        { 
          "id": 2, 
          "name": "Laptop", 
          "price": 999.99, 
          "description": "Powerful laptop with 16GB RAM", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Laptop" 
        },
        { 
          "id": 3, 
          "name": "Tablet", 
          "price": 399.99, 
          "description": "Portable and powerful with 10-inch display", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Tablet" 
        },
        { 
          "id": 4, 
          "name": "Smartwatch", 
          "price": 199.99, 
          "description": "Stay connected with fitness tracking", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Smartwatch" 
        },
        { 
          "id": 5, 
          "name": "Wireless Earbuds", 
          "price": 129.99, 
          "description": "Noise-cancelling, high-quality sound", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Earbuds" 
        },
        { 
          "id": 6, 
          "name": "Gaming Console", 
          "price": 499.99, 
          "description": "Next-gen gaming experience", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Console" 
        },
        { 
          "id": 7, 
          "name": "Bluetooth Speaker", 
          "price": 89.99, 
          "description": "Portable speaker with deep bass", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Speaker" 
        },
        { 
          "id": 8, 
          "name": "4K TV", 
          "price": 799.99, 
          "description": "Ultra HD smart TV with vibrant colors", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=4K+TV" 
        },
        { 
          "id": 9, 
          "name": "DSLR Camera", 
          "price": 1199.99, 
          "description": "Professional-grade photography", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Camera" 
        },
        { 
          "id": 10, 
          "name": "Smart Home Assistant", 
          "price": 59.99, 
          "description": "Voice-controlled smart home hub", 
          "imageUrl": "https://via.placeholder.com/200x200.png?text=Assistant" 
        }
      ],
      apiInterval: null
    };
  },
  
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.price < 500);
    }
  },
  
  // Lifecycle Hooks
  beforeCreate() {
    console.log("beforeCreate: Setting up necessary initial data.");
  },
  
  created() {
    console.log("created: Component initialized. Setting up interval to simulate price updates.");
    this.apiInterval = setInterval(() => {
      console.log("Simulating price update...");
      this.fetchProductPriceUpdates();
    }, 5000); // Update every 5 seconds
  },
  
  beforeMount() {
    console.log("beforeMount: Preparing the component to be added to the DOM.");
  },
  
  mounted() {
    console.log("mounted: Component mounted. Starting initial data simulation.");
    this.fetchProductPriceUpdates(); // Initial fetch for simulating price updates
  },

  activated() {
    console.log("activated: Component has been activated (in <keep-alive>).");
  },

  deactivated() {
    console.log("deactivated: Component has been deactivated (in <keep-alive>).");
  },

  beforeUpdate() {
    console.log("beforeUpdate: Product data is about to be updated.");
  },
  
  updated() {
    console.log("updated: The DOM has been updated with the latest product data.");
  },

  errorCaptured(err, vm, info) {
    console.log("errorCaptured: An error was captured:", err, info);
    return false; // Returning false prevents the error from propagating further
  },

  renderTracked() {
    console.log("renderTracked: A reactive dependency was accessed during rendering.");
  },

  renderTriggered() {
    console.log("renderTriggered: A reactive dependency was updated, causing a re-render.");
  },

  beforeUnmount() {
    console.log("beforeUnmount: Cleaning up resources.");
    clearInterval(this.apiInterval); // Clean up the interval before the component is destroyed
  },
  
  unmounted() {
    console.log("unmounted: Component has been removed from the DOM.");
  },
  
  methods: {
    fetchProductPriceUpdates() {
      // Simulate a price update for products
      this.products = this.products.map(product => {
        // Randomly adjust the price by ±10% for each product
        const priceChange = (Math.random() * 0.2 - 0.1) * product.price;
        const updatedPrice = (product.price + priceChange).toFixed(2);
        return { ...product, price: parseFloat(updatedPrice) };
      });
    },
  }
};

Vue.createApp(App).mount('#app');