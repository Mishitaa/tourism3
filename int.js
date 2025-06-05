// Function to send a Google Analytics event
function sendAnalyticsEvent(eventName, eventParams) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventParams);
        console.log(`GA4 Event Sent: ${eventName}`, eventParams); // For debugging
    } else {
        console.warn('Google Analytics gtag() function not found. Make sure the GA4 snippet is correctly installed.');
    }
}

// Track CTA button clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const eventName = this.dataset.analyticsEvent || 'button_click';
        const eventCategory = this.dataset.eventCategory || 'Uncategorized';
        const eventAction = this.dataset.eventAction || 'Click';
        const eventLabel = this.dataset.eventLabel || this.textContent.trim();

        sendAnalyticsEvent(eventName, {
            'event_category': eventCategory,
            'event_action': eventAction,
            'event_label': eventLabel
        });
    });
});

// Track destination details button clicks
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', function() {
        const destinationName = this.dataset.destinationName;
        const eventName = this.dataset.analyticsEvent || 'destination_details_view';

        sendAnalyticsEvent(eventName, {
            'event_category': 'Destination',
            'event_action': 'View Details',
            'event_label': destinationName,
            'destination_id': this.closest('.destination-card').dataset.destinationId
        });
    });
});

// Track contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission for demonstration

    const eventName = this.querySelector('button[type="submit"]').dataset.analyticsEvent || 'form_submission';
    const eventCategory = this.querySelector('button[type="submit"]').dataset.eventCategory || 'Form';
    const eventAction = this.querySelector('button[type="submit"]').dataset.eventAction || 'Submit';
    const eventLabel = 'Contact Form';

    sendAnalyticsEvent(eventName, {
        'event_category': eventCategory,
        'event_action': eventAction,
        'event_label': eventLabel
    });

    // In a real application, you would send the form data to a server here.
    // For now, we'll just log a success message and clear the form.
    alert('Message sent successfully! (Analytics event triggered)');
    this.reset();
});

// Example of tracking navigation clicks (optional)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        const pageSection = this.getAttribute('href').substring(1); // Get section ID
        sendAnalyticsEvent('navigation_click', {
            'event_category': 'Navigation',
            'event_action': 'Click',
            'event_label': `Mapsd to ${pageSection} section`
        });
    });
});

// You can add more event tracking for other interactions, e.g.:
// - Scrolling to a certain part of the page
// - Video plays
// - Image gallery views
// - Outbound link clicks
// - Downloads of brochures