const displayText = document.querySelector("#nText");
const inputField = document.querySelector("input");
// Add the event listener
inputField.addEventListener('input', function(event) {
	// Update the displayText content with the input field value
	displayText.textContent = 'Input changed to: ' + event.target.value;
	
	// Change the color of the displayText to red
	displayText.style.color = 'red';
  });