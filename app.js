// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"));
}

// Tab Navigation
const pages = document.querySelectorAll(".page");
const buttons = document.querySelectorAll(".tab-bar button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(btn.dataset.page).classList.add("active");
  });
});

// Timer Notifications
document.getElementById("notify-btn").addEventListener("click", () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      alert("Notification scheduled in 10 seconds...");
      setTimeout(() => {
        new Notification("⏰ Timer Done!", {
          body: "This notification was triggered after 10 seconds.",
          icon: "icons/icon-192.png"
        });
      }, 10000);
    }
  });
});

// Offline/Online Detection
const offlineStatus = document.getElementById("offline-status");
function updateOnlineStatus() {
  if (navigator.onLine) {
    offlineStatus.textContent = "You are online ✅";
  } else {
    offlineStatus.textContent = "You are offline ❌ (using cached content)";
  }
}
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();

// Test functions
function checkSW() {
  const out = document.getElementById("test-output");
  if (navigator.serviceWorker.controller) {
    out.textContent = "Service Worker active: " + navigator.serviceWorker.controller.state;
  } else {
    out.textContent = "No active Service Worker.";
  }
}

function checkCache() {
  const out = document.getElementById("test-output");
  caches.keys().then(keys => out.textContent = "Caches: " + keys.join(", "));
}
