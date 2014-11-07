/**
* App.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var appTypes = sails.config.api.appTypes;

module.exports = {

  schema: true,

  attributes: {
    user: {
      model: 'user'
    },
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    description: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      enum: appTypes
    },
    deletedAt: {
      type: 'date',
      defaultsTo: null
    },
    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
  }

};

