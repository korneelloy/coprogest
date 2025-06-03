module.exports = {
  isValidUUIDv4(value) {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return typeof value === 'string' && uuidV4Regex.test(value);
  },

  isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof value === 'string' && emailRegex.test(value);
  },

  isValidURL(value) {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;
    return typeof value === 'string' && urlRegex.test(value);
  },

  isStringMin2Max50(value) {
    return typeof value === 'string' && value.length >= 2 && value.length <= 50;
  },

  isNullOrString(value) {
    return value === null || typeof value === 'string';
  },

}
