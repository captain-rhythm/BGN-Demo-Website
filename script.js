// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle mobile menu
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")

    // Update ARIA attributes
    const isExpanded = navMenu.classList.contains("active")
    navToggle.setAttribute("aria-expanded", isExpanded)
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
      navToggle.setAttribute("aria-expanded", "false")
    })
  })

  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        if (navLink) {
          navLink.classList.add("active")
          navLink.setAttribute("aria-current", "page")
        }
      }
    })
  }

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Update active nav link on scroll
  window.addEventListener("scroll", updateActiveNavLink)
  updateActiveNavLink() // Initial call
})

// Membership activation functionality
function activateMembership() {
  const memberName = "Rhythm Rahman"
  const memberId = document.getElementById("member-id").textContent
  const program = "Leadership Development Program 2023"

  const subject = encodeURIComponent("BGN Membership Activation Request")
  const body = encodeURIComponent(`Dear BYLC Team,

I would like to activate my BGN membership with the following details:

Name: ${memberName}
Member ID: ${memberId}
Program: ${program}
Request Date: ${new Date().toLocaleDateString()}

Please confirm my membership activation and provide any additional steps required.

Best regards,
${memberName}`)

  const mailtoLink = `mailto:bylc@bylc.org?subject=${subject}&body=${body}`
  window.location.href = mailtoLink
}

// Print membership card functionality
function printMembershipCard() {
  // Add print-specific class to body
  document.body.classList.add("printing")

  // Trigger print dialog
  window.print()

  // Remove print class after printing
  setTimeout(() => {
    document.body.classList.remove("printing")
  }, 1000)
}

// Contact form functionality
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Clear previous errors
      clearFormErrors()

      // Validate form
      const isValid = validateContactForm()

      if (isValid) {
        // Simulate form submission
        submitContactForm()
      }
    })
  }
})

function validateContactForm() {
  let isValid = true

  // Name validation
  const name = document.getElementById("name")
  if (!name.value.trim()) {
    showFieldError("name", "Name is required")
    isValid = false
  }

  // Email validation
  const email = document.getElementById("email")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    showFieldError("email", "Email is required")
    isValid = false
  } else if (!emailRegex.test(email.value)) {
    showFieldError("email", "Please enter a valid email address")
    isValid = false
  }

  // Subject validation
  const subject = document.getElementById("subject")
  if (!subject.value) {
    showFieldError("subject", "Please select a subject")
    isValid = false
  }

  // Message validation
  const message = document.getElementById("message")
  if (!message.value.trim()) {
    showFieldError("message", "Message is required")
    isValid = false
  } else if (message.value.trim().length < 10) {
    showFieldError("message", "Message must be at least 10 characters long")
    isValid = false
  }

  return isValid
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId)
  const errorElement = document.getElementById(`${fieldId}-error`)

  field.classList.add("error")
  errorElement.textContent = message
  errorElement.setAttribute("aria-live", "polite")
}

function clearFormErrors() {
  const errorElements = document.querySelectorAll(".form-error")
  const inputElements = document.querySelectorAll(".form-input")

  errorElements.forEach((error) => {
    error.textContent = ""
    error.removeAttribute("aria-live")
  })

  inputElements.forEach((input) => {
    input.classList.remove("error")
  })
}

function submitContactForm() {
  const submitButton = document.querySelector('#contact-form button[type="submit"]')
  const originalText = submitButton.textContent

  // Show loading state
  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Show success message
    showSuccessMessage()

    // Reset form
    document.getElementById("contact-form").reset()

    // Reset button
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
}

function showSuccessMessage() {
  // Create success message element
  const successMessage = document.createElement("div")
  successMessage.className = "success-message"
  successMessage.innerHTML = `
        <div style="
            background-color: var(--color-success);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-lg);
            text-align: center;
            font-weight: 600;
        ">
            ✓ Thank you! Your message has been sent successfully.
        </div>
    `

  // Insert before form
  const form = document.getElementById("contact-form")
  form.parentNode.insertBefore(successMessage, form)

  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove()
  }, 5000)

  // Scroll to success message
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" })
}

// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".event-card, .contact-item, .membership-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Keyboard navigation improvements
document.addEventListener("keydown", (e) => {
  // Escape key closes mobile menu
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu")
    const navToggle = document.getElementById("nav-toggle")

    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
      navToggle.setAttribute("aria-expanded", "false")
      navToggle.focus()
    }
  }
})

// Copy member ID functionality
document.addEventListener("DOMContentLoaded", () => {
  const memberId = document.getElementById("member-id")

  if (memberId) {
    memberId.style.cursor = "pointer"
    memberId.title = "Click to copy Member ID"

    memberId.addEventListener("click", function () {
      navigator.clipboard
        .writeText(this.textContent)
        .then(() => {
          // Show temporary feedback
          const originalText = memberId.textContent
          memberId.textContent = "Copied!"
          memberId.style.color = "var(--color-success)"

          setTimeout(() => {
            memberId.textContent = originalText
            memberId.style.color = ""
          }, 1500)
        })
        .catch(() => {
          console.log("Failed to copy member ID")
        })
    })
  }
})
