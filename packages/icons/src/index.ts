import { type IconifyIcon, addIcon } from "@iconify/vue";

const emdnIcons = [
  {
    key: "emdn:cycle-time-alert",
    filename: "cycle-time-alert.svg",
  },
  {
    key: "emdn:data-request",
    filename: "data-request.svg",
  },
  {
    key: "emdn:detachment-alert",
    filename: "detachment-alert.svg",
  },
  {
    key: "emdn:disconnection-alert",
    filename: "disconnection-alert.svg",
  },
  {
    key: "emdn:emoldino-logo",
    filename: "emoldino-logo.svg",
  },
  {
    key: "emdn:emoldino-logo-color",
    filename: "emoldino-logo-color.svg",
  },
  {
    key: "emdn:history-log",
    filename: "history-log.svg",
  },
  {
    key: "emdn:machine-downtime-alert",
    filename: "machine-downtime-alert.svg",
  },
  {
    key: "emdn:maintenance-alert",
    filename: "maintenance-alert.svg",
  },
  {
    key: "emdn:note",
    filename: "note.svg",
  },
  {
    key: "emdn:refurbishment-alert",
    filename: "refurbishment-alert.svg",
  },
  {
    key: "emdn:relocation-alert",
    filename: "relocation-alert.svg",
  },
  {
    key: "emdn:unread",
    filename: "unread.svg",
  },
  {
    key: "emdn:user-access",
    filename: "user-access.svg",
  },
  {
    key: "emdn:work-order",
    filename: "work-order.svg",
  },
  {
    key: "emdn:mobile-download-link",
    filename: "mobile-download-link.svg",
  },
  {
    key: "emdn:mobile-download-link-hover",
    filename: "mobile-download-link-hover.svg",
  },
] as const;

export type EmdnIconKey = (typeof emdnIcons)[number]["key"];

function iconBuilder(svg: string): IconifyIcon {
  const widthMatch = svg.match(/width="([\d.]+)"/);
  const heightMatch = svg.match(/height="([\d.]+)"/);

  const width = widthMatch ? parseFloat(widthMatch[1]) : 30;
  const height = heightMatch ? parseFloat(heightMatch[1]) : 30;

  return {
    body: svg,
    width,
    height,
  };
}

/**
 * Add all icons from the eMoldino icon set to the Iconify library.
 */
export function addEmdnIcons(keys: EmdnIconKey[]) {
  return Promise.allSettled(
    keys.map(async (key) => {
      const filename = emdnIcons
        .find((icon) => icon.key === key)!
        .filename.split(".")[0];
      const svg = await import(`../assets/${filename}.svg?raw`).then(
        (module: { default: string }) => module.default
      );
      addIcon(key, iconBuilder(svg));
    })
  );
}
