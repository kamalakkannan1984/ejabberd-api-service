/**
 * @createdBy Kamal
 * @createdOn 24th Apirl 2020
 */

const user: any = {};

/* ##################################################################################### */

// login
user.loginReq = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['host'],
  },
};

user.loginRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      message: { type: 'string' },
      token: { type: 'string' },
    },
  },
};
// registered_users
user.registeredUsersReq = {
  body: {
    type: 'object',
    properties: {
      host: { type: 'string' },
    },
    required: ['host'],
  },
};

user.registeredUsersRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      message: { type: 'string' },
      result: { type: 'array', items: { type: 'string' } },
    },
  },
};

// get_presence
user.getPresenceReq = {
  body: {
    type: 'object',
    properties: {
      user: { type: 'string' },
    },
    required: ['user'],
  },
};
/*
'result': {
        'jid': '3036@im01.unifiedring.co.uk/UnifiedRing.JEu9',
        'show': 'available',
        'status': ''
    }
*/
user.getPresenceRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      message: { type: 'string' },
      result: {
        type: 'object',
        properties: {
          jid: { type: 'string' },
          show: { type: 'string' },
          status: { type: 'string' },
        },
      },
    },
  },
};

// connected_users_number
user.connectedUsersNumberRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      message: { type: 'string' },
      result: {
        type: 'object',
        properties: {
          num_sessions: { type: 'number' },
        },
      },
    },
  },
};

// connected_users
user.connectedUsersRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      message: { type: 'string' },
      result: { type: 'array', items: { type: 'string' } },
    },
  },
};

// register
/*
'user': 'bob',
'host': 'example.com',
'password': 'SomEPass44'
*/
user.registerReq = {
  body: {
    type: 'object',
    properties: {
      userid: { type: 'string' },
      password: { type: 'string' },
      company_id: { type: 'number' },
    },
    required: ['userid', 'password', 'company_id'],
  },
};

user.registerRes = {
  200: {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      message: { type: 'string' },
      result: { type: 'string' },
    },
  },
};

// changePassword
/*'user': 'peter',
      'host': 'myserver.com',
      'newpass': 'blank'*/
user.changePassword = {
  body: {
    type: 'object',
    properties: {
      userid: { type: 'string' },
      sipNewPassword: { type: 'string' },
    },
    required: ['userid', 'sipNewPassword'],
  },
};

/* ############################################################################################################## */

export const userSchema: any = user;