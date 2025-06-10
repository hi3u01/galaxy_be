const pool = require('../config/db');

async function characterRelations(character) {
    const nemesisList = await pool.query('SELECT * FROM nemesis WHERE character_id = $1', [character.id]);
    const nemeses = nemesisList.rows;

    for (const nemesis of nemeses) {
        const secretList = await pool.query('SELECT * FROM secret WHERE nemesis_id = $1', [nemesis.id]);
        const secrets = secretList.rows;

        nemesis.children = {
            has_secret: {
                records: secrets.map(secret => ({ 
                    data: secret 
                }))
            }
        };
    }

    character.children = {
        has_nemesis: {
            records: nemeses.map(nemesis => ({ 
                data: nemesis 
            }))
        }
    };

    return character;
}

module.exports = characterRelations;
