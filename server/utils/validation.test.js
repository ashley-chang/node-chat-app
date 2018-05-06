const expect = require('expect');

const {isRealString} = require('./validation');
//import isRealString

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(2)).toBe(false);
    expect(isRealString({word: "hello"})).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    expect(isRealString('    ')).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    expect(isRealString('     hello')).toBe(true);
  });
});
