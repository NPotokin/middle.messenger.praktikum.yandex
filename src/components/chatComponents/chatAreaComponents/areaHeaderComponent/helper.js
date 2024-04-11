function handleButtonClick() {
    document.addEventListener('DOMContentLoaded', function() {
        const observer = new MutationObserver(function(mutationsList, observer) {
            const button = document.querySelector('.chatAreaHeader__menu');
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
    const menu = document.querySelector('.modalSmall');
    if (menu) {
        const currentDisplayStyle = window.getComputedStyle(menu).display;
        menu.style.display = currentDisplayStyle === 'flex' ? 'none' : 'flex';
    }
}

export default handleButtonClick;
