document.addEventListener('DOMContentLoaded', function() {
    // Handle the "Advanced Search" button and the "Apply Filters" functionality
    const advancedSearchButton = document.getElementById('advancedSearchButton');
    const searchModal = document.getElementById('searchModal');
    const closeButton = document.getElementById('closeSearchModal');
    const applyFiltersButton = document.getElementById('applyFiltersButton');
    
    if (!advancedSearchButton || !searchModal || !closeButton || !applyFiltersButton) return; // Safety checks
    
    advancedSearchButton.addEventListener('click', () => {
        searchModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        searchModal.style.display = 'none';
    });

    applyFiltersButton.addEventListener('click', () => {
        applyFilters();
        searchModal.style.display = 'none';
    });

    function applyFilters() {
        const minViscosity = document.getElementById('minViscosity').value;
        const maxViscosity = document.getElementById('maxViscosity').value;
        const minPH = document.getElementById('minPH').value;
        const maxPH = document.getElementById('maxPH').value;

        // Apply the filtering logic here, for example:
        let filteredProducts = productsData.filter(product => {
            let isValid = true;

            if (minViscosity && product.viscosity && product.viscosity['200'] < minViscosity) isValid = false;
            if (maxViscosity && product.viscosity && product.viscosity['200'] > maxViscosity) isValid = false;
            if (minPH && product.ph < minPH) isValid = false;
            if (maxPH && product.ph > maxPH) isValid = false;

            return isValid;
        });

        // Re-display filtered products
        displayProducts(filteredProducts);
    }
});
