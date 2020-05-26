/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

export const noteModel: any = {};

// create note
noteModel.createNote = (data: any, noteCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await noteCollection.insertOne(data);
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// update note
noteModel.updateNote = (uid: string, data: any, noteCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('update note');
      const res = await noteCollection.updateOne({ uid: uid }, { $set: data });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// delete note
noteModel.deleteNote = (uid: string, noteCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('delete note');
      const deleteItem = noteCollection.deleteMany({ uid: uid });
      resolve(deleteItem);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

//getNote
noteModel.getNote = (data: any, noteCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('get note');
      noteCollection
        .find({
          $or: [{
            "sender": data.sender
          }, {
            "receiver": data.sender
          }]
        })
        .project({ _id: 0 })
        .toArray()
        .then((note: any) => {
          resolve(note);
        })
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

noteModel.getNoteByUid = (uid: string, noteCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('get note');
      const res = noteCollection.findOne({ uid: uid });
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
