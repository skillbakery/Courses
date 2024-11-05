export default {
  template: `
    <div class="product-card">
      <img :src="product.imageUrl" :alt="product.name" />
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>Price: $ {{ product.price }}</p>
      <label>Quantity:</label>
      <input type="number" v-model="internalQuantity" min="1" />
      <button @click="addToCart">Add to Cart</button>
    </div>
  `,
  props: {
    product: {
      type: Object,
      required: true
    },
    modelValue: {
      type: Number,
      default: 1
    }
  },
  computed: {
    // Create a computed property that gets and sets the value for v-model
    internalQuantity: {
      get() {
        return this.modelValue;
      },
      set(newQuantity) {
        // Emit an input event to update the parent's value
        this.$emit('update:modelValue', newQuantity);
      }
    }
  },
  methods: {
    // Emit an event to notify the parent component
    addToCart() {
      this.$emit('product-added', { ...this.product, quantity: this.internalQuantity });
    }
  }
};
