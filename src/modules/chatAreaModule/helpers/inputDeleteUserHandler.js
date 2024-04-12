function handleDeleteUserClick() {
    document.addEventListener('DOMContentLoaded', function() {
        const observer = new MutationObserver(function(mutationsList, observer) {
            const button = document.querySelector('.modalSmall__icon--delete');
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
    const menu = document.getElementById('deleteUser');
    if (menu) {
        const currentDisplayStyle = window.getComputedStyle(menu).display;
        menu.style.display = currentDisplayStyle === 'flex' ? 'none' : 'flex';
    }
}

export default handleDeleteUserClick;
