function AddressBook(){
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact=function(contact){
  this.contacts.push(contact);
  contact.id = this.assignId();
  //console.log(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i].id == id) {
      delete this.contacts[i];
      return true;
    }
  }
  return false;
}

function Contact(firstName, lastName, phoneNumber){
  this.firstName=firstName,
  this.lastName = lastName,
  this.phoneNUmber = phoneNumber
}

Contact.prototype.fullName = function(){
  return ths.firstName + " " + this.lastName;
}


var addressBook = new AddressBook();
var contact = new Contact("Sheila", "Stephen", "789654345");
var contact2 = new Contact("Joannah", "Stephen", "789456345");
addressBook.addContact(contact);
addressBook.addContact(contact2);
