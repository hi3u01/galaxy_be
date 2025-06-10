const pool = require('../config/db');
const dayjs = require('dayjs')

async function fetchCharacters() {
    const characterList = await pool.query('SELECT * FROM character');
    const characters = characterList.rows;

    const characters_count = characters.length;
    let totalAge = 0;
    let ageCount = 0;
    let totalWeight = 0;
    let weightCount = 0;
    let genders = {};

    const today = dayjs();

    for(const character of characters) {

        const born = dayjs(character.born);
        const age = today.diff(born, 'year');
        totalAge  += age;
        ageCount += 1;

        const weight = Number(character.weight);
        if (!isNaN(weight)) {
            totalWeight += weight;
            weightCount += 1;
        }
       
        if(character.gender == "male" || character.gender == "female") {   
            genders[character.gender] = (genders[character.gender] || 0) + 1;           
        } else {
           genders.other = (genders.other || 0) + 1;
        }
    }

    return {
        characters_count,
        avarage_age: ageCount > 0 ? Math.round(totalAge / ageCount) : null,
        average_weight: weightCount > 0 ? Math.round(totalWeight / weightCount) : null,
        genders,
        charaters: characters.map(character => ({
            data: character
        }))
    }
}

module.exports = {fetchCharacters}