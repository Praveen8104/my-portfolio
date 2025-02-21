$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Full Stack Developer", "App Developer", "ServiceNow Developer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Full Stack Developer", "App Developer", "ServiceNow Developer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});


document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameInput = document.querySelector("input[placeholder='Name']");
    const emailInput = document.querySelector("input[placeholder='Email']");
    const subjectInput = document.querySelector("input[placeholder='Subject']");
    const messageInput = document.querySelector("textarea");

    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert("All fields are required!");
        return;
    }

    // Show loading state
    const submitButton = document.querySelector("button[type='submit']");
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
        const response = await fetch("https://portfolio-o6ug.onrender.com/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Your message has been sent successfully!");
            document.querySelector("form").reset(); // Reset form after success
        } else {
            throw new Error(result.message || "Failed to send message.");
        }
    } catch (error) {
        alert("Error sending message. Please try again later.");
        console.error("Error:", error);
    } finally {
        // Restore button state
        submitButton.textContent = "Send Message";
        submitButton.disabled = false;
    }
});
