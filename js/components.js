// components.js

function renderReversePlateGrid() {
    const grid = document.getElementById('plate-grid');
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
            if (State.reversePlates[weight] > 0) {
                State.reversePlates[weight]--;
                updatePlateCount(weight, plateEl);
                updateUI();
            }
        };

        const countDisplay = document.createElement('div');
        countDisplay.className = 'plate-count';
        countDisplay.textContent = State.reversePlates[weight];

        const btnPlus = document.createElement('button');
        btnPlus.className = 'plate-btn';
        btnPlus.textContent = '+';
        btnPlus.onclick = () => {
            State.reversePlates[weight]++;
            updatePlateCount(weight, plateEl);
            updateUI();
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

function updatePlateCount(weight, plateEl) {
    const countDisplay = plateEl.querySelector('.plate-count');
    if (countDisplay) {
        countDisplay.textContent = State.reversePlates[weight];
    }
}

window.renderVisualBarbell = function() {
    const container = document.getElementById('plates-container');
    if (!container) return;
    container.innerHTML = '';

    let platesToRender = [];

    if (State.mode === 'reverse') {
        // Render plates based on reverse mode state
        availablePlatesKG.forEach(weight => {
            const count = State.reversePlates[weight] || 0;
            for (let i = 0; i < count; i++) {
                platesToRender.push(weight);
            }
        });
        // Sort descending so largest is closest to center
        platesToRender.sort((a, b) => b - a);
    } else if (State.mode === 'calculate') {
        // Render plates based on calculate mode result
        if (window.lastCalculatedPlates) {
            platesToRender = window.lastCalculatedPlates; // Array of weights
        }
    }

    // Define visual sizes for plates
    const plateStyles = {
        25: { width: '24px', height: '110px', color: 'var(--plate-red)' },
        20: { width: '20px', height: '110px', color: 'var(--plate-blue)' },
        15: { width: '16px', height: '90px', color: 'var(--plate-yellow)' },
        10: { width: '14px', height: '70px', color: 'var(--plate-green)' },
        5: { width: '12px', height: '50px', color: 'var(--plate-white)' },
        2.5: { width: '10px', height: '40px', color: 'var(--plate-black)', border: '1px solid #666' },
        2: { width: '8px', height: '35px', color: 'var(--plate-blue)' },
        1.5: { width: '8px', height: '30px', color: 'var(--plate-yellow)' },
        1.25: { width: '8px', height: '28px', color: 'var(--plate-silver)' },
        1: { width: '8px', height: '26px', color: 'var(--plate-green)' },
        0.5: { width: '6px', height: '22px', color: 'var(--plate-silver)' },
        0.25: { width: '6px', height: '18px', color: 'var(--plate-silver)' },
        0.125: { width: '6px', height: '15px', color: 'var(--plate-silver)' }
    };

    platesToRender.forEach(weight => {
        const style = plateStyles[weight] || plateStyles[2.5];
        const plateEl = document.createElement('div');
        plateEl.style.width = style.width;
        plateEl.style.height = style.height;
        plateEl.style.backgroundColor = style.color;
        plateEl.style.borderRadius = '2px';
        plateEl.style.margin = '0 1px';
        if (style.border) {
            plateEl.style.border = style.border;
        }
        container.appendChild(plateEl);
    });
};
