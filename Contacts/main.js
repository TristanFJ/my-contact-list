let contactForm = document.getElementById("new-contact-form")
let contactList = document.getElementById("contact-list")
let contactId = generateId()
let contacts = []
let contact = {}
loadContacts()

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target
  let contactName = form.contactName.value 
  let contactPhone = form.contactPhone.value
  let contactEmergency = form.contactEmergency.value
  let contactId = generateId()

  newContact = contacts.find(contact => contact.name == contactName, contact.phone == contactPhone, contact.emergency == contactEmergency)
  
if(!newContact) {
    if (document.getElementById('emergency').checked) {
      newContact = {id: contactId, name: contactName, phone: contactPhone, emergency: contactEmergency + " emergency"}
    } else {
      newContact = {id: contactId, name: contactName, phone: contactPhone, emergency: "non-emergency"}
    }
    contacts.push(newContact)
    saveContacts()
}
form.reset()
toggleAddContactForm()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
 window.localStorage.setItem("contacts", JSON.stringify(contacts))
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"))
  if(contactsData) {
    contacts = contactsData
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */ //
function drawContacts() {
let template = ""

contacts.forEach(contact => {
  template += `
  <div class="card mt-1 mb-1">
  <h3 class="mt-1 mb-1">${contact.name}</h3>
  <div class="d-flex space-between">
    <p>
      <i class="fa fa-fw fa-phone"></i>
      <span>${contact.phone}</span>
    </p>
    <i class="action fa fa-trash text-danger"></i>
  </div>
  
  ${contact.emergency}
</div>
`
})
document.getElementById("contact-list").innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */ // TODO 
function removeContact(contactId) {
let index = contacts.findIndex(id => id === contactId)
console.log(index)
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  if(contactForm.classList.contains("hidden")){
    contactForm.classList.remove("hidden")
  }else{
    contactForm.classList.add("hidden")
  } 
}

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 1000) + "-" + Math.floor(Math.random() * 1000)
}


loadContacts()
drawContacts()