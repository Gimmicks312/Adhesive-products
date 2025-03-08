document.addEventListener('DOMContentLoaded', function() {
    // Fetching the product data from the products.json file
    fetch('products.json')
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
        if (!tableBody) return;  // Safety check in case the table body element doesn't exist

        tableBody.innerHTML = '';  // Clear previous data

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.basis || ''}</td>
                <td>${product.appearance || ''}</td>
                <td>${product.color || ''}</td>
                <td>${product.softeningPoint || ''}</td>
                <td>${product.viscosity ? product.viscosity['30'] : ''}</td>
                <td>${product.viscosity ? product.viscosity['120'] : ''}</td>
                <td>${product.viscosity ? product.viscosity['140'] : ''}</td>
                <td>${product.viscosity ? product.viscosity['160'] : ''}</td>
                <td>${product.viscosity ? product.viscosity['180'] : ''}</td>
                <td>${product.viscosity ? product.viscosity['200'] : ''}</td>
                <td>${product.density || ''}</td>
                <td>${product.solidContent || ''}</td>
                <td>${product.ph || ''}</td>
                <td>${product.applicationTemperature || ''}</td>
                <td>${product.feedingSpeed || ''}</td>
                <td>${product.applicationQuantity || ''}</td>
                <td>${product.openTime || ''}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to populate the category filter dropdown
    function populateCategoryFilter(products) {
        const categories = [...new Set(products.map(product => product.category))];
        const categorySelect = document.getElementById('categoryFilter');
        if (!categorySelect) return;  // Safety check

        categorySelect.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
});
