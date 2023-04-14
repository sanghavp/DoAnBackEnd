const httpStatus = require('http-status');
const { ScanQR, Place } = require('../models');
const ApiError = require('../utils/ApiError');
const { hours, compareHours } = require('../utils/common');

/**
 * Create a scanQR
 * @param {Object} scanQRBody
 * @returns {Promise<ScanQR>}
 */
const createScanQR = async (scanQRBody) => {
  const place = await Place.findById(scanQRBody.placeId);
  
  const distance = getDistanceFromLatLon(scanQRBody.lat, scanQRBody.long, place.lat, place.long)
  const time = compareTime(scanQRBody, place)
  // const compareMinimumTime = checkout(scanQRBody, place)
  const checkinVerify = checkin(scanQRBody, place)
  console.log(time);
  if(!!place.r && (distance <= place.r) && time === true && checkinVerify === true){
    Object.assign(place, {lastCheckin: scanQRBody.currentTime, status: place.status === "in" ? out : "in" });
    const scanQR = await ScanQR.create(scanQRBody);
    return {status: httpStatus.CREATED, result: scanQR}; 
  }else {
    return {status: httpStatus.FORBIDDEN, result: {
      place: !!(distance <= place.r),
      compareTime: time,
      checkinVerify: checkinVerify
    }}
  }
};

// local fuction
const getDistanceFromLatLon = (currentLat, currentLon1, placeLat, placeLon) => {
  const deg2rad = (deg) => {
     return deg * (Math.PI / 180)
  }
  var R = 6371; // Radius of the earth in km
  var dLat = Math.abs(deg2rad(placeLat - currentLat));  // deg2rad below
  var dLon = Math.abs(deg2rad(placeLon - currentLon1));
  var a =
     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(deg2rad(currentLat)) * Math.cos(deg2rad(placeLat)) *
     Math.sin(dLon / 2) * Math.sin(dLon / 2)
     ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  console.log("khoang cach: ", d * 1000)
  return Math.round(d * 1000);//Return Meter 
}

const compareTime = (scanQR, place) => {
  if((hours(place.timeStart) >= hours(scanQR.currentTime) && place.status == "out") || place.status == "in"){
    return true;
  }else{
    return "This time is no permit!"
  }
}

// const checkout = (scanQR, place) => {
//   // nếu như vừa chấm vào mà chưa hết thời gian tuần tra thì không cho chấm
//   if(scanQR.currentTime.toDate() - place.lastCheckin.toDate() <= place.minimumTime && place.status === "in"){
//     return `Thời gian tuần tra quá ngắn, hãy thử lại sau, thời gian tối thiểu là ${place.minimumTime} phút`
//   }else {
//     return true
//   }
// }

const checkin = (scanQR, place) => {
  console.log("thời gian chấm công so sánh: ", compareHours(scanQR.currentTime, place.timeStart));
  if(compareHours(scanQR.currentTime, place.timeStart) > place.tooLate || compareHours(scanQR.currentTime, place.timeStart) <= 0){
    return "Đã quá thời gian chấm công!"
  }else {
    return true
  }
}

/**
 * Query for scanQRs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryScanQRs = async (filter, options) => {
  const scanQRs = await ScanQR.paginate(filter, options);
  return scanQRs;
};

/**
 * Get scanQR by id
 * @param {ObjectId} id
 * @returns {Promise<ScanQR>}
 */
const getScanQRById = async (id) => {
  return ScanQR.findById(id);
};

/**
 * Update scanQR by id
 * @param {ObjectId} scanQRId
 * @param {Object} updateBody
 * @returns {Promise<ScanQR>}
 */
const updateScanQRById = async (scanQRId, updateBody) => {
  const scanQR = await getScanQRById(scanQRId);
  if (!scanQR) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ScanQR not found');
  }
  Object.assign(scanQR, updateBody);
  await scanQR.save();
  return scanQR;
};

/**
 * Delete scanQR by id
 * @param {ObjectId} scanQRId
 * @returns {Promise<ScanQR>}
 */
const deleteScanQRById = async (scanQRId) => {
  const scanQR = await getScanQRById(scanQRId);
  if (!scanQR) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ScanQR not found');
  }
  await scanQR.remove();
  return scanQR;
};

module.exports = {
  createScanQR,
  queryScanQRs,
  getScanQRById,
  updateScanQRById,
  deleteScanQRById,
};
