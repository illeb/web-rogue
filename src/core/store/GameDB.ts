import Dexie from "dexie";

class MyAppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  contacts: Dexie.Table<IContact, number>; // number = type of the primkey
  //...other tables goes here...

  constructor () {
      super("web-rogue");
      /*this.version(1).stores({
        contacts: '++id, first, last',
        emails: '++id, contactId, type, email',
        phones: '++id, contactId, type, phone',);*/
  }
}

interface IContact {
  id?: number,
  first: string,
  last: string
}