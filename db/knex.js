import knex from 'knex';
import fs from 'fs';

export const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: 'weatherdb.sqlite3'
    },
    useNullAsDefault: true
});

export const createTableIfNotExists = async (tableName) => {

    try {
        if(!fs.existsSync('weatherdb.sqlite3')) {
          fs.open('weatherdb.sqlite3', 'w', (err, fd) => {
            if (err) {
              console.error(err);
              return false;
            }
            fs.close(fd, (err) => {
              if (err) {
                console.error(err);
                return false;
              }
            });
          });
        }
    } catch(err){
        console.log(err);
    }

    let tableExists = false;
    await connection.schema.hasTable(tableName).then(exists => {
        tableExists = exists;
        if (!exists) {
            return connection.schema.createTable(tableName, table => {
                table.increments('id').primary();
                table.bigInteger('timestamp');
                table.json('weatherData');
                tableExists = true;
            });
        }
    });
    return tableExists;
};