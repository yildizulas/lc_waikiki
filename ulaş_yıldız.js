const buildHTML = () => {
  const html = `
          <div id="similar-items-recommendations-like">
              <h2 class="similar-products-title-like">You Might Also Like</h2>
              <button class="carousel-arrow-left-like"></button>
              <div class="carousel-container-like">
                  <div class="carousel-items-like"></div>
              </div>
              <button class="carousel-arrow-right-like"></button>
          </div>
      `;

  document
    .querySelector(".product-detail")
    .insertAdjacentHTML("beforeend", html);

  const leftArrow = document.querySelector(
    ".carousel-arrow-left-like"
  );
  const rightArrow = document.querySelector(
    ".carousel-arrow-right-like"
  );
  const carousel = document.querySelector(
    ".carousel-items-like"
  );

  leftArrow.addEventListener("click", () => {
    carousel.scrollBy({
      left: -220,
      behavior: "smooth",
    });
  });

  rightArrow.addEventListener("click", () => {
    carousel.scrollBy({
      left: 220,
      behavior: "smooth",
    });
  });
};

const buildCSS = () => {
  const css = `
  
          #similar-items-recommendations-like {
              background-color: #fbf9f8;
              position: relative;
            width: 90%;
          }
  
          .carousel-arrow-left-like, .carousel-arrow-right-like {
                position: absolute;
                top: 50%;
                background: none;
                border: none;
                cursor: pointer;
                padding: 10px;
                z-index: 10;
            }
  
            .carousel-arrow-left-like {
                background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"%3E%3Cpath fill="none" stroke="%23333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"%3E%3C/path%3E%3C/svg%3E') no-repeat center;
                background-size: contain;
                left: 120px;
                width: 14px;
                height: 24px;
            }
  
            .carousel-arrow-right-like {
                background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"%3E%3Cpath fill="none" stroke="%23333" stroke-linecap="round" stroke-width="3px" d="M2096.842 2395.467l10 10-10 10" transform="translate(-2094.721 -2393.346)"%3E%3C/path%3E%3C/svg%3E') no-repeat center;
                background-size: contain;
                right: -40px;
                width: 14px;
                height: 24px;
            }
  
            
            @media (min-width: 992px) {
                .similar-products-title-like {
                    font-size: 32px;
                    line-height: 43px;
                }
            }
  
            .similar-products-title-like {
                font-size: 32px;
                color: #29323b;
                font-weight: lighter;
                padding: 15px 155px;
                margin: 0;
            }
  
            .carousel-container-like {
                  overflow: hidden;
                  width: calc(100% - 150px);
                  margin-left: 155px;
            }
  
            .carousel-items-like {
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto;
                white-space: nowrap;
                gap: 18px;
                padding-left: 10px;
                margin-left: 0px;
                scrollbar-width: none;
            }
            
    
            .product-card-like {
                  width: 210px;
                  height: 380px;
                  text-align: center;
                  background: #fff;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                  position: relative;
            }
            
            .new-product-card-like-button {
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  background: none;
                  border: none;
                  cursor: pointer;
            }
    
            .product-card-like img {
                  width: 210px;
                  height: 280px;
                  object-fit: cover;
                  border-radius: 5px;
            }
    
            .product-name-like {
                overflow: hidden;
                text-align: left;
                text-overflow: ellipsis;
                white-space: initial;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color: #302E2B;
                font: 14px "Open Sans", sans-serif;
                height: 40px;
                margin: 0px 0px 10px;
            }
    
            .product-price-like {
                font-size: 16px;
                font-weight: bold;
                text-align: left;
                color: #007bff;
                height: 40px;
                weight: 190px;
            }
    
            .product-name-price-like {
                display: flex;
                flex-direction: column;
                padding: 0 10px;
                width: 210px;
                height: 95px;
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
    ".carousel-items-like"
  );
  container.innerHTML = "";

  products.forEach((product) => {
    const productHTML = `
            <div class="product-card-like">
                <a href="${product.url}" target="_blank">
                    <img src="${product.img}" alt="${product.name}" class="product-image-like">
                </a>
                <div class="new-product-card-like-button" optionid="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
                        <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
                    </svg>
                </div>
                <div class="product-name-price-like">
                    <p class="product-name-like">${product.name}</p>
                    <p class="product-price-like">${product.price} TL</p>
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

  loadFavoriteStatus();
};

const toggleFavorite = (id, button) => {
  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const heartPath = button.querySelector('path');

  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
    heartPath.setAttribute("stroke", "#555");
    heartPath.setAttribute("fill", "none"); 
  } else {
    favorites.push(id);
    heartPath.setAttribute("stroke", "#0000FF"); 
    heartPath.setAttribute("fill", "#0000FF");
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
