export function getProfileBlueprint(perfil, sectionId) {
  return `
    <div class="profile-header" data-toggle="${sectionId}">
        <h3>Perfil: ${perfil}</h3>
        <span class="arrow">▼</span>
      </div>
      <div class="profile-content inactive" id="${sectionId}"></div>
  `;
}

export function getGroupBlueprint(label, groupId) {
  return `
        <div class="group-header" data-toggle="${groupId}">
        <h4>${label}</h4>
        <span class="arrow">▼</span>
        </div>
        <div class="group-content inactive" id="${groupId}"></div>
    `;
}

export function getFieldBlueprint(label, value, key) {
  const fieldId = `${key}-${Math.random().toString(36).substring(2, 5)}`;
  return `<div class="user__field">
    <label>${label}</label>
    <div class="input-wrapper">
        <input type="text" readonly value="${value}" id="${fieldId}">
        <button class="copy-btn" data-target="${fieldId}" title="Copiar">
        <img src="../app/img/copy.svg" class="icon-copy"/>
        </button>
    </div>
    </div>`;
}