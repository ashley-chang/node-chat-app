var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Yoda';
    var lat = 10;
    var long = 20;
    var url = "https://www.google.com/maps?q=10,20";
    var message = generateLocationMessage(from, lat, long);

    expect(message).toMatchObject({from, url});
    expect(typeof message.createdAt).toBe('number');

  });
});
