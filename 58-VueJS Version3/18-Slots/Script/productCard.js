// ProductCard.js
export default {
  template: `
    <div class="product-card">
     
      <!-- Display Product Name -->
      <h2>{{ product.name }}</h2>
      <!-- Default Slot for Product Description -->
      <div class="description">
        <slot>
          <p>{{ product.description }}</p> <!-- Fallback content -->
        </slot>
      </div>

      <!-- Scoped Slot for Product Info -->
      <div class="description">
        <slot name="prod" 
          :item="product"
          :salesMessage="getSaleMessage()" >
          <p>{{ product.description }}</p> <!-- Fallback content -->
        </slot>
      </div>
      
      <!-- Named Slot for Footer -->
      <div class="footer">
        <slot name="footer">
          <button @click="addToCart">Add to Cart - $ {{ product.price }}</button> <!-- Fallback content -->
        </slot>
      </div>
    </div>
  `,
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart() {
      alert(`${this.product.name} added to cart!`);
    },
    getSaleMessage() {
      return this.product.onSale ? 'Special Discount!' : 'Regular Price';
    }
  }
};
