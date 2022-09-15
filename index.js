const dayjs = require('dayjs');
const queries = require('./queries');

module.exports = {
  extend: '@apostrophecms/piece-type',
  bundle: {
    directory: 'modules',
    modules: ['@apostrophecms/blog-page']
  },
  options: {
    label: 'aposBlog:label',
    pluralLabel: 'aposBlog:pluralLabel',
    sort: { releaseDate: -1 },
    i18n: {
      ns: 'aposBlog',
      browser: true
    }
  },
  columns: {
    add: {
      releaseDate: {
        label: 'aposBlog:releaseDate'
      }
    }
  },
  fields: {
    add: {
      releaseDate: {
        label: 'aposBlog:releaseDate',
        type: 'date',
        required: true
      }
    },
    group: {
      basics: {
        fields: ['releaseDate']
      }
    }
  },
  filters: {
    add: {
      future: {
        label: 'aposBlog:futureArticles',
        def: null
      },
      year: {
        label: 'aposBlog:filterYear',
        inputType: 'select',
        def: null
      },
      month: {
        label: 'aposBlog:filterMonth',
        inputType: 'select',
        def: null
      },
      day: {
        label: 'aposBlog:filterDay',
        inputType: 'select',
        def: null
      }
    }
  },
  queries,
  extendMethods(self) {
    return {
      findForEditing(_super, req, criteria, builders) {
        const query = _super(req, criteria, builders);
        query.future(null);
        return query;
      },
      newInstance(_super) {
        const instance = _super();
        if (!instance.releaseDate) {
          instance.releaseDate = dayjs().format('YYYY-MM-DD');
        }
        return instance;
      }
    };
  }
};
