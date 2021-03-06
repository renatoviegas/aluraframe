const ConnectionFactory = (function () {
  
  const config = {
    stores: ['negociacoes'],
    version: 4,
    dbName: 'aluraframe'
  };

  let connection = null;
  let close = null;

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
            connection = e.target.result;
            close = connection.close.bind(connection);
            connection.close = function () {
              throw new Error('Conexão não pode ser encerrada diretamente');
            }
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
        connection.createObjectStore(store, { autoIncrement: true });
      });

    }

    static closeConnection() {
      if (!connection) return;

      close();
      connection = null;
    }

  }
})();
