
(function () {
    const open = document.getElementById('contact-open');
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.getElementById('contact-close');
    const cancelBtn = document.getElementById('contact-cancel');
    const form = document.getElementById('contact-form');

    function show() {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        // focus first input
        setTimeout(() => document.getElementById('name').focus(), 50);
    }
    function hide() {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        open.focus();
    }

    open.addEventListener('click', function (e) { e.preventDefault(); show(); });
    closeBtn.addEventListener('click', hide);
    cancelBtn.addEventListener('click', hide);

    // Close when clicking backdrop
    modal.addEventListener('click', function (e) {
        if (e.target === modal) hide();
    });

    // Handle form submit (replace with real submission logic)
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        // send using EmailJS (https://www.emailjs.com/). Replace the IDs below.
        const serviceId = 'service_3ziaseg';
        const templateId = 'template_zwcihvc';
        const userId = 'Q4gJ_YyM5Xj1e-qqW';

        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: userId,
                template_params: {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message
                }
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Email send failed');
            console.log('Email sent successfully');
        })
        .catch(err => {
            console.error('Email send error:', err);
            alert('Failed to send message. Please try again later.');
        });
        // placeholder behavior: log and close modal
        console.log('Contact form submitted', data);
        // you can replace the following with fetch() to your endpoint
        alert('Message sent. Thank you!');
        form.reset();
        hide();
    });

    // close with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') hide();
    });
})();
