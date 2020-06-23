const dbPromised = idb.open("premier-league-azardi", 1, function (upgradeDb) {
  const favoritesObjectStore = upgradeDb.createObjectStore("favorites", {
    keyPath: "id"
  });
  favoritesObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveFavorite(data) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("favorites", "readwrite");
      const store = tx.objectStore("favorites");
      store.add(data);
      return tx.complete;
    })
    .then(function () {
      console.log("Data berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("favorites", "readonly");
        const store = tx.objectStore("favorites");
        return store.getAll();
      })
      .then(function (favorites) {
        resolve(favorites);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("favorites", "readonly");
        const store = tx.objectStore("favorites");
        return store.get(parseInt(id));
      })
      .then(function (favorites) {
        if (favorites !== undefined) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
}

function deleteById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised.then(function (db) {
      const tx = db.transaction('favorites', 'readwrite');
      const store = tx.objectStore('favorites');
      store.delete(parseInt(id));
      return tx.complete;
    }).then(function () {
      resolve(true);
    });
  });
}