const allRoles = {
  // trong trường hợp những api nào không cần đăng nhập vẫn show hoặc vẫn có thể xem thì sẽ không cần auth()

  // Bảo vệ
  user: ['getPlaces', 'getOrganizations', 'addTimesheets', 'getTimesheets', 'getDivisions', 'getCurrentUser',],
  // Đội trưởng đội bảo vệ
  leader: [
    'getCurrentUser',
    'managePlaces',
    'getPlaces',
    'manageCheckins',
    'getCheckins',
    'getOrganizations',
    'addTimesheets',
    'getTimesheets',
    'manageTimesheets',
    'manageDivisions', 
    'getDivisions',
    'getUsers',
    'manageUsers'
  ],
  // Quản lí khu vực
  manager: [
    'getCurrentUser',
    'getUsers',
    'manageUsers',
    'managePlaces',
    'getPlaces',
    'manageCheckins',
    'getCheckins',
    'getOrganizations',
    'manageScanQRs',
    'getScanQRs',
    'manageShifts',
    'getShifts',
    'getTimesheets',
    'manageTimesheets',
  ],
  // Giám đốc
  admin: [
    'getCurrentUser',
    'getUsers',
    'manageUsers',
    'managePlaces',
    'getPlaces',
    'getShifts',
    'manageShifts',
    'getOrganizations',
    'manageOrganizations',
    'getTimesheets',
    'manageTimesheets',
    'resetPassword'
  ],
  // // DEV - Quản trị hệ thống
  // superadmin: [
  //   'manageOrganizations',
  //   'getOrganizations',
  // ]
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
