const fs = require('fs/promises')
const path = require('path');
const {nanoid} = require("nanoid");


const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contact) => {
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

const listContacts = async () => {
  	try {
    const data = await fs.readFile(contactsPath);
		return JSON.parse(data);
	} catch (err) {
		err.message = "listContacts error";
		throw new Error(err.message);
	}
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({id}) => id === contactId);
  return result || null
}

const addContact = async ({name,email,number}) => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      number,
        
    };
    contacts.push(newContact);
    await updateContacts(contacts)
    return newContact;
}

const updateContact = async (id, {name,email,number}) => {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    contacts[index] = {id, name, email,number};
    await updateContacts(contacts);
    return contacts[index];
}
const removeContact = async (id) => {

    const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  
    if(index === -1){
        return null;
    }
  const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
