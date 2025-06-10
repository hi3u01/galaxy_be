const pool = require('../config/db');

async function fetchCharacters() {
    const characterList = await pool.query('SELECT * FROM character');
    const characters = characterList.rows;

    const characters_count = characters.length;
    let totalAge = 0;
    let ageCount = 0;

    const today = dayjs();

    for(const character of characters) {

        const wasBorn = dayjs(character.wasBorn);
        const age = today.diff(wasBorn, 'year');
        totalAge  += age;
        ageCount +=1;
    }

    return {
        characters_count,
        avarage_age: Math.round(totalAge / ageCount)
    }
}

module.exports = {fetchCharacters}