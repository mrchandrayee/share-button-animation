const widget = document.getElementById("share-widget");
const mainButton = document.getElementById("share-main");
const status = document.getElementById("status");
const channels = [...document.querySelectorAll(".channel")];
let resetTimer;

function setMode(mode) {
  widget.classList.remove("open", "copying", "done");
  if (mode) widget.classList.add(mode);
  mainButton.setAttribute("aria-expanded", String(mode === "open"));
}
function reset() {
  clearTimeout(resetTimer);
  setMode("");
  status.textContent = "Pick a channel";
}
mainButton.addEventListener("click", () => {
  if (widget.classList.contains("done") || widget.classList.contains("copying")) {
    reset();
    return;
  }
  const open = widget.classList.toggle("open");
  mainButton.setAttribute("aria-expanded", String(open));
  status.textContent = open ? "Pick a channel" : "Share";
});

async function copyCurrentLink() {
  const url = window.location.href;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else {
      const area = document.createElement("textarea");
      area.value = url;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      if (!ok) throw new Error("Clipboard unavailable");
    }
    return true;
  } catch {
    status.textContent = "Clipboard permission unavailable";
    return false;
  }
}
channels.forEach(button => {
  button.addEventListener("click", async () => {
    const channel = button.dataset.channel;
    if (channel === "copy") {
      setMode("copying");
      status.textContent = "Copying…";
      const copied = await copyCurrentLink();
      if (!copied) {
        resetTimer = setTimeout(reset, 1800);
        return;
      }
      setMode("done");
      status.textContent = "Link copied";
      resetTimer = setTimeout(reset, 2300);
      return;
    }
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      email: `mailto:?subject=${title}&body=${url}`
    };
    if (channel === "email") window.location.href = shareUrls.email;
    else window.open(shareUrls[channel], "_blank", "noopener,noreferrer");
    status.textContent = `Opening ${channel === "x" ? "X" : channel}…`;
    resetTimer = setTimeout(reset, 1400);
  });
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") reset();
});
