// barbells.js

const defaultBars = [
    { id: 'standard', name: 'Standard', weightKG: 20, weightLB: 44.09 },
    { id: 'power', name: 'Power', weightKG: 20.4, weightLB: 45 },
    { id: 'squat', name: 'Squat', weightKG: 24.95, weightLB: 55 },
    { id: 'machine', name: 'Machine', weightKG: 0, weightLB: 0 },
    { id: 'womens', name: 'Women\'s', weightKG: 15, weightLB: 33.07 }
];

function initBarbells() {
    renderBarbellsList();
}

function renderBarbellsList() {
    const listContainer = document.getElementById('barbells-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';

    defaultBars.forEach(bar => {
        const itemEl = document.createElement('div');
        itemEl.className = 'bar-item';
        if (State.barWeight === bar.weightKG) {
            itemEl.classList.add('selected');
        }

        itemEl.onclick = () => {
            State.barWeight = bar.weightKG;
            document.querySelectorAll('.bar-item').forEach(el => el.classList.remove('selected'));
            itemEl.classList.add('selected');
            updateUI();
        };

        const nameSpan = document.createElement('span');
        nameSpan.style.flex = '1';
        nameSpan.textContent = bar.name;

        const kgSpan = document.createElement('span');
        kgSpan.style.width = '80px';
        kgSpan.style.textAlign = 'center';
        kgSpan.textContent = `${bar.weightKG} KG`;

        const lbSpan = document.createElement('span');
        lbSpan.style.width = '100px';
        lbSpan.style.textAlign = 'center';
        lbSpan.textContent = `${bar.weightLB} LB`;

        const actionsSpan = document.createElement('span');
        actionsSpan.style.width = '60px';
        actionsSpan.style.display = 'flex';
        actionsSpan.style.justifyContent = 'flex-end';
        actionsSpan.style.gap = '8px';
        actionsSpan.innerHTML = `<i class="ph ph-note-pencil text-red"></i> <i class="ph ph-x text-red"></i>`;

        itemEl.appendChild(nameSpan);
        itemEl.appendChild(kgSpan);
        itemEl.appendChild(lbSpan);
        itemEl.appendChild(actionsSpan);

        listContainer.appendChild(itemEl);
    });
}
