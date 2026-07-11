const cards = Array.from(document.querySelectorAll(".dsce-card"));
const assuranceControl = document.querySelector(".assurance-flip");
const controls = assuranceControl ? [...cards, assuranceControl] : cards;

if (controls.length) {
  const setControlState = (control, showOwners) => {
    const inner = control.classList.contains("assurance-flip")
      ? control.querySelector(".assurance-inner")
      : control;
    const front = inner?.querySelector(".front");
    const back = inner?.querySelector(".back");
    const subject = control.getAttribute("aria-label")?.split(":")[0] || "Card";

    inner?.classList.toggle("is-flipped", showOwners);
    control.setAttribute("aria-pressed", String(showOwners));
    control.setAttribute("aria-label", `${subject}: ${showOwners ? "show model" : "show ownership"}`);
    front?.setAttribute("aria-hidden", String(showOwners));
    back?.setAttribute("aria-hidden", String(!showOwners));
  };

  const activate = (control) => {
    const showOwners = control.getAttribute("aria-pressed") !== "true";
    setControlState(control, showOwners);
  };

  controls.forEach((control) => {
    control.addEventListener("click", () => activate(control));
    control.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(control);
      }
    });

    setControlState(control, false);
  });
}
