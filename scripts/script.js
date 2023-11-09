document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById("grid");
    const colorBtn = document.getElementById("colorBtn");
    const rainbowBtn = document.getElementById("rainbowBtn");
    const eraseBtn = document.getElementById("eraseBtn");
    const clearBtn = document.getElementById("clearBtn");
    const colorPicker = document.getElementById("colorPicker");
    const gridSizeInput = document.getElementById("gridSize");
    const gridSizeValue = document.getElementById("gridValue");

    let isDrawing = false;
    let currentColor = "black";
    let currentMode = "color";
    let gridSize = parseInt(gridSizeInput.value);

    colorBtn.addEventListener("click", function() {
        enableColorMode();
    });

    rainbowBtn.addEventListener("click", function() {
        enableRainbowMode();
    });

    eraseBtn.addEventListener("click", function() {
        enableEraseMode();
    });

    clearBtn.addEventListener("click", function() {
        clearGrid();
    });

    colorPicker.addEventListener("input", function() {
        currentColor = colorPicker.value;
    });

    gridSizeInput.addEventListener("input", function() {
        gridSize = parseInt(gridSizeInput.value);
        gridSizeValue.textContent = gridSize + "x" + gridSize;
        createGrid(gridSize);
    });

    gridContainer.addEventListener("mousedown", function(e) {
        isDrawing = true;
        draw(e);
    });

    gridContainer.addEventListener("mouseup", function() {
        isDrawing = false;
    });

    gridContainer.addEventListener("mousemove", function(e) {
        draw(e);
    });

    function draw(e) {
        if (isDrawing) {
            if (currentMode === "color") {
                e.target.style.backgroundColor = currentColor;
            } else if (currentMode === "rainbow") {
                e.target.style.backgroundColor = getRandomColor();
            } else if (currentMode === "erase") {
                e.target.style.backgroundColor = "white";
            }
        }
    }

    function enableColorMode() {
        currentMode = "color";
    }

    function enableRainbowMode() {
        currentMode = "rainbow";
    }

    function enableEraseMode() {
        currentMode = "erase";
    }

    function clearGrid() {
        const cells = gridContainer.querySelectorAll("div");
        cells.forEach(function(cell) {
            cell.style.backgroundColor = "white";
        });
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    createGrid(gridSize);

    function createGrid(size) {
        gridContainer.innerHTML = "";
        gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement("div");
            cell.addEventListener("mousedown", startDrawing);
            cell.addEventListener("mouseup", stopDrawing);
            cell.addEventListener("mousemove", draw);
            gridContainer.appendChild(cell);
        }
    }

    function startDrawing() {
        isDrawing = true;
        draw(this);
    }

    function stopDrawing() {
        isDrawing = false;
    }
});