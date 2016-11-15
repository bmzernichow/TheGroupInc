'use strict';

var dl = require('datalib');

module.exports = function(Profile) {

  Profile.disableRemoteMethod("create", false);
  Profile.disableRemoteMethod("upsert", false);
  Profile.disableRemoteMethod("updateAll", true);

  Profile.disableRemoteMethod("find", true);
  Profile.disableRemoteMethod("findById", false);
  Profile.disableRemoteMethod("findOne", true);

  Profile.disableRemoteMethod("deleteById", false);

  Profile.disableRemoteMethod("count", true);
  Profile.disableRemoteMethod("exists", true);

  Profile.disableRemoteMethod("createChangeStream", true);
  Profile.disableRemoteMethod("replaceOrCreate", true);
  Profile.disableRemoteMethod("prototype.updateAttributes", true);
  Profile.disableRemoteMethod("replaceById", true);


  // --- Statistics/summary/full ---

  Profile.summaryFull = function(id, cb) {

    Profile.findById( id, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.summary(csv);

      for(var i = 0; i < data.length; i++) {
        delete data[i].unique;
      }
      console.log('Summary/full generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'summaryFull',
    {
      http: {path: '/statistics/summary/full', verb: 'get'},
      description: 'Generate a full summary query for all columns.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Summary full', type: 'String'}
    }
  );


  // --- Statistics/summary/full/column ---

  Profile.summaryFullCol = function(profileId, cb) {

    Profile.findById( profileId, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.summary(csv, [instance.column]);
      delete data[0].unique;

      console.log('Summary/full/column generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'summaryFullCol',
    {
      http: {path: '/statistics/summary/full/column', verb: 'get'},
      description: 'Create a full summary query for a specific column.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Summary column', type: 'String'}
    }
  );


  // --- Statistics/summary/normal ---

  Profile.summaryNormal = function(profileId, cb) {

    Profile.findById( profileId, function (err, instance) {

      var csv = dl.csv(instance.url);
      var keys = dl.keys(csv[0]);

      var data = [];

      for (var i=0; i <keys.length; i++) {

        // default profile object
        var obj = {
          field: "",
          type: "",
          count: 0,
          valid: 0,
          missing: 0,
          distinct: 0,
          min: 0,
          max: 0,
          mean: 0
        };

        // processing statistics, updating profile object values
        obj.field = keys[i];
        obj.type = dl.type(csv, keys[i]);
        obj.count = dl.count(csv, keys[i]);
        obj.valid = dl.count.valid(csv, keys[i]);
        obj.missing = dl.count.missing(csv, keys[i]);
        obj.distinct = dl.count.distinct(csv, keys[i]);

        if (obj.type === 'string') {
          delete obj.min;
          delete obj.max;
          delete obj.mean;
        }
        else {
          obj.min = dl.min(csv, keys[i]);
          obj.max = dl.max(csv, keys[i]);
          obj.mean = dl.mean(csv, keys[i]);
        }
        data.push(obj);
      }

      console.log('Summary/normal generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'summaryNormal',
    {
      http: {path: '/statistics/summary/normal', verb: 'get'},
      description: 'Create a regular summary query.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Summary normal', type: 'String'}
    }
  );


  // --- Groupby/summarize ---

  Profile.groupBy = function(id, cb) {

    Profile.findById( id, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.groupby(instance.groupby)
        .summarize([
          {name: instance.aggregation, ops: [instance.summarize]}
        ])
        .execute(csv);

      console.log('Groupby/summarize generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'groupBy',
    {
      http: {path: '/groupby/summarize', verb: 'get'},
      description: 'Create a group-by aggregation query.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Groupby aggregation', type: 'String'}
    }
  );

  // --- Statistics/histogram ---

  Profile.histogram = function(id, cb) {

    Profile.findById( id, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.histogram(csv, instance.column);

      console.log('Statistics/histogram generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'histogram',
    {
      http: {path: '/statistics/histogram', verb: 'get'},
      description: 'Create a histogram query.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Histogram', type: 'String'}
    }
  );


  // --- Statistics/count/values ---

  Profile.counter = function(id, cb) {

    Profile.findById( id, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.count(csv, instance.column);

      console.log('Statistics/count/values generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'counter',
    {
      http: {path: '/statistics/count/values', verb: 'get'},
      description: 'Count the number of values including nulls.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Values count', type: 'String'}
    }
  );

  // --- Statistics/count/valid ---

  Profile.valid = function(id, cb) {

    Profile.findById( id, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.count.valid(csv, instance.column);

      console.log('Statistics/count/valid generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'valid',
    {
      http: {path: '/statistics/count/valid', verb: 'get'},
      description: 'Count the number of values that are not null, undefined or NaN.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Valid', type: 'String'}
    }
  );


  // --- Statistics/count/missing ---

  Profile.missing = function(id, cb) {

    Profile.findById( id, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.count.missing(csv, instance.column);

      console.log('Statistics/count/missing generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'missing',
    {
      http: {path: '/statistics/count/missing', verb: 'get'},
      description: 'Count the number of null and undefined values.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Missing', type: 'String'}
    }
  );


  // --- Statistics/count/distinct ---

  Profile.distinct = function(id, cb) {

    Profile.findById( id, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.count.distinct(csv, instance.column);

      console.log('Statistics/count/distinct generated ---> OK');

      cb(null, data);

    });
  };

  Profile.remoteMethod (
    'distinct',
    {
      http: {path: '/statistics/count/distinct', verb: 'get'},
      description: 'Count the number of distinct values.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Distinct', type: 'String'}
    }
  );

  // end
};
