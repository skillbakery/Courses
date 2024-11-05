const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            isVisible: false,
            items: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' }
            ],
            products: [
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
                { id: 3, name: 'Product 3' }
            ]
        };
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        shuffleItems() {
            this.items = this.items.reverse();
        },
        addProduct() {
            const newId = this.products.length + 1;
            this.products.push({ id: newId, name: `Product ${newId}` });
        },
        shuffleProducts() {
            this.products = this.products.sort(() => Math.random() - 0.5);
        }
    }
});

app.mount('#app');
