// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Simulate live dashboard data updates
    simulateDashboardData();
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Simulate real-time sensor data updates
function simulateDashboardData() {
    const tempValue = document.getElementById('temp-value');
    const soilValue = document.getElementById('soil-value');
    const lightValue = document.getElementById('light-value');
    
    const tempStatus = document.getElementById('temp-status');
    const soilStatus = document.getElementById('soil-status');
    const lightStatus = document.getElementById('light-status');
    
    const pumpStatus = document.getElementById('pump-status');
    const fanStatus = document.getElementById('fan-status');
    const curtainStatus = document.getElementById('curtain-status');

    function updateValues() {
        // Generate realistic sensor values
        const temperature = (20 + Math.random() * 15).toFixed(1); // 20-35°C
        const soilMoisture = Math.floor(300 + Math.random() * 400); // 300-700 units
        const lightLevel = Math.floor(200 + Math.random() * 600); // 200-800 units

        // Update display values
        if (tempValue) tempValue.textContent = temperature;
        if (soilValue) soilValue.textContent = soilMoisture;
        if (lightValue) lightValue.textContent = lightLevel;

        // Update status indicators
        updateTempStatus(parseFloat(temperature), tempStatus, fanStatus);
        updateSoilStatus(soilMoisture, soilStatus, pumpStatus);
        updateLightStatus(lightLevel, lightStatus, curtainStatus);

        // Update LCD display to match
        updateLCDDisplay(temperature, soilMoisture, lightLevel);
    }

    function updateTempStatus(temp, statusEl, actuatorEl) {
        if (!statusEl || !actuatorEl) return;
        
        if (temp > 30) {
            statusEl.textContent = "Too Hot - Cooling";
            statusEl.style.background = "rgba(220, 53, 69, 0.8)";
            setActuatorStatus(actuatorEl, true);
        } else if (temp < 18) {
            statusEl.textContent = "Too Cold";
            statusEl.style.background = "rgba(23, 162, 184, 0.8)";
            setActuatorStatus(actuatorEl, false);
        } else {
            statusEl.textContent = "Normal Range";
            statusEl.style.background = "rgba(46, 139, 87, 0.8)";
            setActuatorStatus(actuatorEl, false);
        }
    }

    function updateSoilStatus(soil, statusEl, actuatorEl) {
        if (!statusEl || !actuatorEl) return;
        
        if (soil < 400) {
            statusEl.textContent = "Dry - Watering";
            statusEl.style.background = "rgba(220, 53, 69, 0.8)";
            setActuatorStatus(actuatorEl, true);
        } else if (soil > 600) {
            statusEl.textContent = "Very Wet";
            statusEl.style.background = "rgba(23, 162, 184, 0.8)";
            setActuatorStatus(actuatorEl, false);
        } else {
            statusEl.textContent = "Adequate";
            statusEl.style.background = "rgba(46, 139, 87, 0.8)";
            setActuatorStatus(actuatorEl, false);
        }
    }

    function updateLightStatus(light, statusEl, actuatorEl) {
        if (!statusEl || !actuatorEl) return;
        
        if (light < 300) {
            statusEl.textContent = "Dark - Opening Curtains";
            statusEl.style.background = "rgba(220, 53, 69, 0.8)";
            setActuatorStatus(actuatorEl, true);
        } else if (light > 700) {
            statusEl.textContent = "Very Bright";
            statusEl.style.background = "rgba(255, 193, 7, 0.8)";
            setActuatorStatus(actuatorEl, false);
        } else {
            statusEl.textContent = "Bright";
            statusEl.style.background = "rgba(46, 139, 87, 0.8)";
            setActuatorStatus(actuatorEl, false);
        }
    }

    function setActuatorStatus(actuatorEl, isOn) {
        const indicator = actuatorEl.querySelector('.status-indicator');
        if (indicator) {
            indicator.className = `status-indicator ${isOn ? 'on' : 'off'}`;
        }
    }

    function updateLCDDisplay(temp, soil, light) {
        const lcdLines = document.querySelectorAll('.lcd-line');
        if (lcdLines.length >= 2) {
            lcdLines[0].textContent = `T:${temp}°C S:${soil}`;
            lcdLines[1].textContent = `L:${light}`;
        }
    }

    // Initial update
    updateValues();
    
    // Update every 3 seconds to simulate Arduino's 3-second delay
    setInterval(updateValues, 3000);
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    
    // Simple form validation
    if (!name || !email) {
        showNotification('Please fill in your name and email.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your interest! We\'ll contact you soon.', 'success');
    e.target.reset();
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(45deg, #28a745, #34ce57)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(45deg, #dc3545, #e74c3c)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, #17a2b8, #20c997)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    const specCategories = document.querySelectorAll('.specs-category');
    const sensorPanels = document.querySelectorAll('.sensor-panel');
    
    [...featureCards, ...specCategories, ...sensorPanels].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Device preview interaction
document.addEventListener('DOMContentLoaded', function() {
    const devicePreview = document.querySelector('.device-preview');
    
    if (devicePreview) {
        devicePreview.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(-10deg) rotateX(5deg)';
            this.style.transition = 'transform 0.6s ease';
        });
        
        devicePreview.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
});