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

  isStringMax20(value) {
    /**
     * Validate a string with some conditions: max 20
     * @param {string} value - supposed string
     * @returns {boolean} - true if conditions are met / false if not
     */
      return typeof value === 'string' && value.length <= 20;
    },
  

  isStringMax50(value) {
  /**
   * Validate a string with some conditions: max 50
   * @param {string} value - supposed string
   * @returns {boolean} - true if conditions are met / false if not
   */
    return typeof value === 'string' && value.length <= 50;
  },

  isStringMax255(value) {
    /**
     * Validate a string with some conditions: max 255
     * @param {string} value - supposed string
     * @returns {boolean} - true if conditions are met / false if not
     */
      return typeof value === 'string' && value.length <= 255;
  },

  isStringMax1000(value) {
    /**
     * Validate a string with some conditions: max 255
     * @param {string} value - supposed string
     * @returns {boolean} - true if conditions are met / false if not
     */
      return typeof value === 'string' && value.length <= 1000;
  },

  isNullOrString(value) {
  /**
   * Validate a string to be a string or null
   * @param {string} value - supposed string
   * @returns {boolean} - true if string or null / false if not
   */
    return value === null || typeof value === 'string';
  },

  isNullOrStringMax20(value) {
    /**
     * Validate a string to be a string of max 20 or null
     * @param {string} value - supposed string
     * @returns {boolean} - true if string with conditions or null / false if not
     */
      return value === null || (typeof value === 'string' && value.length <= 20) ;
    },

  isNullOrStringMax50(value) {
    /**
     * Validate a string to be a string of max 50 or null
     * @param {string} value - supposed string
     * @returns {boolean} - true if string with conditions or null / false if not
     */
      return value === null || (typeof value === 'string' && value.length <= 50) ;
    },

  isNullOrStringMax100(value) {
    /**
     * Validate a string to be a string of max 100 or null
     * @param {string} value - supposed string
     * @returns {boolean} - true if string with conditions or null / false if not
     */
      return value === null || (typeof value === 'string' && value.length <= 100) ;
    },

  isNullOrStringMax255(value) {
    /**
     * Validate a string to be a string of max 255 or null
     * @param {string} value - supposed string
     * @returns {boolean} - true if string with conditions or null / false if not
     */
      return value === null || (typeof value === 'string' && value.length <= 255) ;
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

  isValidAmount(value) {
  /**
  * Validate a value to be a number with max 15 digits total and 2 decimal places.
  * @param {number|string} value - input to validate
  * @returns {boolean} - true if valid, false otherwise
  */
  
    if (typeof value === 'string') {
      value = value.trim();
      if (value === '') return false;
      value = Number(value);
    }
  
    if (typeof value !== 'number' || isNaN(value)) return false;
  
    const decimalPart = value.toString().split('.')[1];
    if (decimalPart && decimalPart.length > 2) return false;
  
    const digitsOnly = value.toString().replace('.', '');
    if (digitsOnly.length > 15) return false;
  
    return true;
  }
  

}
