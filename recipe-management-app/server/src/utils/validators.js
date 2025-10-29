const { body, validationResult } = require('express-validator');

const validateRecipe = [
    body('name').notEmpty().withMessage('Recipe name is required.'),
    body('ingredients').isArray().withMessage('Ingredients must be an array.'),
    body('instructions').notEmpty().withMessage('Cooking instructions are required.'),
    body('category').notEmpty().withMessage('Category is required.'),
    body('cookingTime').isInt({ gt: 0 }).withMessage('Cooking time must be a positive integer.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateRecipe,
    validate,
};