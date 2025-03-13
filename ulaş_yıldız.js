const buildHTML = () => {
  const html = `
    <div id="similar-items-recommendations">
        <div class="recommendation-carousel">
            <div class="carousel-container">
                <p class="similar-products-title">You Might Also Like</p>
                    <div>
                        <button type="button" aria-label="previous" class="buttonBack___1mlaL carousel__back-button carousel-arrow-like carousel-arrow-left-like">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                                <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                            </svg>
                        </button>
                        <div class="horizontalSlider___281Ls carousel__slider carousel__slider--horizontal carousel-items" aria-live="polite" role="listbox"></div>
                        <button type="button" aria-label="next" class="buttonNext___2mOCa carousel__next-button carousel-arrow-like carousel-arrow-right-like">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                                <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2096.842 2395.467l10 10 -10 10" transform="translate(-2094.721 -2393.346)"></path>
                            </svg>
                        </button>
                    </div>
            </div>
        </div>
    </div>`;

  document
    .querySelector(".product-detail")
    .insertAdjacentHTML("beforeend", html);

  document
    .querySelector(".carousel-arrow-left-like")
    .addEventListener("click", () => {
      document
        .querySelector(".carousel-items")
        .scrollBy({ left: -220, behavior: "smooth" });
    });

  document
    .querySelector(".carousel-arrow-right-like")
    .addEventListener("click", () => {
      document
        .querySelector(".carousel-items")
        .scrollBy({ left: 220, behavior: "smooth" });
    });
};

const buildCSS = () => {
  const css = `
          #similar-items-recommendations {
              background-color: #faf9f7;
              position: relative;
              padding: 15px;
              border-radius: 8px;
          }
  
          .carousel-container {
                display: flex;
                align-items: center;
                overflow: visible;
                position: relative;
                gap: 10px;
                padding-left: 40px; 
                margin-left: 40px;
            }
  
          .carousel-arrow-like {
              background: none;
              border: none;
              cursor: pointer;
              font-size: 24px;
              color: #333;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              z-index: 10;
          }
  
          .carousel-arrow-left-like {
              left: -15px;
          }
  
          .carousel-arrow-right-like {
              right: 0;
          }
  
          .carousel-items {
            display: flex;
            overflow-x: auto;
            scroll-behavior: smooth;
            white-space: nowrap;
            padding: 10px;
            gap: 20px;
            max-width: 80%;
            margin-left: -20px; 
          }
  
          .carousel-arrow:hover {
              color: #000;
          }
  
          .new-product-card {
            width: 220px;
            height: 380px;
            text-align: center;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            position: relative;        
        }
  
          .new-product-card img {
            width: 210px;
            height: 280px;
            object-fit: cover;
          }
  
          .new-product-card-like-button {
              position: absolute;
              top: 10px;
              right: 10px;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 50%;
              padding: 5px;
              cursor: pointer;
          }

          .product-name {
              white-space: normal;
              word-wrap: break-word;
              font-size: 14px;
              text-align: left;
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
              <div class="new-product-card">
                  <div class="new-product-card__image-wrapper">
                      <a href="${product.url}" target="_blank">
                          <img src="${product.img}" alt="${product.name}">
                      </a>
                      <div class="new-product-card-like-button" optionid="${product.id}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                              <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
                          </svg>
                      </div>
                  </div>
                  <div class="new-product-card__information-box">
                      <p class="product-name">${product.name}</p>
                      <div class="new-product-card__price">
                          <span class="price__current-price">${product.price} TL</span>
                      </div>
                  </div>
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
    svgPath.setAttribute("fill", "none");
  } else {
    favorites.push(id);
    svgPath.setAttribute("stroke", "blue");
    svgPath.setAttribute("fill", "blue");
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
