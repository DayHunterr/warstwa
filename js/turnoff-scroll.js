const menuToggle = document.getElementById('menu__toggle');

menuToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('no-scroll'); // Отключаем прокрутку
    } else {
        document.body.classList.remove('no-scroll'); // Включаем прокрутку
    }
});