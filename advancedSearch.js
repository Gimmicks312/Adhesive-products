// advancedsearch.js

// Function to open the advanced search popup
function openAdvancedSearch() {
    document.getElementById("advancedSearchPopup").style.display = "block";
}

// Function to close the advanced search popup
function closeAdvancedSearch() {
    document.getElementById("advancedSearchPopup").style.display = "none";
}

// Function to apply the advanced search filters
function applyAdvancedSearch() {
    // Get the filter values
    const filters = {
        softeningPoint: getRangeValues('softeningPoint'),
        viscosity30: getRangeValues('viscosity30'),
        viscosity120: getRangeValues('viscosity120'),
        viscosity140: getRangeValues('viscosity140'),
        viscosity160: getRangeValues('viscosity160'),
        viscosity180: getRangeValues('viscosity180'),
        viscosity200: getRangeValues('viscosity200'),
        density: getRangeValues('density'),
        solidContent: getRangeValues('solidContent'),
        pH: getRangeValues('ph'),
        applicationTemp: getRangeValues('applicationTemp'),
        feedingSpeed: getRangeValues('feedingSpeed'),
        applicationQuantity: getRangeValues('applicationQuantity'),
        openTime: getRangeValues('openTime')
    };

    // Call the function in scriptADSRC.js to filter the table with the selected ranges
    filterTable(filters);

    // Close the advanced search popup after applying filters
    closeAdvancedSearch();
}

// Function to get range values from input fields
function getRangeValues(fieldPrefix) {
    const minValue = parseFloat(document.getElementById(`${fieldPrefix}Min`).value) || null;
    const maxValue = parseFloat(document.getElementById(`${fieldPrefix}Max`).value) || null;
    return { min: minValue, max: maxValue };
}

// Function to reset all the filters
function resetAdvancedSearch() {
    // Reset all input fields in the advanced search form
    document.querySelectorAll('#advancedSearchForm input').forEach(input => input.value = "");

    // Call the function in scriptADSRC.js to show all products (no filters applied)
    resetTable();

    // Close the advanced search popup
    closeAdvancedSearch();
}
