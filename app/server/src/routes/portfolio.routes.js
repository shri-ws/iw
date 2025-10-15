const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/portfolio/:clientId
 * @desc    Get portfolio summary for client
 * @access  Private
 */
router.get('/:clientId', async (req, res) => {
  // Mock data for now
  res.json({
    success: true,
    data: {
      clientId: req.params.clientId,
      totalInvested: 200000,
      currentValue: 245000,
      totalReturns: 45000,
      returnsPercentage: 22.5,
      todayGain: 2500,
      holdings: [
        {
          id: 1,
          schemeName: 'HDFC Top 100 Fund',
          units: 1200.50,
          investedAmount: 70000,
          currentValue: 85000,
          returns: 21.4,
          nav: 70.82
        },
        {
          id: 2,
          schemeName: 'SBI Bluechip Fund',
          units: 1500.25,
          investedAmount: 80000,
          currentValue: 95000,
          returns: 18.8,
          nav: 63.31
        },
        {
          id: 3,
          schemeName: 'Axis Midcap Fund',
          units: 800.75,
          investedAmount: 50000,
          currentValue: 65000,
          returns: 30.0,
          nav: 81.20
        }
      ]
    }
  });
});

/**
 * @route   GET /api/portfolio/:clientId/holdings
 * @desc    Get all holdings for client
 * @access  Private
 */
router.get('/:clientId/holdings', async (req, res) => {
  res.json({
    success: true,
    message: 'Get client holdings',
    data: []
  });
});

/**
 * @route   GET /api/portfolio/:clientId/performance
 * @desc    Get portfolio performance metrics
 * @access  Private
 */
router.get('/:clientId/performance', async (req, res) => {
  res.json({
    success: true,
    message: 'Get portfolio performance',
    data: {
      xirr: 22.5,
      cagr: 20.8,
      absoluteReturns: 22.5
    }
  });
});

module.exports = router;
