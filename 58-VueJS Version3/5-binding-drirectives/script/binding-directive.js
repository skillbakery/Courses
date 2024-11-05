const App = {
    data() {
      return {
        "name": 'Learning Vue.js Basics!!!',
        "imagePath":'images/wallpaper-nature-2.jpg',
        "imageAlt":'A beautiful nature wallpaper.',
        "imageWidth":'600',
        "imageHeight":'400',
      };
    },
  }
  
  Vue.createApp(App).mount('#app')