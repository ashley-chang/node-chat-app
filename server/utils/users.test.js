const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Ashley',
      room: 'Red'
    },
    {
      id: '2',
      name: 'Bob',
      room: 'Orange'
    },
    {
      id: '3',
      name: 'Caroline',
      room: 'Red'
    }];
  });

  it('should add new user', () => { //synchronous function
    var users = new Users();
    var user = {
      id: '123',
      name: 'Banana',
      room: 'The Yellow Fruit'
    };

    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
      var id = '3';
      var user = users.removeUser(id);
      expect(user.id).toBe('3');
      expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var id = '4';
    var user = users.removeUser(id);
    expect(user).not.toBeTruthy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var id = '1';
    var user = users.getUser(id);
    expect(user.id).toBe(id);
  });

  it('should not find user', () => {
    var id = '4';
    var user = users.getUser(id);
    expect(user).not.toBeTruthy();
  });

  it('should return names for Red room', () => {
    var userList = users.getUserList('Red');
    expect(userList).toEqual(['Ashley', 'Caroline']);
  });

  it('should return names for Orange room', () => {
    var userList = users.getUserList('Orange');
    expect(userList).toEqual(['Bob']);
  });
});
