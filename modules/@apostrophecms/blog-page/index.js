module.exports = {
  extend: '@apostrophecms/piece-page-type',

  options: {
    label: 'aposBlog:page',
    piecesFilters: [ { name: 'year' }, { name: 'month' }, { name: 'day' } ]
  },

  extendMethods(self) {
    return {
      indexQuery(_super, req) {
        return _super(req).future('past');
      },
      showQuery(_super, req) {
        return _super(req).future('past');
      }
    };
  }
};
