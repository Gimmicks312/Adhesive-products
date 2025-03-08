let advancedSearchData = [];

// Open the advanced search pop-up
function openAdvancedSearch() {
    const popup = document.getElementById('advancedSearchPopup');
    if (popup) popup.style.display = 'block';
}

// Close the advanced search pop-up
function closeAdvancedSearch() {
    const popup = document.getElementById('advancedSearchPopup');
    if (popup) popup.style.display = 'none';
}

// Apply advanced search filters
function applyAdvancedSearch() {
    const filters = {
        softeningPointMin: document.getElementById('softeningPointMin').value,
        softeningPointMax: document.getElementById('softeningPointMax').value,
        viscosity30Min: document.getElementById('viscosity30Min').value,
        viscosity30Max: document.getElementById('viscosity30Max').value,
        viscosity120Min: document.getElementById('viscosity120Min').value,
        viscosity120Max: document.getElementById('viscosity120Max').value,
        viscosity140Min: document.getElementById('viscosity140Min').value,
        viscosity140Max: document.getElementById('viscosity140Max').value,
        viscosity160Min: document.getElementById('viscosity160Min').value,
        viscosity160Max: document.getElementById('viscosity160Max').value,
        viscosity180Min: document.getElementById('viscosity180Min').value,
        viscosity180Max: document.getElementById('viscosity180Max').value,
        viscosity200Min: document.getElementById('viscosity200Min').value,
        viscosity200Max: document.getElementById('viscosity200Max').value,
        densityMin: document.getElementById('densityMin').value,
        densityMax: document.getElementById('densityMax').value,
        solidContentMin: document.getElementById('solidContentMin').value,
        solidContentMax: document.getElementById('solidContentMax').value,
        phMin: document.getElementById('phMin').value,
        phMax: document.getElementById('phMax').value,
        applicationTempMin: document.getElementById('applicationTempMin').value,
        applicationTempMax: document.getElementById('applicationTempMax').value,
        feedingSpeedMin: document.getElementById('feedingSpeedMin').value,
        feedingSpeedMax: document.getElementById('feedingSpeedMax').value,
        applicationQuantityMin: document.getElementById('applicationQuantityMin').value,
        applicationQuantityMax: document.getElementById('applicationQuantityMax').value,
        openTimeMin: document.getElementById('openTimeMin').value,
        openTimeMax: document.getElementById('openTimeMax').value
    };

    advancedSearchData = productsData.filter(product => {
        for (let key in filters) {
            if (filters[key] && (parseFloat(product[key]) < parseFloat(filters[key]) && key.includes('Min')) ||
                (parseFloat(product[key]) > parseFloat(filters[key]) && key.includes('Max'))) {
                return false;
            }
        }
        return true;
    });

    displayProducts(advancedSearchData);
    closeAdvancedSearch();
}

// Reset advanced search filters
function resetAdvancedSearch() {
    const form = document.getElementById('advancedSearchForm');
    if (form) form.reset(); // Reset the form fields

    displayProducts(productsData); // Show all products
    closeAdvancedSearch();
}
