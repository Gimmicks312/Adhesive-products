document.getElementById('advancedSearchBtn').addEventListener('click', function() {
    document.getElementById('advancedSearchModal').style.display = 'block';
});

// Close the modal when the close button is clicked
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('advancedSearchModal').style.display = 'none';
});

// Function to create the advanced search form dynamically
function createAdvancedSearchForm() {
    const form = document.getElementById('advancedSearchForm');
    const fields = [
        { id: 'viscosityRange', label: 'Viscosity @ 200°C', type: 'range', min: 0, max: 200000 },
        { id: 'phRange', label: 'pH', type: 'range', min: 0, max: 14 },
        { id: 'feedingSpeedRange', label: 'Feeding Speed (m/min)', type: 'range', min: 0, max: 100 },
        { id: 'softeningPointRange', label: 'Softening Point', type: 'range', min: 0, max: 200 },
        { id: 'densityRange', label: 'Density (g/cm³)', type: 'range', min: 0, max: 2 }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;

        const input = document.createElement('input');
        input.setAttribute('type', field.type);
        input.setAttribute('id', field.id);
        input.setAttribute('min', field.min);
        input.setAttribute('max', field.max);
        input.setAttribute('value', field.min);

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });
}

// Call the function to create the form when the page loads
window.onload = createAdvancedSearchForm;

// Add event listener to the search button in the pop-up
document.getElementById('searchAdvanced').addEventListener('click', function() {
    const viscosityRange = document.getElementById('viscosityRange').value;
    const phRange = document.getElementById('phRange').value;
    const feedingSpeedRange = document.getElementById('feedingSpeedRange').value;
    const softeningPointRange = document.getElementById('softeningPointRange').value;
    const densityRange = document.getElementById('densityRange').value;

    // Filter products based on advanced search values
    const filteredProducts = productsData.filter(product => {
        return (
            product.viscosity && product.viscosity['200'] >= viscosityRange &&
            product.ph >= phRange &&
            product.feedingSpeed && product.feedingSpeed >= feedingSpeedRange &&
            product.softeningPoint >= softeningPointRange &&
            product.density && product.density >= densityRange
        );
    });

    // Display the filtered products
    displayProducts(filteredProducts);

    // Close the modal after search
    document.getElementById('advancedSearchModal').style.display = 'none';
});
