const { randomUUID } = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const writeContacts = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsAll = await listContacts();
  const contact = contactsAll.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contactsAll = await listContacts();
  const index = contactsAll.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contactsAll[index];

  contactsAll.splice(index, 1);

  await writeContacts(contactsAll);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contactsAll = await listContacts();
  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  contactsAll.push(newContact);
  await writeContacts(contactsAll);
  return newContact;
}

async function updateContact(id, body){
    const contactsAll = await listContacts();
    const index = contactsAll.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }

    contactsAll[index] = {
      ...contactsAll[index],
      ...body,
    };
  
    await writeContacts(contactsAll);
    return contactsAll[index];
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
  };