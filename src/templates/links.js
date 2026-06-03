const KEY = "templateLinks"; // { [templateId]: spreadsheetId }

export function loadTemplateLinks() {
  return JSON.parse(localStorage.getItem(KEY)) ?? {};
}

export function saveTemplateLinks(links) {
  localStorage.setItem(KEY, JSON.stringify(links));
}

export function setLinkedSheetId(templateId, spreadsheetId) {
  const links = loadTemplateLinks();
  links[templateId] = spreadsheetId;
  saveTemplateLinks(links);
}

export function getLinkedSheetId(templateId) {
  const links = loadTemplateLinks();
  return links[templateId] ?? null;
}

export function clearLinkedSheetId(templateId) {
  const links = loadTemplateLinks();
  delete links[templateId];
  saveTemplateLinks(links);
}
