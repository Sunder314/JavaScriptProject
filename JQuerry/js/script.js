$(document).ready(function () {
    
    $("#emailError").hide();
    $("#passwordError").hide();
  
   
    $("#loginForm").on("submit", function (event) {
      event.preventDefault(); 
  
      let isValid = true;
  
      
      const emailInput = $("#emailInput");
      const passwordInput = $("#passwordInput");
      const emailError = $("#emailError");
      const passwordError = $("#passwordError");
  
      
      emailError.hide();
      passwordError.hide();
  
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.val())) {
        emailError.text("Veuillez entrer une adresse email valide").show();
        isValid = false;
      }
  
      
      if (passwordInput.val().length < 8) {
        passwordError.text("Le mot de passe doit contenir au moins 8 caractères").show();
        isValid = false;
      }
  
      
      if (isValid) {
        
        const submitButton = $(this).find("button[type='submit']");
    
        const spinner = submitButton.find(".spinner-border");
        spinner.removeClass("d-none");
        submitButton.prop("disabled", true); 
  
        
        setTimeout(() => {
          spinner.addClass("d-none"); 
          submitButton.prop("disabled", false); 
          alert("Formulaire envoyé avec succès !");
  
          
          this.reset(); 
        }, 2000);
      }
    });
  });
  
