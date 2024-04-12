function handleAddUserClick() {
    document.addEventListener('DOMContentLoaded', function() {
        const observer = new MutationObserver(function(mutationsList, observer) {
            const button = document.querySelector('.modalSmall__icon--add');
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
    const menu = document.getElementById('addUser');
    if (menu) {
        const currentDisplayStyle = window.getComputedStyle(menu).display;
        menu.style.display = currentDisplayStyle === 'flex' ? 'none' : 'flex';
    }
}

export default handleAddUserClick;
