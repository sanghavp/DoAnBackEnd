const allRoles = {
  user: ['getUsers', 'manageUsers', 'managePlaces', 'getPlaces',],
  admin: ['getUsers', 'manageUsers', 'managePlaces', 'getPlaces',],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
