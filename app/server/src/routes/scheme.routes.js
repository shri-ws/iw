const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/schemes
 * @desc    Get all mutual fund schemes
 * @access  Public
 */
router.get('/', async (req, res) => {
  // Mock data
  res.json({
    success: true,
    data: [
      {
        id: 1,
        schemeCode: 'HDFC001',
        schemeName: 'HDFC Top 100 Fund',
        amc: 'HDFC Mutual Fund',
        category: 'Equity',
        subCategory: 'Large Cap',
        nav: 70.82,
        navDate: '2025-10-15',
        returns1Y: 15.5,
        returns3Y: 18.2,
        returns5Y: 20.1,
        minInvestment: 5000,
        minSip: 500
      },
      {
        id: 2,
        schemeCode: 'SBI001',
        schemeName: 'SBI Bluechip Fund',
        amc: 'SBI Mutual Fund',
        category: 'Equity',
        subCategory: 'Large Cap',
        nav: 63.31,
        navDate: '2025-10-15',
        returns1Y: 14.8,
        returns3Y: 17.5,
        returns5Y: 19.2,
        minInvestment: 5000,
        minSip: 500
      },
      {
        id: 3,
        schemeCode: 'AXIS001',
        schemeName: 'Axis Midcap Fund',
        amc: 'Axis Mutual Fund',
        category: 'Equity',
        subCategory: 'Mid Cap',
        nav: 81.20,
        navDate: '2025-10-15',
        returns1Y: 22.5,
        returns3Y: 25.8,
        returns5Y: 28.5,
        minInvestment: 5000,
        minSip: 500
      }
    ]
  });
});

/**
 * @route   GET /api/schemes/:id
 * @desc    Get scheme details by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      schemeName: 'HDFC Top 100 Fund',
      nav: 70.82
    }
  });
});

/**
 * @route   GET /api/schemes/search
 * @desc    Search schemes
 * @access  Public
 */
router.get('/search', async (req, res) => {
  const { query } = req.query;
  res.json({
    success: true,
    data: []
  });
});

/**
 * @route   GET /api/schemes/category/:category
 * @desc    Get schemes by category
 * @access  Public
 */
router.get('/category/:category', async (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

module.exports = router;
