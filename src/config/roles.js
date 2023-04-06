const allRoles = {
  user: ['getUsers', 'manageUsers', 'managePlaces', 'getPlaces'],
  admin: [
    'getUsers',
    'manageUsers',
    'managePlaces',
    'getPlaces',
    'manageCheckins',
    'getCheckins',
    'manageOrganizationss',
    'getOrganizationss',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
