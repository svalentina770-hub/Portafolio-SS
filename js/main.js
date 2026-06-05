// =============================
// MENÚ RESPONSIVE
// =============================

const menuBtn = document.querySelector(".menu-btn");
const mainNav = document.querySelector(".main-nav");

if (menuBtn && mainNav) {

    menuBtn.addEventListener("click", () => {

        menuBtn.classList.toggle("open");
        mainNav.classList.toggle("show");

    });

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            menuBtn.classList.remove("open");
            mainNav.classList.remove("show");

        });

    });

}

// =============================
// LINK ACTIVO DEL MENÚ
// =============================

const currentFile =
    window.location.pathname.split("/").pop()
    || "index.html";

const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {

    const linkFile =
        link.getAttribute("href")
            .split("/")
            .pop();

    if (linkFile === currentFile) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});

// =============================
// RULETA DEL PORTAFOLIO
// =============================

(function () {

    const carousels =
        document.querySelectorAll(".portfolio-carousel");

    const projectInfo =
        document.getElementById("projectInfo");

    const modelInfo =
        document.getElementById("modelInfo");

    if (!carousels.length) return;

    carousels.forEach((carousel) => {

        const cards =
            Array.from(
                carousel.querySelectorAll(".portfolio-card")
            );

        if (!cards.length) return;

        // La tarjeta con clase "featured"
        // inicia en el centro

        let activeIndex =
            cards.findIndex((card) =>
                card.classList.contains("featured")
            );

        if (activeIndex === -1) {

            activeIndex = 0;

        }

        updateRoulette(cards, activeIndex);

        cards.forEach((card, index) => {

            card.addEventListener("click", () => {

                activeIndex = index;

                updateRoulette(cards, activeIndex);

                openPortfolioInfo(card);

            });

        });

    });

    // =============================
    // ACTUALIZAR RULETA
    // =============================

    function updateRoulette(cards, activeIndex) {

        const total = cards.length;

        cards.forEach((card, index) => {

            card.classList.remove(
                "is-center",
                "is-left-1",
                "is-left-2",
                "is-right-1",
                "is-right-2",
                "is-hidden",
                "active-card"
            );

            const rightDistance =
                (index - activeIndex + total) % total;

            const leftDistance =
                (activeIndex - index + total) % total;

            if (index === activeIndex) {

                card.classList.add(
                    "is-center",
                    "active-card"
                );

            }

            else if (rightDistance === 1) {

                card.classList.add("is-right-1");

            }

            else if (rightDistance === 2) {

                card.classList.add("is-right-2");

            }

            else if (leftDistance === 1) {

                card.classList.add("is-left-1");

            }

            else if (leftDistance === 2) {

                card.classList.add("is-left-2");

            }

            else {

                card.classList.add("is-hidden");

            }

        });

    }

    // =============================
    // ABRIR PANEL
    // =============================

    function openPortfolioInfo(card) {

        if (!projectInfo || !modelInfo) return;

        const type = card.dataset.type;

        const currentPanel =
            type === "project"
                ? projectInfo
                : modelInfo;

        const otherPanel =
            type === "project"
                ? modelInfo
                : projectInfo;

        // Cierra panel contrario

        otherPanel.classList.remove("show");

        otherPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        // Llena información

        fillPortfolioInfo(currentPanel, card);

        // Abre panel

        currentPanel.classList.add("show");

        currentPanel.setAttribute(
            "aria-hidden",
            "false"
        );

    }

    // =============================
    // LLENAR INFORMACIÓN
    // =============================

    function fillPortfolioInfo(panel, card) {

        const type =
            card.dataset.type;

        const title =
            card.dataset.title || "Proyecto";

        const description =
            card.dataset.description || "";

        const titleElement =
            panel.querySelector(
                "[data-dynamic-title]"
            );

        const descriptionElement =
            panel.querySelector(
                "[data-dynamic-description]"
            );

        const thumbs =
            panel.querySelectorAll("[data-thumb]");

        const artstationLink =
            panel.querySelector(
                "[data-artstation-link]"
            );

        const sketchfabLink =
            panel.querySelector(
                "[data-sketchfab-link]"
            );

        // =====================================
        // ELEMENTOS GALERÍA
        // =====================================

        const galleryImages =
            panel.querySelector(".gallery-images");

        const galleryModel =
            panel.querySelector(".gallery-model");

        const sketchfabViewer =
            panel.querySelector("#sketchfabViewer");

        const arButton =
            panel.querySelector("#arButton");

        // =====================================
        // TEXTO
        // =====================================

        if (titleElement) {

            titleElement.textContent = title;

        }

        if (descriptionElement) {

            descriptionElement.textContent =
                description;

        }

        if (arButton) {

            if (title === "Rocky") {

                arButton.style.display = "inline-block";

            } else {

                arButton.style.display = "none";

            }

        }
        // =====================================
        // MODELOS 3D
        // =====================================

        if (type === "model") {

            if (galleryImages) {
                galleryImages.classList.add("hidden");
            }

            if (galleryModel) {
                galleryModel.classList.remove("hidden");
            }

            const localViewer =
                panel.querySelector("#localViewer");

            const modelType =
                card.dataset.modelType;

            if (modelType === "local") {

                sketchfabViewer.style.display = "none";

                localViewer.style.display = "block";

                localViewer.src =
                    card.dataset.model || "";

            } else {

                localViewer.style.display = "none";

                sketchfabViewer.style.display = "block";

                sketchfabViewer.src =
                    card.dataset.model || "";

            }
        }

        // =====================================
        // PROYECTOS NORMALES
        // =====================================

        else {

            if (galleryImages) {

                galleryImages.classList.remove("hidden");

            }

            if (galleryModel) {

                galleryModel.classList.add("hidden");

            }

            const images = [

                card.dataset.image1,
                card.dataset.image2,
                card.dataset.image3,
                card.dataset.image4

            ];

            thumbs.forEach((thumb, index) => {

                thumb.src =
                    images[index]
                    || card.querySelector("img")
                        .getAttribute("src");

                thumb.alt =
                    `${title} imagen ${index + 1}`;

            });

        }

        // =====================================
        // LINKS
        // =====================================

        if (artstationLink) {

            artstationLink.href =
                card.dataset.artstation || "#";

        }

        if (sketchfabLink) {

            sketchfabLink.href =
                card.dataset.sketchfab || "#";

        }

    }

})();

// =============================
// FORMULARIO DE CONTACTO
// =============================

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name")
                .value
                .trim();

        const email =
            document.getElementById("email")
                .value
                .trim();

        const subject =
            document.getElementById("subject")
                .value
                .trim();

        const message =
            document.getElementById("message")
                .value
                .trim();

        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            formStatus.textContent =
                "Por favor completa todos los campos.";

            return;

        }

        formStatus.textContent =
            "Mensaje listo. Gracias por contactarme.";

        contactForm.reset();

    });

}
document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(`
        section,
        article,
        .container,
        .about-card,
        .profile-photo,
        .preview-card,
        .section-title,
        .btn,
        footer
    `);

    elements.forEach((el, i) => {

        el.classList.add("reveal");

        // stagger suave tipo Apple
        el.style.transitionDelay = `${Math.min(i * 60, 600)}ms`;

    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px"
    });

    document.querySelectorAll(".reveal").forEach(el => {
        observer.observe(el);
    });

});

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(`
        section,
        article,
        .container,
        .about-card,
        .profile-photo,
        .preview-card,
        .section-title,
        .btn,
        footer
    `);

    elements.forEach((el, i) => {

        el.classList.add("reveal");

        // ⚡ menos delay (más rápido)
        el.style.transitionDelay = `${Math.min(i * 25, 200)}ms`;

    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

            // 🔥 IMPORTANTE: NO se desactiva
            // (no usamos unobserve)

        });

    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px"
    });

    document.querySelectorAll(".reveal").forEach(el => {
        observer.observe(el);
    });

});
document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(`
        .about-intro,
        .profile-photo,
        .about-text,
        .timeline-step,
        .step-card,
        .skills,
        .skill
    `);

    elements.forEach((el, i) => {

        el.classList.add("reveal");

        el.style.transitionDelay = `${Math.min(i * 40, 300)}ms`;

    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px"
    });

    document.querySelectorAll(".reveal").forEach(el => {
        observer.observe(el);
    });

});