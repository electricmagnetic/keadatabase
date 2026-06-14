"use client";

interface MapLayerToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Reusable map layer toggle control
 * Displays as a checkbox in the top-right corner of the map
 */
export function MapLayerToggle({ label, checked, onChange }: MapLayerToggleProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 10,
        background: "white",
        padding: "10px",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          margin: 0,
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span style={{ fontSize: "14px" }}>{label}</span>
      </label>
    </div>
  );
}
