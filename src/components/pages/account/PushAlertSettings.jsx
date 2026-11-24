"use client";

import { useState, useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getBrowserPermission() {
  return "Notification" in window ? Notification.permission : "unsupported";
}

function getServerPermission() {
  return "loading";
}

const messages = {
  loading: "Checking this browser...",
  unsupported: "This browser does not support news alerts.",
  default: "Alerts are off in this browser.",
  granted: "Alerts are on in this browser. You will get breaking news as it happens.",
  denied: "Alerts are blocked in this browser. Allow notifications for this site in your browser settings.",
};

export default function PushAlertSettings({ deviceCount }) {
  const browserPermission = useSyncExternalStore(subscribe, getBrowserPermission, getServerPermission);
  const [askedPermission, setAskedPermission] = useState(null);
  const permission = askedPermission || browserPermission;

  async function turnOn() {
    const result = await Notification.requestPermission();
    setAskedPermission(result);
  }

  return (
    <div className="space-y-3">
      <p className="font-semibold text-ink">Breaking news alerts</p>
      <p className="text-sm text-muted" aria-live="polite">
        {messages[permission]}
      </p>
      {permission === "default" && (
        <button
          type="button"
          onClick={turnOn}
          className="border border-ink px-4 py-2 text-sm font-semibold text-ink hover:bg-surface"
        >
          Turn on alerts
        </button>
      )}
      <p className="text-xs text-muted">
        Alerts are turned on for {deviceCount} {deviceCount === 1 ? "device" : "devices"} on your account.
      </p>
    </div>
  );
}
