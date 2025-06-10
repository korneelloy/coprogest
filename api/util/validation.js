/**
 * Utility functions for validating input values.
 */

module.exports = {
  isValidUUIDv4(value) {
  /**
   * Validate a string as a UUID v4.
   * @param {string} value - supposed uuid value
   * @returns {boolean} - true if uuid / false if not
   */
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return typeof value === 'string' && uuidV4Regex.test(value);
  },

  isValidEmail(value) {
  /**
   * Validate a string as an email address.
   * @param {string} value - supposed email address
   * @returns {boolean} - true if email / false if not
   */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof value === 'string' && emailRegex.test(value);
  },

  isValidURL(value) {
  /**
   * Validate a string as a URL.
   * @param {string} value - supposed URL
   * @returns {boolean} - true if url / false if not
   */
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;
    return typeof value === 'string' && urlRegex.test(value);
  },

  isValidTelephone(value) {
    /**
     * Validate a string as a telephone number.
     * @param {string} value - supposed telephone
     * @returns {boolean} - true if tel nb / false if not
     */
    const phoneRegex = /^\+?[0-9\s\-()]{6,20}$/;
    return value === null || (typeof value === 'string' && phoneRegex.test(value));
  },

  isStringMin2Max50(value) {
  /**
   * Validate a string with some conditions: min 2 char and max 50
   * @param {string} value - supposed string
   * @returns {boolean} - true if conditions are met / false if not
   */
    return typeof value === 'string' && value.length >= 2 && value.length <= 50;
  },

  isNullOrString(value) {
  /**
   * Validate a string to be a string or null
   * @param {string} value - supposed string
   * @returns {boolean} - true if string or null / false if not
   */
    return value === null || typeof value === 'string';
  },

  isNullOrStringMin2Max20(value) {
    /**
     * Validate a string to be a string of minimum 2 char and max 20 or null
     * @param {string} value - supposed string
     * @returns {boolean} - true if string with conditions or null / false if not
     */
      return value === null || (typeof value === 'string' && value.length >= 2 && value.length <= 20) ;
    },

  isNullOrStringMin2Max50(value) {
    /**
     * Validate a string to be a string of minimum 2 char and max 50 or null
     * @param {string} value - supposed string
     * @returns {boolean} - true if string with conditions or null / false if not
     */
      return value === null || (typeof value === 'string' && value.length >= 2 && value.length <= 50) ;
    },

  isNullOrStringMin2Max100(value) {
    /**
     * Validate a string to be a string of minimum 2 char and max 100 or null
     * @param {string} value - supposed string
     * @returns {boolean} - true if string with conditions or null / false if not
     */
      return value === null || (typeof value === 'string' && value.length >= 2 && value.length <= 100) ;
    },

  isNullOrStringMin2Max255(value) {
    /**
     * Validate a string to be a string of minimum 2 char and max 255 or null
     * @param {string} value - supposed string
     * @returns {boolean} - true if string with conditions or null / false if not
     */
      return value === null || (typeof value === 'string' && value.length >= 2 && value.length <= 255) ;
    },
    


  isValidPassword(value) {
  /**
   * Validates a password : mini 8 char / mini one upper / mini one lower / mini one number / mini one spec char
   * @param {string} value - supposed password
   * @returns {boolean} - true if password ok / false if not
   */
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return value === null || (typeof value === 'string' && passwordRegex.test(value));
},

}
