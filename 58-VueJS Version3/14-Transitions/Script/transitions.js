const ProductA = {
template: `<div>
            <h3>Product A</h3>
            <p>Price: $100</p>
            </div>`
};

const ProductB = {
template: `<div>
            <h3>Product B</h3>
            <p>Price: $150</p>
            </div>`
};

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
     showProduct: true,
     currentProductComponent: 'ProductA'
    };
  },
  components: {
        ProductA,
        ProductB
    },
  methods: {
    toggleProduct() {
    // Toggle between ProductA and ProductB
    this.currentProductComponent = this.currentProductComponent === 'ProductA' ? 'ProductB' : 'ProductA';
    },
    addProduct() {
      const id = this.products.length + 1;
      this.products.push({ id, name: `Product ${String.fromCharCode(64 + id)}`, price: 100 + id * 50 });
    },
    removeLastProduct() {
      this.products.pop();
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      let delay = 0;
      setTimeout(() => {
        el.style.transition = 'opacity 1s';
        el.style.opacity = 1;
        done();
      }, delay);
    },
    leave(el, done) {
      el.style.transition = 'opacity 1s';
      el.style.opacity = 0;
      setTimeout(done, 1000);
    }
  },
};

Vue.createApp(App).mount('#app');
