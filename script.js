document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cveSearchForm');
    const serviceInput = document.getElementById('serviceInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsList = document.getElementById('resultsList');
    const errorMessage = document.getElementById('errorMessage');
    const initialState = document.querySelector('.initial-state');
    const loadingState = document.querySelector('.loading-state');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const service = serviceInput.value.trim();
        
        if (service) {
            searchCVEs(service);
        }
    });
    
    function searchCVEs(service) {
        // Show loading state
        initialState.classList.add('hidden');
        loadingState.classList.remove('hidden');
        resultsList.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Clear previous results
        resultsList.innerHTML = '';
        
        // In a real implementation, this would be your Go backend endpoint
        const apiUrl = '/api/cves'; // Adjust this to match your Go endpoint
        
        // Using fetch API to call your Go backend
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ service: service })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            showError(error.message || 'An error occurred while fetching CVEs');
        });
    }
    
    function displayResults(cves) {
        loadingState.classList.add('hidden');
        
        if (!cves || cves.length === 0) {
            showError('No CVEs found for the specified service');
            return;
        }
        
        cves.forEach(cve => {
            const cveElement = createCVEElement(cve);
            resultsList.appendChild(cveElement);
        });
        
        resultsList.classList.remove('hidden');
    }
    
    function createCVEElement(cve) {
        const cveElement = document.createElement('div');
        cveElement.className = 'cve-item';
        
        // Determine score class based on CVSS score
        let scoreClass = '';
        if (cve.score >= 9) {
            scoreClass = 'score-critical';
        } else if (cve.score >= 7) {
            scoreClass = 'score-high';
        } else if (cve.score >= 4) {
            scoreClass = 'score-medium';
        } else {
            scoreClass = 'score-low';
        }
        
        cveElement.innerHTML = `
            <div class="cve-header">
                <span class="cve-id">${cve.id}</span>
                <span class="cve-score ${scoreClass}">${cve.score.toFixed(1)}</span>
            </div>
            <div class="cve-description">${cve.description}</div>
            <div class="cve-meta">
                <span>Published: ${formatDate(cve.published)}</span>
                <span>Last Modified: ${formatDate(cve.lastModified)}</span>
            </div>
        `;
        
        return cveElement;
    }
    
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    function showError(message) {
        loadingState.classList.add('hidden');
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});