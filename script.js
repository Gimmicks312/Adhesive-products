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
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to display products in the table
function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        let row = document.createElement('tr');

        // Define the correct order of columns
        const columns = [
            'id', 'name', 'category', 'basis', 'softeningPoint',
            'viscosity.30', 'viscosity.120', 'viscosity.140', 'viscosity.160', 'viscosity.180', 'viscosity.200',
            'density', 'color', 'solidContent', 'ph', 'feedingSpeed'
        ];

        columns.forEach(column => {
            let cell = document.createElement('td');
            if (column.includes('viscosity')) {
                let temp = column.split('.')[1];
                cell.textContent = product.viscosity && product.viscosity[temp] ? product.viscosity[temp] : '';
            } else {
                cell.textContent = product[column] || '';
            }
            row.appendChild(cell);
        });
        
        tableBody.appendChild(row);
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
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = productsData.filter(product => {
        return Object.values(product).some(value =>
            typeof value === 'object' ? Object.values(value).some(v => String(v).toLowerCase().includes(searchTerm)) : String(value).toLowerCase().includes(searchTerm)
        );
    });
    displayProducts(filteredProducts);
});
