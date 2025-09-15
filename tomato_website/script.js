// Simple drag and drop for tomato images
const tomatoes = document.querySelectorAll('.draggable');
tomatoes.forEach(tomato => {
    tomato.onmousedown = function(event) {
        tomato.style.zIndex = 1000;
        function moveAt(pageX, pageY) {
            tomato.style.left = pageX - tomato.width / 2 + 'px';
            tomato.style.top = pageY - tomato.height / 2 + 'px';
        }
        moveAt(event.pageX, event.pageY);
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
        document.addEventListener('mousemove', onMouseMove);
        tomato.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            tomato.onmouseup = null;
            tomato.style.zIndex = 2;
        };
    };
    tomato.ondragstart = function() {
        return false;
    };
});
