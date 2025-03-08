document.addEventListener('DOMContentLoaded', function() {
    // Ensure advanced search button exists before adding event listener
    const advancedSearchButton = document.getElementById("advancedSearchButton");
    if (advancedSearchButton) {
        advancedSearchButton.addEventListener("click", openAdvancedSearch);
    }

    // Fetch data and ensure the element exists before using it
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            productsData = data;
            displayProducts(productsData);
            populateCategoryFilter(productsData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Function to display products in the table
    function displayProducts(products) {
        const tableBody = document.getElementById('productTableBody');
        if (tableBody) {
            tableBody.innerHTML = ''; // Clear the table first
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.softeningPoint}</td>
                    <td>${product.viscosity30}</td>
                    <td>${product.density}</td>
                    <td>${product.ph}</td>
                    <td>${product.applicationTemp}</td>
                    <td>${product.feedingSpeed}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }

    // Function to populate the category filter
    function populateCategoryFilter(products) {
        const categoryFilter = document.getElementById('filterCategory');
        if (categoryFilter) {
            const categories = new Set(products.map(product => product.category));
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        }
    }

    // Handle advanced search modal opening
    function openAdvancedSearch() {
        const modal = document.getElementById("searchModal");
        if (modal) {
            modal.style.display = "block";
        }
    }

    // Handle closing the advanced search modal
    function closeAdvancedSearch() {
        const modal = document.getElementById("searchModal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    // Add additional logic for applying advanced search filters, resetting them, etc.
});
