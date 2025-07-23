// Global variables
let currentInvestmentType = 'lumpsum';

// Google Sheets integration URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzHFYVpHHEtXWM21X0UIYDUoMLI0BzfyX7onH5zg0e4IeJsnfY9G9qitSDXYmG6Q/exec';

// Tab switching functionality
window.switchTab = function(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show corresponding content
    if (tabName === 'calculator') {
        document.getElementById('calculator').classList.add('active');
    } else if (tabName === 'survey') {
        document.getElementById('survey-tab').classList.add('active');
    }
    
    console.log('Tab switched successfully');
};

// Investment type toggle
window.setInvestmentType = function(type) {
    console.log('Setting investment type:', type);
    
    currentInvestmentType = type;
    
    // Update button states
    const lumpsumBtn = document.getElementById('lumpsum-btn');
    const sipBtn = document.getElementById('sip-btn');
    
    if (lumpsumBtn && sipBtn) {
        lumpsumBtn.classList.toggle('active', type === 'lumpsum');
        sipBtn.classList.toggle('active', type === 'sip');
        
        // Show/hide appropriate input fields
        const lumpsumInput = document.getElementById('lumpsum-input');
        const sipInput = document.getElementById('sip-input');
        
        if (lumpsumInput && sipInput) {
            lumpsumInput.style.display = type === 'lumpsum' ? 'block' : 'none';
            sipInput.style.display = type === 'sip' ? 'block' : 'none';
        }
        
        // Recalculate
        calculateInvestment();
        console.log('Investment type changed successfully');
    } else {
        console.error('Investment type buttons not found');
    }
};

// Investment calculator
window.calculateInvestment = function() {
    console.log('Calculating investment...');
    
    try {
        const rateInput = document.getElementById('rate');
        const yearsInput = document.getElementById('years');
        
        if (!rateInput || !yearsInput) {
            console.error('Rate or years input not found');
            return;
        }
        
        const rate = parseFloat(rateInput.value) || 12;
        const years = parseFloat(yearsInput.value) || 10;
        
        let totalValue, totalInvested, totalGains;
        
        if (currentInvestmentType === 'lumpsum') {
            const principalInput = document.getElementById('principal');
            if (!principalInput) {
                console.error('Principal input not found');
                return;
            }
            const principal = parseFloat(principalInput.value) || 100000;
            totalInvested = principal;
            totalValue = principal * Math.pow(1 + rate / 100, years);
        } else {
            const monthlyInput = document.getElementById('monthly');
            if (!monthlyInput) {
                console.error('Monthly input not found');
                return;
            }
            const monthly = parseFloat(monthlyInput.value) || 5000;
            const monthlyRate = rate / 100 / 12;
            const months = years * 12;
            totalInvested = monthly * months;
            
            if (monthlyRate === 0) {
                totalValue = totalInvested;
            } else {
                totalValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
            }
        }
        
        totalGains = totalValue - totalInvested;
        const roi = (totalGains / totalInvested) * 100;
        
        // Update display
        const totalValueEl = document.getElementById('total-value');
        const totalInvestedEl = document.getElementById('total-invested');
        const totalGainsEl = document.getElementById('total-gains');
        const roiEl = document.getElementById('roi');
        
        if (totalValueEl && totalInvestedEl && totalGainsEl && roiEl) {
            totalValueEl.textContent = formatCurrency(totalValue);
            totalInvestedEl.textContent = formatCurrency(totalInvested);
            totalGainsEl.textContent = formatCurrency(totalGains);
            roiEl.textContent = roi.toFixed(1) + '%';
            
            // Update AI insights
            updateAIInsights(rate, years, totalValue);
            console.log('Calculation completed successfully');
        } else {
            console.error('Result display elements not found');
        }
        
    } catch (error) {
        console.error('Error in calculateInvestment:', error);
    }
};

// Format currency
function formatCurrency(amount) {
    if (amount >= 10000000) {
        return '₹' + (amount / 10000000).toFixed(1) + ' Cr';
    } else if (amount >= 100000) {
        return '₹' + (amount / 100000).toFixed(1) + ' L';
    } else {
        return '₹' + amount.toLocaleString('en-IN');
    }
}

// Update AI insights and draw chart
function updateAIInsights(rate, years, totalValue) {
    const riskElement = document.getElementById('risk-level');
    const inflationElement = document.getElementById('inflation-value');
    const recommendationElement = document.getElementById('recommendation');
    
    // Risk assessment
    let riskLevel = '';
    if (rate <= 8) {
        riskLevel = 'Low Risk - Conservative approach with stable returns';
    } else if (rate <= 12) {
        riskLevel = 'Medium Risk - Balanced growth potential';
    } else if (rate <= 16) {
        riskLevel = 'High Risk - Aggressive growth strategy';
    } else {
        riskLevel = 'Very High Risk - Speculative investments';
    }
    if (riskElement) riskElement.textContent = riskLevel;
    
    // Inflation adjustment (assuming 6% inflation)
    const inflationRate = 6;
    const realValue = totalValue / Math.pow(1 + inflationRate / 100, years);
    if (inflationElement) inflationElement.textContent = formatCurrency(realValue);
    
    // Recommendations
    let recommendation = '';
    if (rate <= 8) {
        recommendation = 'Consider adding equity exposure for better long-term growth';
    } else if (rate <= 12) {
        recommendation = 'Well-balanced approach. Consider SIP for rupee cost averaging';
    } else if (rate <= 16) {
        recommendation = 'Good growth potential. Ensure emergency fund is in place';
    } else {
        recommendation = 'High returns expected. Diversify to manage risk effectively';
    }
    if (recommendationElement) recommendationElement.textContent = recommendation;
    
    // Draw the investment growth chart
    drawGrowthChart();
}

// Draw investment growth chart
function drawGrowthChart() {
    const canvas = document.getElementById('growth-chart');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const rate = parseFloat(document.getElementById('rate').value) || 12;
    const years = parseFloat(document.getElementById('years').value) || 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate year-by-year values
    const yearlyData = [];
    let currentValue = 0;
    let currentInvested = 0;
    
    for (let year = 0; year <= years; year++) {
        if (currentInvestmentType === 'lumpsum') {
            const principal = parseFloat(document.getElementById('principal').value) || 100000;
            currentInvested = principal;
            currentValue = year === 0 ? principal : principal * Math.pow(1 + rate / 100, year);
        } else {
            const monthly = parseFloat(document.getElementById('monthly').value) || 5000;
            const monthlyRate = rate / 100 / 12;
            const months = year * 12;
            currentInvested = monthly * months;
            
            if (year === 0) {
                currentValue = 0;
                currentInvested = 0;
            } else if (monthlyRate === 0) {
                currentValue = currentInvested;
            } else {
                currentValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
            }
        }
        
        yearlyData.push({
            year: year,
            invested: currentInvested,
            value: currentValue
        });
    }
    
    // Chart dimensions
    const padding = 60;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    
    // Find max value for scaling
    const maxValue = Math.max(...yearlyData.map(d => d.value));
    const maxInvested = Math.max(...yearlyData.map(d => d.invested));
    const chartMax = Math.max(maxValue, maxInvested) * 1.1;
    
    if (chartMax === 0) return; // Avoid division by zero
    
    // Helper functions
    const getX = (year) => padding + (year / years) * chartWidth;
    const getY = (value) => padding + chartHeight - (value / chartMax) * chartHeight;
    
    // Set styles
    ctx.strokeStyle = '#e1e5e9';
    ctx.lineWidth = 1;
    
    // Draw grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (i / 5) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();
        
        // Y-axis labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        const value = (chartMax * (5 - i)) / 5;
        ctx.fillText(formatCurrency(value), padding - 10, y + 4);
    }
    
    // Draw vertical grid lines and X-axis labels
    for (let year = 0; year <= years; year += Math.max(1, Math.floor(years / 10))) {
        const x = getX(year);
        ctx.strokeStyle = '#e1e5e9';
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, padding + chartHeight);
        ctx.stroke();
        
        // X-axis labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Year ${year}`, x, padding + chartHeight + 20);
    }
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();
    
    // Draw invested amount line (blue)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    yearlyData.forEach((point, index) => {
        const x = getX(point.year);
        const y = getY(point.invested);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw total value line (green)
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.beginPath();
    yearlyData.forEach((point, index) => {
        const x = getX(point.year);
        const y = getY(point.value);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Fill area between lines (gains)
    ctx.fillStyle = 'rgba(5, 150, 105, 0.1)';
    ctx.beginPath();
    yearlyData.forEach((point, index) => {
        const x = getX(point.year);
        const yInvested = getY(point.invested);
        
        if (index === 0) {
            ctx.moveTo(x, yInvested);
        } else {
            ctx.lineTo(x, yInvested);
        }
    });
    
    // Complete the area
    for (let i = yearlyData.length - 1; i >= 0; i--) {
        const point = yearlyData[i];
        const x = getX(point.year);
        const yValue = getY(point.value);
        ctx.lineTo(x, yValue);
    }
    ctx.closePath();
    ctx.fill();
    
    // Add data points
    yearlyData.forEach(point => {
        const x = getX(point.year);
        
        // Invested amount point (blue)
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, getY(point.invested), 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Total value point (green)
        ctx.fillStyle = '#059669';
        ctx.beginPath();
        ctx.arc(x, getY(point.value), 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Add legend
    const legendY = padding + chartHeight + 45;
    
    // Invested amount legend
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(padding, legendY, 15, 3);
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Amount Invested', padding + 25, legendY + 10);
    
    // Total value legend
    ctx.fillStyle = '#059669';
    ctx.fillRect(padding + 150, legendY, 15, 3);
    ctx.fillStyle = '#333';
    ctx.fillText('Total Value', padding + 175, legendY + 10);
    
    // Chart title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Investment Growth Over Time', canvas.width / 2, 30);
}

// Save calculation and share via WhatsApp
window.saveCalculation = function() {
    console.log('Save calculation function called');
    
    const calculationData = {
        type: currentInvestmentType,
        principal: document.getElementById('principal').value,
        monthly: document.getElementById('monthly').value,
        rate: document.getElementById('rate').value,
        years: document.getElementById('years').value,
        totalValue: document.getElementById('total-value').textContent,
        totalGains: document.getElementById('total-gains').textContent,
        roi: document.getElementById('roi').textContent,
        timestamp: new Date().toISOString()
    };
    
    // Create WhatsApp message
    const investmentType = currentInvestmentType === 'lumpsum' ? 'Lump Sum' : 'SIP';
    const amount = currentInvestmentType === 'lumpsum' 
        ? `₹${parseFloat(document.getElementById('principal').value).toLocaleString('en-IN')}`
        : `₹${parseFloat(document.getElementById('monthly').value).toLocaleString('en-IN')}/month`;
    
    const message = `🎯 *Investment Calculation Request*
            
📊 *Investment Details:*
• Type: ${investmentType}
• Amount: ${amount}
• Expected Return: ${calculationData.rate}% annually
• Period: ${calculationData.years} years

💰 *Projected Results:*
• Total Value: ${calculationData.totalValue}
• Total Gains: ${calculationData.totalGains}
• ROI: ${calculationData.roi}

🤝 *Request:* Please call me back within 24 hours for expert investment advice and personalized portfolio recommendations.

Thank you!`;

    // WhatsApp share with your business number
    const phoneNumber = "+919453561588";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Store calculation data
    window.savedCalculations = window.savedCalculations || [];
    window.savedCalculations.push(calculationData);
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    console.log('WhatsApp opened successfully');
};

// Mobile menu functions
window.toggleMobileMenu = function() {
    console.log('Toggling mobile menu');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        console.log('Mobile menu toggled');
    } else {
        console.error('Mobile menu element not found');
    }
};

window.closeMobileMenu = function() {
    console.log('Closing mobile menu');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        console.log('Mobile menu closed');
    } else {
        console.error('Mobile menu element not found');
    }
};

// Google Sheets integration
async function submitToGoogleSheets(data) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return true;
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Test if key elements exist
    const calculator = document.getElementById('calculator');
    const surveyTab = document.getElementById('survey-tab');
    const principalInput = document.getElementById('principal');
    
    console.log('Calculator element:', calculator ? 'Found' : 'Not found');
    console.log('Survey tab element:', surveyTab ? 'Found' : 'Not found');
    console.log('Principal input:', principalInput ? 'Found' : 'Not found');
    
    // Initialize calculator
    try {
        calculateInvestment();
        console.log('Initial calculation completed');
    } catch (error) {
        console.error('Error in initial calculation:', error);
    }
    
    // Test WhatsApp function
    window.testWhatsApp = function() {
        console.log('Testing WhatsApp function...');
        saveCalculation();
    };
    
    console.log('Initialization complete. Try typing: testWhatsApp() in console to test WhatsApp');
    
    // Form submission handler
    const form = document.getElementById('investmentSurvey');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = '📤 Submitting...';
            
            const formData = new FormData(e.target);
            const data = {};
            
            // Process form data
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            
            // Get selected interests
            const interests = [];
            document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
                interests.push(checkbox.value);
            });
            data.interests = interests.join(', ');
            
            // Add timestamp
            data.timestamp = new Date().toLocaleString('en-IN');
            data.submissionDate = new Date().toISOString().split('T')[0];
            
            // Prepare data for Google Sheets (flat structure)
            const sheetData = {
                timestamp: data.timestamp,
                submissionDate: data.submissionDate,
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                phone: data.phone || '',
                age: data.age || '',
                experience: data.experience || '',
                investmentAmount: data.investmentAmount || '',
                interests: data.interests || '',
                riskTolerance: data.riskTolerance || '',
                goals: data.goals || '',
                features: data.features || ''
            };
            
            try {
                // Submit to Google Sheets
                const success = await submitToGoogleSheets(sheetData);
                
                if (success) {
                    // Store data locally as backup
                    window.surveyData = window.surveyData || [];
                    window.surveyData.push(data);
                    
                    // Show success message
                    document.getElementById('successMessage').style.display = 'block';
                    document.getElementById('errorMessage').style.display = 'none';
                    
                    // Reset form
                    e.target.reset();
                    
                    // Scroll to success message
                    document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
                    
                    console.log('Survey data saved:', data);
                    
                    // Create WhatsApp message for follow-up
                    const whatsappMessage = `🎯 *New Investment Inquiry*

👤 *Client Details:*
• Name: ${data.firstName} ${data.lastName}
• Email: ${data.email}
• Phone: ${data.phone || 'Not provided'}

💼 *Investment Profile:*
• Experience: ${data.experience || 'Not specified'}
• Investment Range: ${data.investmentAmount || 'Not specified'}
• Risk Tolerance: ${data.riskTolerance || 'Not specified'}
• Interests: ${data.interests || 'None selected'}

🎯 *Goals:* ${data.goals || 'Not specified'}

📋 *Preferred Features:* ${data.features || 'Not specified'}

⏰ *Submitted:* ${data.timestamp}

📞 *Action Required:* Please call back within 24 hours for consultation.`;

                    // Add WhatsApp notification button (optional)
                    setTimeout(() => {
                        if (confirm('📱 Would you like to send a notification to our investment team via WhatsApp for faster response?')) {
                            const phoneNumber = "+919453561588";
                            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                            window.open(whatsappURL, '_blank');
                        }
                    }, 2000);
                    
                    // Hide success message after 8 seconds
                    setTimeout(() => {
                        document.getElementById('successMessage').style.display = 'none';
                    }, 8000);
                    
                } else {
                    throw new Error('Failed to submit to Google Sheets');
                }
                
            } catch (error) {
                console.error('Submission error:', error);
                
                // Show error message
                document.getElementById('errorMessage').style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    document.getElementById('errorMessage').style.display = 'none';
                }, 5000);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && menuBtn && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});
