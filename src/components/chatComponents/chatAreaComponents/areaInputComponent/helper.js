function handleAttachClick() {
    document.addEventListener('DOMContentLoaded', function() {
        const observer = new MutationObserver(function(mutationsList, observer) {
            const button = document.querySelector('.chatAreaInput__attach');
            if (button) {
                button.addEventListener('click', function() {
                    toggleDisplayStyle();
                });
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
};

function toggleDisplayStyle() {
    const menu = document.querySelector('.modalAttach');
    if (menu) {
        const currentDisplayStyle = window.getComputedStyle(menu).display;
        menu.style.display = currentDisplayStyle === 'flex' ? 'none' : 'flex';
    }
}

export default handleAttachClick;
