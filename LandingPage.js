document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("background-section");

    const backgrounds = 
    [
        "Pics/grilled-beef-burger-with-fries-cheese-tomato-generative-ai.jpg",
        "Pics/homemade-tasty-sandwich-tomatoes-chicken-nuggets-onions-pepper-wooden-cutting-board-ketchup-fries-blurred-surface.jpg"
    ];

    let currentIndex = 0;

    function updateBackground(index) {
        section.style.setProperty('--background-image', `url('${backgrounds[index]}')`);
    }

    document.getElementById("scroll-up").addEventListener("click", (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + backgrounds.length) % backgrounds.length; // Cycle backward
        updateBackground(currentIndex);
    });

    document.getElementById("scroll-down").addEventListener("click", (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % backgrounds.length; // Cycle forward
        updateBackground(currentIndex);
    });
});


