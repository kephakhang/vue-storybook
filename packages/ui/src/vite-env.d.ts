/// <reference types="vite/client" />
import "bingmaps/types/MicrosoftMaps/Microsoft.Maps";

declare global {
  interface Window {
    onloadBingMap: () => void;
    onloadGoogleMap: () => void;
  }
}
