//const
const digits = [
  "linh",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín"
];
// Get the input field and the display element
var inputField = document.getElementById("myInput");
var displayText = document.getElementById("displayText");
var displayReadText = document.getElementById("displayReadText");
// Add the event listener
inputField.addEventListener("input", function (event) {
  // remove 0
  event.target.value = removeLeadingZeros(event.target.value);
  // Insert comma
  var dpText = numberWithCommas(event.target.value);
  var dpReadText = readNumber(dpText);
  var lastChar = dpReadText.substr(dpReadText.length - 1);
  if (lastChar === " ") dpReadText = dpReadText.slice(0, -1);
  // Update the displayText content with the input field value
  displayText.textContent = dpText;
  // if (dpText.substr(dpText.length - 3) === '000')
  //   displayReadText.textContent = dpReadText + " đồng chẵn.";
  // else
  //   displayReadText.textContent = dpReadText + " đồng.";
  displayReadText.textContent = dpReadText;
  fetchData("ja");
  fetchData("zh");
  fetchData("en");
  fetchData("fr");
});
function removeLeadingZeros(num) {
  return num.replace(/^0+/, "");
}
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function readNumber(sNum) {
  var rText = docBatKy(sNum);
  rText = rText[0].toUpperCase() + rText.slice(1);
  return rText;
}
function docSo(n) {
  return digits[n];
}
function docHangChuc(sNum2) {
  if (sNum2[0] === "1") {
    if (sNum2[1] === "5") return "mười lăm";
    else if (sNum2[1] === "0") return "mười";
    else return "mười " + docSo(sNum2[1]);
  } else if (sNum2[0] === "0") {
    if (sNum2[1] === "0") return "";
  } else {
    if (sNum2[1] === "1") return docSo(sNum2[0]) + " mươi mốt";
    else if (sNum2[1] === "5") return docSo(sNum2[0]) + " mươi lăm";
    else if (sNum2[1] === "0") return docSo(sNum2[0]) + " mươi";
    else return docSo(sNum2[0]) + " mươi " + docSo(sNum2[1]);
  }
}
function docHangTram(sNum3) {
  if (sNum3[0] !== "0") {
    if (sNum3[1] !== "0")
      return docSo(sNum3[0]) + " trăm " + docHangChuc(sNum3.slice(1, 3));
    else {
      if (sNum3[2] !== "0") {
        return (
          docSo(sNum3[0]) + " trăm " + docSo(sNum3[1]) + " " + docSo(sNum3[2])
        );
      } else return docSo(sNum3[0]) + " trăm ";
    }
  } else if (sNum3[1] === "0") {
    if (sNum3[2] === "0") return "";
    else return "không trăm linh " + docSo(sNum3.slice(-1));
  } else return "không trăm " + docHangChuc(sNum3.slice(-2));
}
function docHangNghin(sNum6) {
  if (docBatKy(sNum6.slice(0, sNum6.length - 4)) !== "")
    return (
      docBatKy(sNum6.slice(0, sNum6.length - 4)) +
      " nghìn " +
      docHangTram(sNum6.slice(-3))
    );
  else return docHangTram(sNum6.slice(-3));
}
function docHangTrieu(sNum9) {
  if (docBatKy(sNum9.slice(0, sNum9.length - 8)) !== "")
    return (
      docBatKy(sNum9.slice(0, sNum9.length - 8)) +
      " triệu " +
      docHangNghin(sNum9.slice(sNum9.length - 7, sNum9.length))
    );
  else return docHangNghin(sNum9.slice(sNum9.length - 7, sNum9.length));
}
function docHangTy(sNum12) {
  if (docBatKy(sNum12.slice(sNum12.length - 12, sNum12.length - 9)) !== "") {
    var tTy = docBatKy(sNum12.slice(0, sNum12.length - 12));
    return (
      tTy +
      " tỷ " +
      docHangTrieu(sNum12.slice(sNum12.length - 11, sNum12.length))
    );
  } else return docHangTrieu(sNum12.slice(sNum12.length - 11, sNum12.length));
}
function docBatKy(sNum) {
  if (sNum.length === 1) return docSo(sNum);
  if (sNum.length === 2) return docHangChuc(sNum);
  if (sNum.length === 3) return docHangTram(sNum);
  if (sNum.length > 3 && sNum.length <= 7) {
    return docHangNghin(sNum);
  }
  if (sNum.length > 6 && sNum.length <= 11) {
    return docHangTrieu(sNum);
  }
  if (sNum.length > 12) {
    return docHangTy(sNum);
  }
}
//----translate--------
function fetchData(lang) {
  let inputtext = document.getElementById("displayReadText").textContent;
  console.log(inputtext);
  // Replace with your actual API URL
  const apiUrl =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=` +
    inputtext;
  console.log(apiUrl);
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      //console.log(response.json());
      return response.json();
    })
    .then((data) => {
      // Display the result
      console.log(data);
      let result = JSON.stringify(data[0][0][0]);
      //console.log(result);
      let output = "translatedText" + lang;
      document.getElementById(output).textContent = result;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
//////////////////////////////////
