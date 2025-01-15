use wasm_bindgen::prelude::*;
use web_sys::console;
use js_sys::Date;
// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    type HTMLDocument;
    static document: HTMLDocument;
    #[wasm_bindgen(method)]
    fn createElement(this: &HTMLDocument, tagName: &str) -> Element;
    #[wasm_bindgen(method, getter)]
    fn body(this: &HTMLDocument) -> Element;

    type Element;
    #[wasm_bindgen(method, setter = innerHTML)]
    fn set_inner_html(this: &Element, html: &str);
    #[wasm_bindgen(method, js_name = appendChild)]
    fn append_child(this: &Element, other: Element);
    
}
#[wasm_bindgen]
pub struct Color {
    red: u8,
    green: u8,
    blue: u8,
}

#[wasm_bindgen]
pub struct Image {
    pixels: Vec<Color>,
}
#[wasm_bindgen]
impl Image {
     // Constructor for the Image
     #[wasm_bindgen(constructor)]
    pub fn new() -> Image {
        let color1 = Color {
            red: 255,
            green: 0,
            blue: 0,
        };
        let color2 = Color {
            red: 60,
            green: 70,
            blue: 90,
        };
        let pixels = vec![color1, color2];
        Image {
            pixels
        }
    }

    pub fn pixels_ptr(&self) -> *const Color {
        self.pixels.as_ptr()
    }
}

#[wasm_bindgen]
pub fn get_date_parts() -> String {
    let now = Date::now();
    let now_date = Date::new(&JsValue::from_f64(now));

    let year = now_date.get_full_year();
    let month = now_date.get_month() + 1; // JavaScript months are zero-indexed
    let day = now_date.get_date();

    format!("Year: {}, Month: {}, Day: {}", year, month, day)
}
// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    // Your code goes here!
    let val = document.createElement("p");
    val.set_inner_html("Hello from Rust!!!, WebAssembly and Webpack!");
    document.body().append_child(val);
    console::log_1(&JsValue::from_str("Hello world!"));

    Ok(())
}
