const { Pool } = require('pg');

const pool = new Pool ({
    connectionString: 'postgres://arthur:xvQqwww2Kczb7cuJ2dvfPy15abC@dontpanic.k42.app/galaxy'
});

module.exports = pool;