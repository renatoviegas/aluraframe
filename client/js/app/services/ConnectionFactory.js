const ConnectionFactory = (function () {
  const config = {
    stores: ['negociacoes'],
    version: 1,
    dbName: 'aluraframe'
  };

  let connection;
  let close;

  return class ConnectionFactory {

    constructor() {
      throw new Error('Não é possivel criar instâncias de ConnectionFactory');
    }

    static getConnection() {

      return new Promise((resolve, reject) => {

        const openRequest = window.indexedDB.open(config.dbName, config.version);

        openRequest.onupgradeneeded = e => ConnectionFactory._createStores(e.target.result);

        openRequest.onsuccess = e => {
          if (!connection) {
            close = connection.close.bind(connection);
            connection.close = function () {
              throw new Error('Conexão não pode ser encerrada diretamente');
            }
            connection = e.target.result;
          }
          resolve(connection);
        }

        openRequest.onerror = e => {
          console.log(e.target.error);
          reject(e.target.error.name);
        };

      });

    }

    static _createStores(connection) {
      config.stores.forEach(store => {
        if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
        connection.createObjectStore(store, { autoincrement: true });
      });

    }

    static closeConnection() {
      if (!connection) return;

      close();
      connection = null;
    }

  }
})();
