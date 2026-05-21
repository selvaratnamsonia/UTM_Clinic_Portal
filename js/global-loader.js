// js/global-loader.js

// 1. Inject CSS Styles automatically into the document head
const loaderStyles = document.createElement('style');
loaderStyles.innerHTML = `
    .global-progress-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: rgba(244, 232, 236, 0.4);
        z-index: 100000; 
        overflow: hidden;
        transition: opacity 0.3s ease;
    }
    .global-progress-fill {
        height: 100%;
        width: 100%;
        background-color: #802c44; /* UTM Maroon */
        transform: translateX(-100%);
        animation: globalLoadingAnim 1.5s infinite linear;
        transform-origin: left center;
    }
    @keyframes globalLoadingAnim {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(-30%); }
        100% { transform: translateX(0%); }
    }
`;
document.head.appendChild(loaderStyles);

// 2. Inject HTML Structure automatically into the document body
const loaderContainer = document.createElement('div');
loaderContainer.id = 'globalLoadingBar';
loaderContainer.className = 'global-progress-container';
loaderContainer.style.display = 'none';
loaderContainer.innerHTML = '<div class="global-progress-fill"></div>';
document.body.appendChild(loaderContainer);

// 3. Define Controller variables
let activeRequestsCount = 0;

export function showGlobalLoader() {
    activeRequestsCount++;
    document.getElementById('globalLoadingBar').style.display = 'block';
    document.getElementById('globalLoadingBar').style.opacity = '1';
}

export function hideGlobalLoader() {
    activeRequestsCount--;
    if (activeRequestsCount <= 0) {
        activeRequestsCount = 0;
        const loader = document.getElementById('globalLoadingBar');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (activeRequestsCount === 0) loader.style.display = 'none';
            }, 300); // Wait for transition fade out to finish
        }
    }
}