let productsData = [];

// Load product data when the page is loaded
window.onload = function() {
    // Load the product data from a remote file (GitHub URL in this case)
    fetch('https://Gimmicks312.github.io/Adhesive-products/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // For debugging, check data in console
            productsData = data; // Store the data for later use
            displayProducts(productsData); // Display the products
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
};

// Display product data in the table
function displayProducts(products) {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = ''; // Clear previous table content

    products.forEach(product => {
        const row = document.createElement('tr');

        const viscosityValues = product.viscosity.split(',').map(val => val.trim());

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.softeningPoint}</td>
            <td>${viscosityValues[0] || ''}</td>
            <td>${viscosityValues[1] || ''}</td>
            <td>${viscosityValues[2] || ''}</td>
            <td>${viscosityValues[3] || ''}</td>
            <td>${viscosityValues[4] || ''}</td>
            <td>${product.density}</td>
            <td>${product.color}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to filter products based on the selected category and filter value
function filterProducts() {
    const categoryFilterValue = document.getElementById('category-filter').value.toLowerCase();
    const filterValue = document.getElementById('filter-value').value.toLowerCase();
    const filterBy = document.getElementById('filter').value;

    let filteredProducts = productsData;

    // First filter by category if a specific category is selected
    if (categoryFilterValue && categoryFilterValue !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase().includes(categoryFilterValue)
        );
    }

    // Then apply the second filter (based on the selected attribute like ID, Name, etc.)
    if (filterValue && filterBy !== 'all') {
        filteredProducts = filteredProducts.filter(product => {
            const fieldValue = product[filterBy];

            if (typeof fieldValue === 'string') {
                return fieldValue.toLowerCase().includes(filterValue);
            }

            if (filterBy === 'softeningPoint') {
                const softeningPointValue = fieldValue.replace('°C', '').trim(); // Remove the "°C" and compare as number
                return softeningPointValue.includes(filterValue);
            }

            return false;
        });
    } else if (filterBy === 'all' && filterValue) {
        filteredProducts = filteredProducts.filter(product => {
            for (const key in product) {
                if (product[key] && product[key].toString().toLowerCase().includes(filterValue)) {
                    return true; // If any field matches the filter
                }
            }
            return false;
        });
    }

    // Display the filtered products
    displayProducts(filteredProducts);
}
