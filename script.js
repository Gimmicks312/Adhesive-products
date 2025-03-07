// Initialize an empty array to store product data
let productsData = [];

// Fetch product data from the JSON file
fetch('https://raw.githubusercontent.com/Gimmicks312/Adhesive-products/main/products.json')
    .then(response => {
        // Check if response is okay (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        productsData = data;  // Store the fetched data into productsData
        displayProducts(productsData);  // Initially display all products
        populateCategoryFilter(productsData);  // Populate the category filter options
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to display products in the table
function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';  // Clear existing table data

    products.forEach(product => {
        let row = document.createElement('tr');

        // Loop through each key-value pair in the product object and create table cells
        Object.keys(product).forEach(key => {
            let cell = document.createElement('td');
            if (key === "viscosity") {
                // Handle viscosity fields for different temperatures
                [30, 120, 140, 160, 180, 200].forEach(temp => {
                    if (product[key][temp]) {
                        let tempCell = document.createElement('td');
                        tempCell.textContent = product[key][temp];
                        row.appendChild(tempCell);
                    } else {
                        row.appendChild(cell);  // Empty cell for missing values
                    }
                });
            } else {
                // Display other values normally
                if (product[key] !== null && product[key] !== '') {
                    cell.textContent = product[key];
                    row.appendChild(cell);
                }
            }
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
    const filteredProducts = productsData.filter(product => 
        product.category === selectedCategory || selectedCategory === ''
    );
    displayProducts(filteredProducts);
});

// Dynamic Search Functionality
document.getElementById('dynamicFilter').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();  // Get the search term and convert it to lowercase
    const filteredProducts = productsData.filter(product => {
        return Object.values(product).some(value =>
            String(value).toLowerCase().includes(searchTerm)  // Case-insensitive search
        );
    });
    displayProducts(filteredProducts);  // Display filtered products based on the search term
});
