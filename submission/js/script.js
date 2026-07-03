document.addEventListener('DOMContentLoaded', () => {
    // --- FEATURE 1: LOOP-RENDERED DYNAMIC CONTENT ---
    const practiceAreas = [
        { name: "Corporate Law", description: "Company formation, mergers & acquisitions, and compliance framework architecture." },
        { name: "Commercial Contracts", description: "Drafting, reviewing, and negotiating complex commercial arrangements to shield your interests." },
        { name: "Real Estate & Property", description: "Conveyancing, systematic land transactions, and real asset dispute resolutions." },
        { name: "Dispute Resolution", description: "Strategic litigation, commercial arbitration, and alternative dispute mediation pathways." }
    ];

    const servicesGrid = document.getElementById('dynamic-services-grid');

    if (servicesGrid) {
        servicesGrid.innerHTML = ''; // Clear hardcoded HTML
        
        practiceAreas.forEach(area => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <h3 style="font-family: var(--serif); color: var(--gold); margin-bottom: 12px; font-size: 1.25rem; letter-spacing: 0.5px;">${area.name}</h3>
                <p style="font-size: 0.95rem; line-height: 1.6; color: #ccc; margin: 0;">${area.description}</p>
            `;
            servicesGrid.appendChild(card);
        });
    }

   //FEATURE 2 (modified) & 4: DYNAMIC ADD/REMOVE WITH LOCALSTORAGE PERSISTENCE
    const caseInput = document.getElementById('case-item-input');
    const caseAddBtn = document.getElementById('case-item-add-btn');
    const caseItemsList = document.getElementById('case-items-list');

    // Load existing items from localStorage on startup, or fall back to an empty array
    let caseItems = JSON.parse(localStorage.getItem('kemei_case_scope')) || [];

    // Master function to sync the UI array state and save it to storage
    function renderCaseBuilder() {
        if (!caseItemsList) return;
        
        // Reset old content to prevent duplicate renders
        caseItemsList.innerHTML = '';

        caseItems.forEach((itemText, index) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.padding = '12px 16px';
            li.style.background = '#161616';
            li.style.border = '1px solid #222';
            li.style.fontSize = '0.9rem';

            li.innerHTML = `
                <span style="color: #eee; font-family: inherit;">• &nbsp; ${itemText}</span>
                <button class="remove-case-btn" data-index="${index}" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 0.8rem; font-family: inherit; letter-spacing: 0.5px; text-transform: uppercase; padding: 4px 8px;">[ Remove ]</button>
            `;
            caseItemsList.appendChild(li);
        });

        // Save current state array directly to localStorage cache
        localStorage.setItem('kemei_case_scope', JSON.stringify(caseItems));
    }

    // Initial load call to populate items when the client opens the page
    renderCaseBuilder();

    // Capture user input and push it into our state array
    if (caseAddBtn && caseInput) {
        caseAddBtn.addEventListener('click', () => {
            const secureValue = caseInput.value.trim();
            if (secureValue !== '') {
                caseItems.push(secureValue);
                caseInput.value = ''; // Clean input field
                renderCaseBuilder();
            }
        });
    }

    // Intercept click actions inside the list container to track specific dynamic remove handles
    if (caseItemsList) {
        caseItemsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-case-btn')) {
                const indexTarget = e.target.getAttribute('data-index');
                caseItems.splice(indexTarget, 1); // Slice selection cleanly from state array
                renderCaseBuilder();
            }
        });
    }
});