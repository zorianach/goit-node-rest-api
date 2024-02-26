// const { randomUUID } = require("node:crypto");
// const fs = require("node:fs/promises");
// const path = require("node:path");

// import { randomUUID } from 'crypto';
// import { promises as fs } from 'fs';
// import path from 'path';

// const contactsPath = path.join(__dirname, "../db/contacts.json");

// const writeContacts = async (contacts) => {
//   return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

// export async function listContacts() {
//   const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
//   return JSON.parse(data);
// }

// export async function getContactById(contactId) {
//   const contactsAll = await listContacts();
//   const contact = contactsAll.find((contact) => contact.id === contactId);
//   return contact || null;
// }

// export async function removeContact(contactId) {
//   const contactsAll = await listContacts();
//   const index = contactsAll.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const removedContact = contactsAll[index];

//   contactsAll.splice(index, 1);

//   await writeContacts(contactsAll);
//   return removedContact;
// }

// export async function addContact(name, email, phone) {
//   const contactsAll = await listContacts();
//   const newContact = {
//     id: randomUUID(),
//     name,
//     email,
//     phone,
//   };

//   contactsAll.push(newContact);
//   await writeContacts(contactsAll);
//   return newContact;
// }

// export async function updateContact(id, body){
//     const contactsAll = await listContacts();
//     const index = contactsAll.findIndex((contact) => contact.id === id);
//     if (index === -1) {
//       return null;
//     }

//     contactsAll[index] = {
//       ...contactsAll[index],
//       ...body,
//     };
  
//     await writeContacts(contactsAll);
//     return contactsAll[index];
// }

// export default {
//     listContacts,
//     getContactById,
//     removeContact,
//     addContact,
//     updateContact
//   };