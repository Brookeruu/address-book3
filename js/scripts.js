function AddressBook(){
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact=function(contact){
  contact.id = this.assignId();
  this.contacts.push(contact);
  //console.log(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  }
  return false;
}


// Business Logic for Contacts -------

function Contact(firstName, lastName, phoneNumber, email, homeAddress, workAddress){
  this.firstName=firstName,
  this.lastName = lastName,
  this.phoneNUmber = phoneNumber,
  this.email = email,
  this.homeAddress = homeAddress,
  this.workAddress = workAddress
  // this.email = email
}


// function Address(home,work){
//   this.homeAdress = home,
//   this.workAddress = work
// }


Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}


// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + " " + contact.email + " " + contact.homeAddress + " " + contact.workAddress + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".address").html(contact.homeAddress);
  $(".address").html(contact.workAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}


function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
    $("#buttons").on("click", ".deleteButton", function() {
   addressBook.deleteContact(this.id);
   $("#show-contact").hide();
   displayContactDetails(addressBook);
  });
};


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedHomeAddress = $("input#new-address").val();
    var inputtedWorkAddress = $("input#new-address1").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-address").val("");
    $("input#new-address1").val("");


    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedHomeAddress, inputtedWorkAddress);
    addressBook.addContact(newContact);
    //console.log(addressBook.contacts);
    displayContactDetails(addressBook);
  });
});
