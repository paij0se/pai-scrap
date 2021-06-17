function validateForm() {
    var x = document.forms["myForm"]["message"].value;
    if (x == "") {
      alert("no puedes enviar un mensaje vacio!");
      return false;
    }
  }