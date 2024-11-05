const App = {
  data() {
    return {
      title: 'Vue v-model Examples',
      name: '',
      feedback: '',
      selectedColor: '',
      gender: '',
      subscribe: false,
      hobbies: [],
      age: null,
      email: ''
    };
  }
};

Vue.createApp(App).mount('#app');
