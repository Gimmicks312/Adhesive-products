// Initialize an empty array to store product data
let productsData = [];

// Function to fetch product data from the JSON file
fetch('https://raw.githubusercontent.com/Gimmicks312/Adhesive-products/main/products.json')
    .then(response => {
        // Log the status and headers for debugging
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
        // Check if response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        productsData = data;  // Store fetched data in productsData array
        console.log('Fetched Products:', productsData);
        displayProducts(productsData);  // Display products
        populateCategoryFilter(productsData);  // Populate category filter
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to display products in the table
function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = ''; // Clear existing table data

    products.forEach(product => {
        let row = document.createElement('tr');

        // Add columns dynamically based on the product fields
        let columns = [
            product.id || '',
            product.name || '',
            product.category || '',
            product.softeningPoint || '',
            product.viscosity || '',
            product.density || '',
            product.color || '',
            product.solidContent || '',
            product.pH || ''
        ];

        columns.forEach(columnData => {
            let cell = document.createElement('td');
            cell.textContent = columnData;  // Add data to the cell
            row.appendChild(cell);
        });

        tableBody.appendChild(row);  // Append the new row to the table
    });
}

// Function to populate the category filter dropdown
function populateCategoryFilter(products) {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set();

    products.forEach(product => {
        if (product.category) {
            categories.add(product.category);
        }
    });

    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter products based on selected category
document.getElementById('categoryFilter').addEventListener('change', function() {
    const selectedCategory = this.value;
    const filteredProducts = productsData.filter(product => product.category === selectedCategory);
    displayProducts(filteredProducts);
});
