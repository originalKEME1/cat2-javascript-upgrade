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
});