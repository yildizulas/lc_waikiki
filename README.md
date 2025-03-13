# Product Carousel

This project implements a product carousel similar to the one found on **lcwaikiki.com** product pages.

## Features

✅ **Fetches product data** from an external API and caches it in **localStorage** to optimize performance.  
✅ **Displays a carousel** with product images, names, and prices.  
✅ **Favorites functionality:** Clicking on the heart icon saves the product to **localStorage** and updates the UI.  
✅ **Opens products in a new tab** when clicked.  
✅ **Fully responsive**: Works smoothly on desktop, tablet, and mobile.  
✅ **Dynamic DOM manipulation** using **pure JavaScript** (no external libraries like jQuery, Bootstrap, or Swiper used).

## Installation & Usage

1. Clone this repository:
   ```sh
   git clone https://github.com/yildizulas/lc_waikiki.git
   cd product-carousel
   ```
2. Open **Developer Tools (F12) > Console** in your browser.
3. Copy and paste the **JS file content** into the console and hit enter.
4. The carousel will appear **inside the `.product-detail` section** on the product page.

Alternatively, you can include the script in an HTML file:
```html
<script src="ULAS_YILDIZ.js"></script>

## API Details

- **Endpoint:** [Products JSON](https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json)
- **Fetch Logic:**
  - First-time load: Retrieves data from API and caches it in **localStorage**.
  - Reload: Retrieves data from **localStorage** instead of API.

## File Structure
📂 product-carousel/
├── 📜 ULAS_YILDIZ.js  # JavaScript file containing the entire logic
├── 📜 README.md       # Project documentation (this file)

## Responsive Design

- **Desktop:** Displays carousel with navigation arrows.
- **Tablet & Mobile:** Hides navigation arrows, adjusts layout for smaller screens.
- **'Add to Cart' button:** Only visible on **tablet & mobile** views.

## LocalStorage Behavior

- **Favorites:** Saved in `localStorage` under `favorites`.
- **Cached Products:** Saved in `localStorage` under `products`.
- **Persistence:** Favorites remain after page refresh.

## Contribution

Feel free to fork the repo, submit pull requests, or suggest improvements!

---

🛠 **Developed with pure JavaScript** | 🚀 **No external dependencies**