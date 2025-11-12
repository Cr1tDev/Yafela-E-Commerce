class CustomCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["data-text"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const cardCount = 5;
    const text = this.getAttribute("data-text");

    const style = `
      <style>
        :host {
          all: initial;
          display: block;
          width: 100%;
        }

        .carousel {
          width: 100%;
          background-color: #000000ff;
          overflow: hidden;
          position: relative;
        }

        .carousel-track {
          display: flex;
          width: max-content;
          animation: scroll 20s linear infinite;
        }

        .carousel:hover .carousel-track {
          animation-play-state: paused;
        }

        .group {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 0 1rem;
        }

        .card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0.75rem 0;
          color: #fff;
          border-radius: 8px;
          transition: background-color 0.3s ease;
          white-space: nowrap;
        }

        .text {
          font-family: "Wix Madefor Display", sans-serif;
     
          font-size: clamp(0.5rem, 2vw, 1.3rem);
          font-weight: 200;
        }

        .card svg {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
        }

         @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-40%);
          }
        }

       
        .carousel::-webkit-scrollbar {
          display: none;
        }
      </style>
    `;

    const content = `
      <div class="carousel">
        <div class="carousel-track">
          <!-- First group -->
          <div class="group">
            ${this.createCards(cardCount)}
          </div>

          <!-- Duplicate group for seamless scroll -->
          <div class="group" aria-hidden="true">
            ${this.createCards(cardCount)}
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = style + content;
  }

  createCards(count) {
    const cardTemplate = `
      <div class="card">
        <span class="text">Limited Time Offer: Get 20% Off your first bottle!</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#7CCD7C" stroke="#5DB85D" stroke-width="0.8">
          <path
            d="M12 22V13M12 11C11 11 6.5 11 3.5 8.5C0.5 6 -0.5 2.5 2.5 0C5.5 -2.5 9 0 11 3C12 5 11.5 9.5 12 11M12 11C13 11 17.5 11 20.5 8.5C23.5 6 24.5 2.5 21.5 0C18.5 -2.5 15 0 13 3C12 5 12.5 9.5 12 11M12 11C12 12 12 16.5 9.5 19.5C7 22.5 3.5 23.5 1 20.5C-1.5 17.5 1 14 4 12C6 11 10.5 11.5 12 11M12 11C12 12 12 16.5 14.5 19.5C17 22.5 20.5 23.5 23 20.5C25.5 17.5 23 14 20 12C18 11 13.5 11.5 12 11"
          />
        </svg>
      </div>
    `;
    return Array(count).fill(cardTemplate).join("");
  }
}

customElements.define("custom-carousel", CustomCarousel);
