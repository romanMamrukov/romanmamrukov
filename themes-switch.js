// Function to change the theme based on the selected option
function changeTheme(themeName) {
    // Disable all theme stylesheets
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      link.disabled = true;
    });
  
    // Enable the selected theme stylesheet
    document.getElementById(`themeStyles`).disabled = false;
    document.getElementById(`themeStyles`).setAttribute('href', `styles/${themeName}.css`);
  }
  
  // Example: Apply the selected theme on page load
  document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.getElementById('themeSelector');
    const selectedTheme = themeSelector.value;
    changeTheme(selectedTheme);
  });