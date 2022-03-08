/**
 * Query for documents with pagination
 * @param {Object}          [filter={}]                 Mongo filter
 * @param {Object}          [options={}]                Query options
 * @param {Object|String}   [options.select='']         Select fields. Multiple select criteria should be separated by commas (,)
 * @param {Object|String}   [options.sort='-createAt']  Sorting criteria. Multiple sorting criteria should be separated by commas (,) (default="-createAt")
 * @param {String}          [options.populate='']       Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
 * @param {Number}          [options.page=1]            Current page (default = 1)
 * @param {Number}          [options.limit=10]          Maximum number of results perpage (default = 10)
 * @returns {Promise<QueryResult>}
 *
 */

/**
 * @typedef {Object} QueryResult
 * @property {Document[]}   results                     Results found
 * @property {number}       page                        Current page
 * @property {number}       limit                       Maximum number of results per page
 * @property {number}       totalPages                  Total number of pages
 * @property {number}       totalResults                Total number of documents
 */

//  let myCustomLabels = {
//   totalDocs: 'itemCount',
//   docs: 'itemsList',
//   limit: 'perPage',
//   page: 'currentPage',
//   nextPage: 'next',
//   prevPage: 'prev',
//   totalPages: 'pageCount',
//   pagingCounter: 'slNo',
//   meta: 'paginator',
// }

const paginate = schema => {
  const defaultOptions = {
    customLabels: {
      docs: 'results',
      totalDocs: 'totalResults',
    },
    select: '',
    sort: '-createdAt',
    page: 1,
    limit: 10,
  }

  schema.statics.paginate = async function (filter = {}, options = {}) {
    // Create filter string
    const filterStr = JSON.stringify(filter)

    // Create operators ($gt, $gte, etc)
    filter = JSON.parse(
      filterStr.replace(/\b(gt|gte|lt|lte|in|eq)\b/g, match => `$${match}`)
    )

    // Merge options
    options = {
      ...defaultOptions,
      ...options,
    }

    // Get filter options
    let { select, sort, limit, page } = options
    limit = parseInt(limit, 10)
    select = select.split(',').join(' ')
    sort = sort.split(',').join(' ')

    // Pagination
    const skip = (page - 1) * limit

    // Finding resource
    let query = this.find(filter)
      .select(select)
      .skip(skip)
      .sort(sort)
      .limit(limit)

    // Populate data fields.
    if (options.populate) {
      options.populate.split(',').forEach(populateOption => {
        query = query.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        )
      })
    }

    // Custom labels
    const customLabels = {
      ...defaultOptions.customLabels,
      ...options.customLabels,
    }

    // Label
    const {
      docs: labelDocs,
      page: labelPage,
      totalPages: labelTotalPages,
      limit: labelLimit,
      totalDocs: labelTotalDocs,
    } = customLabels

    // Executing query
    const countPromise = this.countDocuments(filter).exec()
    const docsPromise = query.exec()
    const [totalDocs, docs] = await Promise.all([countPromise, docsPromise])
    return {
      [labelDocs]: docs,
      info: {
        [labelPage]: page,
        [labelTotalPages]: Math.ceil(totalDocs / limit),
        [labelLimit]: limit,
        [labelTotalDocs]: totalDocs,
      },
    }
  }
}

export default paginate
