// Advanced Search Modal Handling
const advancedSearchBtn = document.getElementById("advancedSearchBtn");
const advancedSearchModal = document.getElementById("advancedSearchModal");
const closeBtn = document.querySelector(".close-btn");
const applyAdvancedSearch = document.getElementById("applyAdvancedSearch");
const resetAdvancedSearch = document.getElementById("resetAdvancedSearch");

advancedSearchBtn.addEventListener("click", () => {
    advancedSearchModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    advancedSearchModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === advancedSearchModal) {
        advancedSearchModal.style.display = "none";
    }
});

applyAdvancedSearch.addEventListener("click", () => {
    const selectedTemperature = document.getElementById("temperatureSelect").value;
    const minViscosity = parseFloat(document.getElementById("viscosityMin").value) || 0;
    const maxViscosity = parseFloat(document.getElementById("viscosityMax").value) || Infinity;
    
    const filteredProducts = productsData.filter(product => {
        const viscosityValue = parseFloat(product["viscosity." + selectedTemperature]) || 0;
        return viscosityValue >= minViscosity && viscosityValue <= maxViscosity;
    });
    
    displayProducts(filteredProducts);
    advancedSearchModal.style.display = "none";
});

resetAdvancedSearch.addEventListener("click", () => {
    document.getElementById("temperatureSelect").value = "120";
    document.getElementById("viscosityMin").value = "";
    document.getElementById("viscosityMax").value = "";
    displayProducts(productsData);
    advancedSearchModal.style.display = "none";
});
