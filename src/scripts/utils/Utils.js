let _ = require('lodash');

module.exports = {
  pickDeep: function pickDeep(collection, identity, thisArg) {
    if (!identity.length) {
      return collection;
    }

    var picked = _.pick(collection, identity, thisArg);
    var collections = _.pick(collection, _.isObject, thisArg);

    _.each(collections, function(item, key, collection) {
        var object;

        object = pickDeep(item, identity, thisArg);

        if (!_.isEmpty(object)) {
            picked[key] = object;
        }

    });

    return picked;
  },

  buildMenu: function buildMenu(source, result) {
    let tree = _.cloneDeep(source);

    //build a return value if one wasn't passed in
    result = result || {};

    if (tree && tree.length) {

      var item = tree.shift(); //take first item from the array
      result[item.title] = { 
        ID : item.ID,
        uri: item.uri
      }; //make a new property in the result

      //if there are children, build them recursively
      if (item.children && item.children.length) {
        result[item.title].children = buildMenu(item.children);
      }

      //build additional items recursively, based on the remaining items in the array
      return buildMenu(tree, result);

    } else {
      //none left, done
      return result;
    }
  },
}