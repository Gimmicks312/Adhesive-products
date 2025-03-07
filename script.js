// Initialize an empty array to store product data
let productsData = [];

// Fetch product data from the JSON file
fetch('https://raw.githubusercontent.com/Gimmicks312/Adhesive-products/main/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        productsData = data;
        displayProducts(productsData);
        populateCategoryFilter(productsData);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display products in the table
function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        let row = document.createElement('tr');

        // Define fixed column order
        const columns = [
            "id", "name", "category", "basis", "softeningPoint", 
            "viscosity.30", "viscosity.120", "viscosity.140", 
            "viscosity.160", "viscosity.180", "viscosity.200", 
            "density", "color", "solidContent", "ph", "feedingSpeed"
        ];

        columns.forEach(col => {
            let cell = document.createElement('td');
            if (col.startsWith("viscosity.")) {
                let temp = col.split(".")[1];  // Extract temperature
                cell.textContent = product.viscosity && product.viscosity[temp] ? product.viscosity[temp] : ''; 
            } else {
                cell.textContent = product[col] || ''; 
            }
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

// Function to populate the category filter dropdown
function populateCategoryFilter(products) {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="">All Categories</option>'; 
    const categories = new Set(products.map(p => p.category).filter(Boolean));

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
        selectedCategory === '' || product.category === selectedCategory
    );
    displayProducts(filteredProducts);
});

// Dynamic Search Functionality
document.getElementById('dynamicFilter').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = productsData.filter(product => 
        Object.values(product).some(value => String(value).toLowerCase().includes(searchTerm))
    );
    displayProducts(filteredProducts);
});
