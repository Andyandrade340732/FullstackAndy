import * as textService from '../services/text.service.js';

export const handleTransform = async (req, res) => {
    const { texto, tono } = req.body;
    if (!texto) {
        return res.status(400).json({ error: "El campo 'texto' es obligatorio." });
    }
    try {
        const resultado = await textService.embellishText(texto, tono);
        res.json({
            success: true,
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};