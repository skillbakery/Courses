import("../pkg/index.js")
  .then(() => {
    // Import the custom logic
    import("./wasm-memory.js")
    .then(() => {
        import("./sys-date.js").then(() => {
        }).catch(console.error);
    })
    .catch(console.error);
  })
  .catch(console.error);
