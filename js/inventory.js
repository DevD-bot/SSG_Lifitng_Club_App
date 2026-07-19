// inventory.js

State.inventory = {
    50: 0, 25: 18, 20: 2, 15: 2, 10: 2, 5: 2, 2.5: 2, 2: 0, 1.5: 0, 1.25: 2, 1: 0, 0.5: 0, 0.25: 0, 0.125: 0
};

function initInventory() {
    renderInventoryPlateGrid();
}

function renderInventoryPlateGrid() {
    const grid = document.getElementById('inventory-plate-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    availablePlatesKG.forEach(weight => {
        const colorClass = plateColors[weight] || 'p-2-5';
        
        const plateEl = document.createElement('div');
        plateEl.className = `plate-control ${colorClass}`;
        
        const label = document.createElement('div');
        label.className = 'plate-control-label';
        label.textContent = weight;

        const actions = document.createElement('div');
        actions.className = 'plate-control-actions';

        const btnMinus = document.createElement('button');
        btnMinus.className = 'plate-btn';
        btnMinus.textContent = '−';
        btnMinus.onclick = () => {
            if (State.inventory[weight] > 0) {
                State.inventory[weight]--;
                updateInventoryCount(weight, plateEl);
                if (window.calculatePlatesNeeded) window.calculatePlatesNeeded();
            }
        };

        const countDisplay = document.createElement('div');
        countDisplay.className = 'plate-count';
        countDisplay.textContent = State.inventory[weight];

        const btnPlus = document.createElement('button');
        btnPlus.className = 'plate-btn';
        btnPlus.textContent = '+';
        btnPlus.onclick = () => {
            State.inventory[weight]++;
            updateInventoryCount(weight, plateEl);
            if (window.calculatePlatesNeeded) window.calculatePlatesNeeded();
        };

        actions.appendChild(btnMinus);
        actions.appendChild(countDisplay);
        actions.appendChild(btnPlus);

        const unitLabel = document.createElement('div');
        unitLabel.className = 'plate-control-unit';
        unitLabel.textContent = 'KG';

        plateEl.appendChild(label);
        plateEl.appendChild(actions);
        plateEl.appendChild(unitLabel);

        grid.appendChild(plateEl);
    });
}

function updateInventoryCount(weight, plateEl) {
    const countDisplay = plateEl.querySelector('.plate-count');
    if (countDisplay) {
        countDisplay.textContent = State.inventory[weight];
    }
}
