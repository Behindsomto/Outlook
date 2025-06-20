document.getElementById("btn").addEventListener("click", sendToBackend);

function sendToBackend() {
  console.log("🔔 Button clicked");

  let value1 = document.getElementById("input1").value;
  let value2 = document.getElementById("input2").value;

  fetch("https://your-backend.onrender.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName: value1, lastName: value2 }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Response from backend:", data);
      document.getElementById("myText").style.display = "block";
    })
    .catch((err) => console.error("❌ Error sending to backend:", err));
}
