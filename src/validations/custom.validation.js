const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  if (!value.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
    return helpers.message('"{{#label}}" must be a valid Viet Nam phone number');
  }
  return value;
}

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const mac = (value, helpers) => {
  if (!value.match(/^([0-9a-fA-F]{2}[:-]){5}([0-9a-fA-F]{2})$/)) {
    return helpers.message('"{{#label}}" must be a valid MAC address');
  }
  return value;
}

const ipAddress = (value, helper) => {
  if (!value.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
    return helper.message('"{{#label}}" must be a valid IP address');
  }
  return value;
}

module.exports = {
  objectId,
  password,
  phoneNumber,
  mac,
  ipAddress
};
