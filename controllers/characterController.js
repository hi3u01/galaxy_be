const characterService = require('../service/characterService');

exports.getCharacters = async (req, res) => {
    try{
        const stats = await characterService.fetchCharacters();
        res.json(stats)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching character stats'})
    }
}