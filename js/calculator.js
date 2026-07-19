// calculator.js

window.calculatePlatesNeeded = function() {
    const resultDiv = document.getElementById('plates-needed-result');
    const quickMathsText = document.getElementById('quick-maths-text');
    
    if (!resultDiv || !quickMathsText) return;

    if (State.targetWeight <= 0) {
        resultDiv.innerHTML = '¯\\_(ツ)_/¯';
        quickMathsText.textContent = `${State.barWeight} ≈ ${State.barWeight} KG`;
        window.lastCalculatedPlates = [];
        return;
    }

    let targetTotal = State.targetWeight;
    let barWeight = State.barWeight;

    // Convert target to KG if we are in LB mode (for calculations)
    // Wait, the standard app calculates using the plates in the target unit.
    // Assuming standard KG plates for now, so we need target to be in KG.
    if (State.unit === 'lb') {
        targetTotal = targetTotal / 2.20462;
    }

    let weightPerSide = (targetTotal - barWeight) / 2;
    
    if (weightPerSide <= 0) {
        resultDiv.innerHTML = 'Just the bar!';
        quickMathsText.textContent = `${barWeight} ≈ ${barWeight} KG`;
        window.lastCalculatedPlates = [];
        window.renderVisualBarbell();
        return;
    }

    // Greedy algorithm for plates
    const platesUsed = {};
    const platesSequence = [];
    let remaining = weightPerSide;

    // To prevent floating point issues, work in grams
    let remainingGrams = Math.round(remaining * 1000);
    
    for (let i = 0; i < availablePlatesKG.length; i++) {
        let plateGrams = Math.round(availablePlatesKG[i] * 1000);
        let plateLimit = State.inventory ? (State.inventory[availablePlatesKG[i]] || 0) : Infinity;
        let usedCount = 0;
        
        while (remainingGrams >= plateGrams && usedCount < Math.floor(plateLimit / 2)) {
            remainingGrams -= plateGrams;
            platesSequence.push(availablePlatesKG[i]);
            platesUsed[availablePlatesKG[i]] = (platesUsed[availablePlatesKG[i]] || 0) + 1;
            usedCount++;
        }
    }

    // Check if we hit it exactly
    let calculatedWeightPerSide = (weightPerSide * 1000 - remainingGrams) / 1000;
    let actualTotalKG = barWeight + (calculatedWeightPerSide * 2);

    window.lastCalculatedPlates = platesSequence;

    // Render HTML result
    let html = '';
    const plateKeys = Object.keys(platesUsed).map(Number).sort((a, b) => b - a);
    
    if (plateKeys.length > 0) {
        plateKeys.forEach(weight => {
            const colorClass = plateColors[weight] || 'p-2-5';
            html += `<span class="plate-badge ${colorClass}" style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin: 0 4px;
                padding: 4px 10px;
                border-radius: 12px;
                font-weight: bold;
                font-size: 0.9rem;
                background-color: var(--plate-${getColorName(weight)});
                color: ${getTextColor(weight)};
                border: 1px solid rgba(255,255,255,0.2);
            ">${platesUsed[weight]}x ${weight}</span>`;
        });
    } else {
        html = 'Just the bar!';
    }
    
    resultDiv.innerHTML = html;

    // Quick Maths
    if (State.unit === 'lb') {
        let actualTotalLB = actualTotalKG * 2.20462;
        quickMathsText.textContent = `${State.targetWeight} ≈ ${actualTotalLB.toFixed(2)} LB`;
    } else {
        quickMathsText.textContent = `${State.targetWeight} ≈ ${actualTotalKG.toFixed(2)} KG`;
    }

    window.renderVisualBarbell();
};

function getColorName(weight) {
    if (weight === 25 || weight === 50) return 'red';
    if (weight === 20 || weight === 2) return 'blue';
    if (weight === 15 || weight === 1.5) return 'yellow';
    if (weight === 10 || weight === 1) return 'green';
    if (weight === 5) return 'white';
    if (weight === 2.5) return 'black';
    return 'silver'; // 1.25, 0.5, 0.25, 0.125
}

function getTextColor(weight) {
    const color = getColorName(weight);
    if (['white', 'yellow', 'silver'].includes(color)) return '#000';
    return '#fff';
}
