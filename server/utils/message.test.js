var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    //store response in variable
    var from = 'Mark';
    var text = 'A message';
    var message = generateMessage(from, text);
    //assert from/text matches value passed in
    expect(message).toMatchObject({from, text});
    //assert createdAt value is a number
    expect(typeof message.createdAt).toBe('number');
  });
});
