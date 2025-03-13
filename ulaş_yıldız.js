const buildHTML = () => {
  const html = `
        <div class="insider-carousel">
            <h2>You Might Also Like</h2>
            <div class="carousel-container">
                <button class="carousel-btn prev">&lt;</button>
                <div class="carousel-items"></div>
                <button class="carousel-btn next">&gt;</button>
            </div>
        </div>
    `;

  document
    .querySelector(".product-detail")
    .insertAdjacentHTML("beforeend", html);
};

const buildCSS = () => {
  const css = `
        .insider-carousel {
            margin-top: 20px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
            text-align: center;
        }

        .carousel-container {
            display: flex;
            align-items: center;
            overflow: hidden;
            position: relative;
        }

        .carousel-items {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            scroll-behavior: smooth;
            white-space: nowrap;
            padding: 10px;
            max-width: 80%;
        }

        .carousel-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            font-size: 18px;
            border-radius: 5px;
        }

        .carousel-btn:hover {
            background-color: #0056b3;
        }
    `;

  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);
};

const fetchProducts = async () => {
  const apiUrl =
    "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

  try {
    let products = JSON.parse(
      localStorage.getItem("products")
    );

    if (!products) {
      const response = await fetch(apiUrl);
      products = await response.json();
      localStorage.setItem(
        "products",
        JSON.stringify(products)
      );
    }

    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const renderProducts = (products) => {
  const container = document.querySelector(
    ".carousel-items"
  );
  container.innerHTML = "";

  products.forEach((product) => {
    const productHTML = `
            <div class="carousel-item">
                <a href="${product.url}" target="_blank">
                    <img src="${product.img}" alt="${product.name}" style="width: 210px; height: 280px; object-fit: cover;">
                </a>
                <p>${product.name}</p>
                <span>${product.price} TL</span>
                <button class="new-product-card-like-button" optionid="${product.id}">❤️</button>
            </div>
        `;
    container.insertAdjacentHTML("beforeend", productHTML);
  });

  setupFavoriteEvents();
};

const setupFavoriteEvents = () => {
  document
    .querySelectorAll(".new-product-card-like-button")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        const id =
          event.currentTarget.getAttribute("optionid");
        toggleFavorite(id, event.currentTarget);
      });
    });
};

const toggleFavorite = (id, button) => {
  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
    button.querySelector("svg").style.color = "black";
  } else {
    favorites.push(id);
    button.querySelector("svg").style.color = "blue";
  }

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
};

const init = () => {
  buildHTML();
  buildCSS();
  fetchProducts();
};

init();
