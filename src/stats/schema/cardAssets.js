export const CARD_BACKINGS = [
  "icons/cards/Card_Backing_Standard.webp",
  "icons/cards/Card_Backing_Standard.webp",
  "icons/cards/Card_Backing_Gilded.webp",
  "icons/cards/Card_Backing_Polychrome.webp",
  "icons/cards/Card_Backing_Infernal.webp"
];

export const CARD_ORE_LABELS = ["Locked", "Normal", "Gilded", "Polychrome", "Infernal"];

export function formatCardName(key, typeImage) {
  if (!key) return "Unnamed Card";
  if (!typeImage) {
    const result = String(key).replace(/([A-Z0-9])/g, " $1");
    return (result.charAt(0).toUpperCase() + result.slice(1)).trim();
  }
  const filename = typeImage.substring(typeImage.lastIndexOf('/') + 1, typeImage.lastIndexOf('.'));
  return filename
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => {
      if (word === word.toUpperCase() && word.length > 1) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function getNewKeyFromTypeImage(typeImage) {
  if (!typeImage) return "";
  const filenameWithExt = typeImage.substring(typeImage.lastIndexOf('/') + 1);
  const filename = filenameWithExt.substring(0, filenameWithExt.lastIndexOf('.'));
  const clean = filename.replace(/[^a-zA-Z0-9]/g, ' ');
  const words = clean.split(/\s+/).filter(Boolean);
  return words.map((word, index) => {
    const lower = word.toLowerCase();
    if (index === 0) return lower;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
}