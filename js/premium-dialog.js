// Automatically inject the dialog structural element into the active DOM document body
const modalHTML = `
<div id="universalPremiumModal" class="custom-modal-overlay">
    <div class="custom-modal">
        <div class="modal-icon-alert">
            <i class="fas fa-question-circle"></i>
        </div>
        <h3 id="universalModalTitle">Confirmation</h3>
        <p id="universalModalMessage">Are you sure you want to proceed?</p>
        <div class="modal-actions-row">
            <button id="universalModalCancelBtn" class="modal-btn secondary">Cancel</button>
            <button id="universalModalConfirmBtn" class="modal-btn primary-confirm">Confirm</button>
        </div>
    </div>
</div>
`;

// Append structure immediately upon resource link initialization
document.body.insertAdjacentHTML('beforeend', modalHTML);

/**
 * Universal Premium Confirmation Modal Engine
 * @param {string} title - The header text for the popup
 * @param {string} message - The contextual sub-message text
 * @param {string} iconClass - FontAwesome icon class (e.g., 'fa-sign-out-alt', 'fa-trash')
 * @returns {Promise<boolean>}
 */
export function showConfirm(title, message, iconClass = "fa-question-circle") {
    return new Promise((resolve) => {
        const modal = document.getElementById('universalPremiumModal');
        const iconEl = modal.querySelector('.modal-icon-alert i');
        
        document.getElementById('universalModalTitle').innerText = title;
        document.getElementById('universalModalMessage').innerText = message;
        iconEl.className = `fas ${iconClass}`;
        
        modal.classList.add('active');
        
        const cleanUp = (result) => {
            modal.classList.remove('active');
            document.getElementById('universalModalConfirmBtn').onclick = null;
            document.getElementById('universalModalCancelBtn').onclick = null;
            resolve(result);
        };

        document.getElementById('universalModalConfirmBtn').onclick = () => cleanUp(true);
        document.getElementById('universalModalCancelBtn').onclick = () => cleanUp(false);
    });
}