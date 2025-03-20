(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//tax switch script

let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (info of taxInfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});


// search Options script file
// Select all elements with the class 'filter'
// const filterDivs = document.querySelectorAll('.filter');

// // Add a click event listener to each div
// filterDivs.forEach(div => {
//     div.addEventListener('click', function () {
//         // Get the route from the data-route attribute
//         const route = div.getAttribute('data-route');
//         // Navigate to the specified route
//         window.location.href = `/listings/${route}`;
//     });
// });

// const filterDivs = document.querySelectorAll('.filter');

//     filterDivs.forEach(div => {
//         div.addEventListener('click', function () {
//             const route = div.getAttribute('data-route');
//             console.log("Clicked route:", route);
//             window.location.href = `/listings/search/${route}`;
//         });
//     });

const filterDivs = document.querySelectorAll('.filter');

filterDivs.forEach(div => {
  div.addEventListener('click', function () {
    const route = div.getAttribute('data-route');
    console.log("Clicked route:", route); // Debugging
    if (!route) {
      window.location.href = `/listings`;
      return; // Prevent navigation if route is invalid
    }
    window.location.href = `/listings/search/${route}`;
  });
});


// footer terms and conditions 
// Get the modal elements
var privacyModal = document.getElementById("privacy-modal");
var termsModal = document.getElementById("terms-modal");

// Get the links that open the modals
var privacyLink = document.getElementById("privacy-link");
var termsLink = document.getElementById("terms-link");

// Get the <span> elements that close the modals
var closeButtons = document.getElementsByClassName("close");

// When the user clicks on the Privacy link, open the Privacy modal
privacyLink.onclick = function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    privacyModal.style.display = "flex";
}

// When the user clicks on the Terms link, open the Terms modal
termsLink.onclick = function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    termsModal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        privacyModal.style.display = "none";
        termsModal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == privacyModal) {
        privacyModal.style.display = "none";
    }
    if (event.target == termsModal) {
        termsModal.style.display = "none";
    }
}