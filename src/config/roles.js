const allRoles = {
  // trong trường hợp những api nào không cần đăng nhập vẫn show hoặc vẫn có thể xem thì sẽ không cần auth()

  // Bảo vệ
  user: ['getPlaces', 'getOrganizations'],
  // Đội trưởng đội bảo vệ
  leader: [
    'managePlaces',
    'getPlaces',
    'manageCheckins',
    'getCheckins',
    'getOrganizations',
  ],
  // Quản lí khu vực
  manager: [
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
    'getShifts'
  ],
  // Giám đốc
  admin: [
    'getUsers',
    'manageUsers',
    'managePlaces',
    'getPlaces',
    'getShifts',
    'manageShifts',
    'getOrganizations',
  ],
  // DEV - Quản trị hệ thống
  superadmin: [
    'manageOrganizations',
    'getOrganizations',
  ]
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
