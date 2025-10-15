const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/transactions/:clientId
 * @desc    Get all transactions for client
 * @access  Private
 */
router.get('/:clientId', async (req, res) => {
  // Mock data
  res.json({
    success: true,
    data: [
      {
        id: 1,
        type: 'SIP',
        schemeName: 'HDFC Top 100 Fund',
        amount: 5000,
        units: 70.5,
        nav: 70.92,
        date: '2025-10-15',
        status: 'completed'
      },
      {
        id: 2,
        type: 'Lumpsum',
        schemeName: 'SBI Bluechip Fund',
        amount: 25000,
        units: 395.2,
        nav: 63.21,
        date: '2025-10-10',
        status: 'completed'
      },
      {
        id: 3,
        type: 'SIP',
        schemeName: 'Axis Midcap Fund',
        amount: 3000,
        units: 37.0,
        nav: 81.08,
        date: '2025-10-05',
        status: 'completed'
      }
    ]
  });
});

/**
 * @route   POST /api/transactions/purchase
 * @desc    Create purchase transaction
 * @access  Private
 */
router.post('/purchase', async (req, res) => {
  const { clientId, schemeId, amount } = req.body;
  
  res.json({
    success: true,
    message: 'Purchase order created successfully',
    data: {
      orderId: 'ORD' + Date.now(),
      status: 'pending'
    }
  });
});

/**
 * @route   POST /api/transactions/redeem
 * @desc    Create redemption transaction
 * @access  Private
 */
router.post('/redeem', async (req, res) => {
  const { clientId, schemeId, units, amount } = req.body;
  
  res.json({
    success: true,
    message: 'Redemption order created successfully',
    data: {
      orderId: 'ORD' + Date.now(),
      status: 'pending'
    }
  });
});

/**
 * @route   POST /api/transactions/sip/create
 * @desc    Create SIP
 * @access  Private
 */
router.post('/sip/create', async (req, res) => {
  const { clientId, schemeId, amount, frequency, startDate } = req.body;
  
  res.json({
    success: true,
    message: 'SIP created successfully',
    data: {
      sipId: 'SIP' + Date.now(),
      status: 'active'
    }
  });
});

/**
 * @route   PUT /api/transactions/sip/:sipId/pause
 * @desc    Pause SIP
 * @access  Private
 */
router.put('/sip/:sipId/pause', async (req, res) => {
  res.json({
    success: true,
    message: 'SIP paused successfully'
  });
});

/**
 * @route   PUT /api/transactions/sip/:sipId/cancel
 * @desc    Cancel SIP
 * @access  Private
 */
router.put('/sip/:sipId/cancel', async (req, res) => {
  res.json({
    success: true,
    message: 'SIP cancelled successfully'
  });
});

/**
 * @route   GET /api/transactions/sip/:clientId
 * @desc    Get all SIPs for client
 * @access  Private
 */
router.get('/sip/:clientId', async (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

module.exports = router;
