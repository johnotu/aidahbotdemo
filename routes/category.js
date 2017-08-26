const express = require('express')
const router = express.Router()

const Category = require('../models/category')

router.get('/', (req, res) => {
  Category.getCategories((err, categories) => {
    if (err) {
      return res.json({
        success: false,
        error: err
      })
    }
    return res.json({
      success: true,
      categories: categories
    })
  })
})

router.post('/', (req, res) => {
  let newCategory = new Category({
    name: req.body.name
  })

  Category.addCategory(newCategory, (err, category) => {
    if (err) {
      return res.json({
        success: false,
        error: err
      })
    }
    res.json({
      success: true,
      category: category
    })
  })
})

module.exports = router
