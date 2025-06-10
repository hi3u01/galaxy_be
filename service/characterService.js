const pool = require('../config/db');
const calculateStats = require('./calculateStats');
const characterRelations = require('./characterRelations');

async function fetchCharacters() {
    const characterList = await pool.query('SELECT * FROM character');
    let characters = characterList.rows;

    characters = await Promise.all(characters.map(characterRelations));
    const stats = calculateStats(characters);

    return {
        characters_count: characters.length,
        stats,
        characters: characters.map(c => ({ 
            data: c 
        }))
    };
}

module.exports = { fetchCharacters };
