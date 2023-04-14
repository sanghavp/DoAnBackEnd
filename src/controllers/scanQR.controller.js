const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { scanQRService } = require('../services');

const createScanQR = catchAsync(async (req, res) => {
  const scanQR = await scanQRService.createScanQR(req.body);
  res.status(scanQR.status).send(scanQR.result);
});

const getScanQRs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['lat', 'long', 'placeId', 'time', 'userID', 'extra']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await scanQRService.queryScanQRs(filter, options);
  res.send(result);
});

const getScanQR = catchAsync(async (req, res) => {
  const scanQR = await scanQRService.getScanQRById(req.params.scanQRId);
  if (!scanQR) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ScanQR not found');
  }
  res.send(scanQR);
});

const updateScanQR = catchAsync(async (req, res) => {
  const scanQR = await scanQRService.updateScanQRById(req.params.scanQRId, req.body);
  res.send(scanQR);
});

const deleteScanQR = catchAsync(async (req, res) => {
  await scanQRService.deleteScanQRById(req.params.scanQRId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createScanQR,
  getScanQRs,
  getScanQR,
  updateScanQR,
  deleteScanQR,
};
