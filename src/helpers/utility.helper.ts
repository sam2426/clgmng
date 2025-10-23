/**
 * this function acts as a validator, and removes any circular dependency if found in the JSON object.
 * @returns JSON after removing circular dependency
 */
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_key: any, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return undefined;
        }
        seen.add(value);
      }
      return value;
    };
  };
  
  /**
   * this stringifies the JavaScript Objects, the main advantage it provides over basic `JSON.stringify()` is that
   * it safely parses objects, and returns strings as it is, if the input is string already and does not throw error.
   *
   * this also resolves the circular dependency issue, if any.
   * @param data - it can be of string or object datatype.
   * @param beautify - `boolean` default false, if true, it returns the parsed string as JSON beutified.
   * @returns parsed data as string.
   */
  export const customStringify = (data: any, beautify = false): string => {
    try {
      if (typeof data !== 'string' || (typeof data === 'string' && data.includes('\n'))) {
        return JSON.stringify(data, getCircularReplacer(), beautify ? 2 : 0);
      }
      return data;
    } catch {
      return data;
    }
  };