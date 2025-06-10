const dayjs = require('dayjs');

function calculateStats(characters) {
    let totalAge = 0
    let ageCount = 0;
    let totalWeight = 0
    let weightCount = 0;
    const genders = {};

    const today = dayjs();

    for (const character of characters) {
        const born = dayjs(character.born);
        const age = today.diff(born, 'year');
        totalAge += age;
        ageCount += 1;

        const weight = Number(character.weight);
        if (!isNaN(weight)) {
            totalWeight += weight;
            weightCount += 1;
        }

        if (character.gender === "male" || character.gender === "female") {
            genders[character.gender] = (genders[character.gender] || 0) + 1;
        } else {
            genders.other = (genders.other || 0) + 1;
        }
     // needs to be solve   
    /*  
        for (const nemesis of nemeses) {
            if (typeof nemesis.years === 'number') {
                totalAge += nemesis.years;
                ageCount += 1;
            }
        } 
    */
    } 

    
    return {
        average_age: ageCount ? Math.round(totalAge / ageCount) : null,
        average_weight: weightCount ? Math.round(totalWeight / weightCount) : null,
        genders
    };
}

module.exports = calculateStats;
