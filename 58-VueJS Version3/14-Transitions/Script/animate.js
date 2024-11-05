const app = Vue.createApp({
  data() {
    return {
      title: "Animated Product Collection",
      products: [
        { id: 1, name: "Smartphone", price: 699.99, description: "Latest model with 5G support", imageUrl: "https://via.placeholder.com/150x150.png?text=Smartphone" },
        { id: 2, name: "Laptop", price: 999.99, description: "Powerful laptop with 16GB RAM", imageUrl: "https://via.placeholder.com/150x150.png?text=Laptop" },
        { id: 3, name: "Tablet", price: 399.99, description: "Portable with 10-inch display", imageUrl: "https://via.placeholder.com/150x150.png?text=Tablet" }
      ]
    };
  },
  methods: {
    applyAnimation(event) {
      event.target.classList.add("animate__pulse");
    },
    resetAnimation(event) {
      event.target.classList.remove("animate__pulse");
    }
  }
});

app.mount("#app");
