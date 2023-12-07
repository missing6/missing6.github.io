// Get the input field and the display element
var inputField = document.getElementById('myInput');
var displayText = document.getElementById('displayText');

// Add the event listener
inputField.addEventListener('input', function(event) {
  // Update the displayText content with the input field value
  displayText.textContent = 'Input changed to: ' + event.target.value;
});
