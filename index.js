const btn = document.querySelector("button");
const sentence = document.querySelector("#sentence");
const input = document.querySelector("input");
function show() {
	sentence.innerText = input.value;
}
input.onchange = show;