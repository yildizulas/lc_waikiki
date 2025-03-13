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

        .new-product-card-like-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            padding: 5px;
        }

        .carousel-item {
            position: relative;
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
                <div class="new-product-card-like-button" optionid="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                        <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
                    </svg>
                </div>
                <p>${product.name}</p>
                <span>${product.price} TL</span>
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

  const svgPath = button.querySelector("path");

  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
    svgPath.setAttribute("stroke", "#555");
  } else {
    favorites.push(id);
    svgPath.setAttribute("stroke", "blue");
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
