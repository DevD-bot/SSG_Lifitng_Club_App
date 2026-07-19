// rpe.js

function initRPE() {
    const inputs = ['rpe-weight', 'rpe-reps', 'rpe-rpe', 'next-reps', 'next-rpe'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateRPE);
        }
    });
}

function calculateRPE() {
    const w = parseFloat(document.getElementById('rpe-weight').value);
    const r = parseFloat(document.getElementById('rpe-reps').value);
    const rpe = parseFloat(document.getElementById('rpe-rpe').value);

    const e1rmDisplay = document.getElementById('rpe-e1rm');
    const nextWeightDisplay = document.getElementById('next-weight');
    
    let e1rm = 0;

    // Calculate e1RM if we have valid inputs for the Last Set
    if (w > 0 && r > 0 && rpe > 0 && rpe <= 10) {
        // Effective reps = actual reps + reps in reserve (10 - RPE)
        const effectiveReps = r + (10 - rpe);
        // Epley formula: 1RM = w * (1 + 0.0333 * reps)
        e1rm = w * (1 + 0.0333 * effectiveReps);
        e1rmDisplay.textContent = e1rm.toFixed(1);
    } else {
        e1rmDisplay.textContent = 'e1RM*';
    }

    const nReps = parseFloat(document.getElementById('next-reps').value);
    const nRpe = parseFloat(document.getElementById('next-rpe').value);

    // Calculate Next Weight if we have a valid e1RM and Next Set inputs
    if (e1rm > 0 && nReps > 0 && nRpe > 0 && nRpe <= 10) {
        const nextEffectiveReps = nReps + (10 - nRpe);
        // Reverse Epley: w = 1RM / (1 + 0.0333 * reps)
        const nextWeight = e1rm / (1 + 0.0333 * nextEffectiveReps);
        nextWeightDisplay.textContent = nextWeight.toFixed(1);
    } else {
        nextWeightDisplay.textContent = '-';
    }
}
