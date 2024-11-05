const App = {
  data() {
    return {
      "name": 'Learning Vue.js Basics!!!',
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
    };
  },
   computed: {
    filteredProducts() {
      return this.$data.products.
      filter(product => product.price < 500);
    }
  }
};

Vue.createApp(App).mount('#app')