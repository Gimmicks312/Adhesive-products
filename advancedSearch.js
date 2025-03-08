// Get the elements
const advancedSearchBtn = document.getElementById('advancedSearchBtn');
const advancedSearchPopup = document.getElementById('advancedSearchPopup');
const closeBtn = document.querySelector('.close-btn');
const advancedSearchForm = document.getElementById('advancedSearchForm');
const searchBtn = document.getElementById('searchBtn');

// Open the advanced search pop-up
advancedSearchBtn.addEventListener('click', () => {
    advancedSearchPopup.style.display = 'block';
});

// Close the advanced search pop-up when the close button is clicked
closeBtn.addEventListener('click', () => {
    advancedSearchPopup.style.display = 'none';
});

// Close the pop-up if the user clicks outside the pop-up content
window.addEventListener('click', (event) => {
    if (event.target === advancedSearchPopup) {
        advancedSearchPopup.style.display = 'none';
    }
});

// Handle the advanced search form submission
advancedSearchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the page from refreshing

    // Get the values from the form inputs
    const viscosityMin = document.getElementById('viscosityMin').value || '';
    const viscosityMax = document.getElementById('viscosityMax').value || '';
    const phMin = document.getElementById('phMin').value || '';
    const phMax = document.getElementById('phMax').value || '';
    const softeningPointMin = document.getElementById('softeningPointMin').value || '';
    const softeningPointMax = document.getElementById('softeningPointMax').value || '';
    const feedingSpeedMin = document.getElementById('feedingSpeedMin').value || '';
    const feedingSpeedMax = document.getElementById('feedingSpeedMax').value || '';

    // Pass the filter values to the script.js logic
    filterData({
        viscosityMin,
        viscosityMax,
        phMin,
        phMax,
        softeningPointMin,
        softeningPointMax,
        feedingSpeedMin,
        feedingSpeedMax
    });

    // Close the pop-up after submitting
    advancedSearchPopup.style.display = 'none';
});

// Function to send filter criteria to script.js
function filterData(filters) {
    // Trigger the filtering logic in script.js
    if (typeof applyAdvancedFilters === 'function') {
        applyAdvancedFilters(filters);
    }
}
