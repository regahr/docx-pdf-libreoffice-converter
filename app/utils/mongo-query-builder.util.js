/* eslint-disable no-restricted-syntax */
import lodash from 'lodash';
import mongoose from 'mongoose';
import { convertDateToMoment } from './date.utils';

/**
 * For escaping special character in Regex
 * @param {string} str The input string
 * @returns {string}
 */
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parseOperator = (columnName, operatorName, value) => {
  const whereAnd = [];
  const whereOr = [];
  if (operatorName === '_eq') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $eq: currentValue
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $eq: value
        }
      });
    }
  }
  else if (operatorName === '_bool_eq') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        let parsedValue = false;
        if (currentValue.toLowerCase() === 'true' || currentValue === '1') parsedValue = true;
        else if (currentValue.toLowerCase() === 'false' || currentValue === '0') parsedValue = false;
        whereAnd.push({
          [columnName]: {
            $eq: parsedValue
          }
        });
      }
    }
    else {
      let parsedValue = false;
      if (value.toLowerCase() === 'true' || value === '1') parsedValue = true;
      else if (value.toLowerCase() === 'false' || value === '0') parsedValue = false;
      whereAnd.push({
        [columnName]: {
          $eq: parsedValue
        }
      });
    }
  }
  else if (operatorName === '_num_eq') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $eq: Number(currentValue)
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $eq: Number(value)
        }
      });
    }
  }
  else if (operatorName === '_objid_eq') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $eq: new mongoose.Types.ObjectId(currentValue)
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $eq: new mongoose.Types.ObjectId(value)
        }
      });
    }
  }
  else if (operatorName === '_ne') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $ne: currentValue
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $ne: value
        }
      });
    }
  }
  else if (operatorName === '_bool_ne') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        let parsedValue = false;
        if (currentValue.toLowerCase() === 'true' || currentValue === '1') parsedValue = true;
        else if (currentValue.toLowerCase() === 'false' || currentValue === '0') parsedValue = false;
        whereAnd.push({
          [columnName]: {
            $ne: parsedValue
          }
        });
      }
    }
    else {
      let parsedValue = false;
      if (value.toLowerCase() === 'true' || value === '1') parsedValue = true;
      else if (value.toLowerCase() === 'false' || value === '0') parsedValue = false;
      whereAnd.push({
        [columnName]: {
          $ne: parsedValue
        }
      });
    }
  }
  else if (operatorName === '_num_ne') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $ne: Number(currentValue)
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $ne: Number(value)
        }
      });
    }
  }
  else if (operatorName === '_objid_ne') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $ne: new mongoose.Types.ObjectId(currentValue)
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $ne: new mongoose.Types.ObjectId(value)
        }
      });
    }
  }
  else if (operatorName === '_like') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $regex: currentValue
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $regex: value
        }
      });
    }
  }
  else if (operatorName === '_ilike') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $regex: currentValue,
            $options: 'i'
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $regex: value,
          $options: 'i'
        }
      });
    }
  }
  else if (operatorName === '_gt') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $gt: Number(currentValue)
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $gt: Number(value)
        }
      });
    }
  }
  else if (operatorName === '_gte') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $gte: Number(currentValue)
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $gte: Number(value)
        }
      });
    }
  }
  else if (operatorName === '_lt') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $lt: Number(currentValue)
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $lt: Number(value)
        }
      });
    }
  }
  else if (operatorName === '_lte') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        whereAnd.push({
          [columnName]: {
            $lte: Number(currentValue)
          }
        });
      }
    }
    else {
      whereAnd.push({
        [columnName]: {
          $lte: Number(value)
        }
      });
    }
  }
  else if (operatorName === '_null') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        if (currentValue.toLowerCase() === 'true') {
          whereAnd.push({
            [columnName]: {
              $eq: null,
              $exists: true
            }
          });
        }
        else if (currentValue.toLowerCase() === 'false') {
          whereAnd.push({
            [columnName]: {
              $ne: null,
              $exists: true
            }
          });
        }
      }
    }
    else if (value.toLowerCase() === 'true') {
      whereAnd.push({
        [columnName]: {
          $eq: null,
          $exists: true
        }
      });
    }
    else if (value.toLowerCase() === 'false') {
      whereAnd.push({
        [columnName]: {
          $ne: null,
          $exists: true
        }
      });
    }
  }
  else if (operatorName === '_exists') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        if (currentValue.toLowerCase() === 'true') {
          whereAnd.push({
            [columnName]: {
              $exists: true
            }
          });
        }
        else if (currentValue.toLowerCase() === 'false') {
          whereAnd.push({
            [columnName]: {
              $exists: false
            }
          });
        }
      }
    }
    else if (value.toLowerCase() === 'true') {
      whereAnd.push({
        [columnName]: {
          $exists: true
        }
      });
    }
    else if (value.toLowerCase() === 'false') {
      whereAnd.push({
        [columnName]: {
          $exists: false
        }
      });
    }
  }
  else if (operatorName === '_date_gt') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        const mDate = convertDateToMoment(currentValue);
        whereAnd.push({
          [columnName]: {
            $gt: mDate.toDate()
          }
        });
      }
    }
    else {
      const mDate = convertDateToMoment(value);
      whereAnd.push({
        [columnName]: {
          $gt: mDate.toDate()
        }
      });
    }
  }
  else if (operatorName === '_date_gte') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        const mDate = convertDateToMoment(currentValue);
        whereAnd.push({
          [columnName]: {
            $gte: mDate.toDate()
          }
        });
      }
    }
    else {
      const mDate = convertDateToMoment(value);
      whereAnd.push({
        [columnName]: {
          $gte: mDate.toDate()
        }
      });
    }
  }
  else if (operatorName === '_date_lt') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        const mDate = convertDateToMoment(currentValue);
        whereAnd.push({
          [columnName]: {
            $lt: mDate.toDate()
          }
        });
      }
    }
    else {
      const mDate = convertDateToMoment(value);
      whereAnd.push({
        [columnName]: {
          $lt: mDate.toDate()
        }
      });
    }
  }
  else if (operatorName === '_date_lte') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        const mDate = convertDateToMoment(currentValue);
        whereAnd.push({
          [columnName]: {
            $lte: mDate.toDate()
          }
        });
      }
    }
    else {
      const mDate = convertDateToMoment(value);
      whereAnd.push({
        [columnName]: {
          $lte: mDate.toDate()
        }
      });
    }
  }
  else if (operatorName === '_and') {
    const andOperatorNames = Object.keys(value[columnName]);
    for (const andOperatorName of andOperatorNames) {
      const andValue = value[columnName][andOperatorName];
      const res = parseOperator(columnName, andOperatorName, andValue);
      whereAnd.push(...res.$and);
    }
  }
  else if (operatorName === '_or') {
    const orOperatorNames = Object.keys(value[columnName]);
    for (const orOperatorName of orOperatorNames) {
      const orValue = value[columnName][orOperatorName];
      const res = parseOperator(columnName, orOperatorName, orValue);
      whereOr.push(...res.$and);
    }
  }
  else if (operatorName === '_in') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        if (currentValue) {
          whereAnd.push({
            [columnName]: {
              $in: currentValue.split(',')
            }
          });
        }
      }
    }
    else if (value) {
      whereAnd.push({
        [columnName]: {
          $in: value.split(',')
        }
      });
    }
  }
  else if (operatorName === '_objid_in') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        if (currentValue) {
          whereAnd.push({
            [columnName]: {
              $in: currentValue.split(',').map((v) => new mongoose.Types.ObjectId(v))
            }
          });
        }
      }
    }
    else if (value) {
      whereAnd.push({
        [columnName]: {
          $in: value.split(',').map((v) => new mongoose.Types.ObjectId(v))
        }
      });
    }
  }
  else if (operatorName === '_num_in') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        if (currentValue) {
          whereAnd.push({
            [columnName]: {
              $in: currentValue.split(',').map((v) => Number(v))
            }
          });
        }
      }
    }
    else if (value) {
      whereAnd.push({
        [columnName]: {
          $in: value.split(',').map((v) => Number(v))
        }
      });
    }
  }
  else if (operatorName === '_nin') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        if (currentValue) {
          whereAnd.push({
            [columnName]: {
              $nin: currentValue.split(',')
            }
          });
        }
      }
    }
    else if (value) {
      whereAnd.push({
        [columnName]: {
          $nin: value.split(',')
        }
      });
    }
  }
  else if (operatorName === '_objid_nin') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        if (currentValue) {
          whereAnd.push({
            [columnName]: {
              $nin: currentValue.split(',').map((v) => new mongoose.Types.ObjectId(v))
            }
          });
        }
      }
    }
    else if (value) {
      whereAnd.push({
        [columnName]: {
          $nin: value.split(',').map((v) => new mongoose.Types.ObjectId(v))
        }
      });
    }
  }
  else if (operatorName === '_num_nin') {
    if (Array.isArray(value)) {
      for (const currentValue of value) {
        if (currentValue) {
          whereAnd.push({
            [columnName]: {
              $nin: currentValue.split(',').map((v) => Number(v))
            }
          });
        }
      }
    }
    else if (value) {
      whereAnd.push({
        [columnName]: {
          $nin: value.split(',').map((v) => Number(v))
        }
      });
    }
  }

  return {
    $and: whereAnd,
    $or: whereOr
  };
};

export const parseFilter = (filter, opts = null) => {
  const whereAnd = [];
  const whereOr = [];
  const excludedFieldFilters = lodash.result(opts, 'excludedFieldFilters', []);
  const columnNames = Object.keys(filter);
  for (const columnName of columnNames) {
    const filterData = filter[columnName];
    const operatorNames = Object.keys(filterData);
    for (const operatorName of operatorNames) {
      const value = filterData[operatorName];
      let res = { $and: [], $or: [] };

      if (!excludedFieldFilters.includes(columnName)) {
        if (columnName === '_or' || columnName === '_and') {
          if (!excludedFieldFilters.includes(operatorName)) {
            res = parseOperator(operatorName, columnName, filterData);
          }
        }
        else {
          res = parseOperator(columnName, operatorName, value);
        }
        whereAnd.push(...res.$and);
        whereOr.push(...res.$or);
      }
    }
  }

  return {
    ...(whereAnd.length ? { $and: whereAnd } : {}),
    ...(whereOr.length ? { $or: whereOr } : {})
  };
};

export const generateQuery = (req, opts = null) => {
  const {
    query: {
      filter, search, page, limit: limitValue, searchBy, sort, aggregate, fields
    }
  } = req;

  let where = {};
  let skip;
  let limit;

  if (filter) where = parseFilter(filter, opts);

  if (search && searchBy) {
    const searchColumns = searchBy.split(',');

    if (!where.$and) where.$and = [];

    const orWhere = [];

    const escapedSearch = escapeRegExp(search);
    for (const searchColumn of searchColumns) {
      if (searchColumn.includes('AsDecimal')) {
        orWhere.push({
          [searchColumn]: Number(search)
        });
      }
      else {
        orWhere.push({
          [searchColumn]: {
            $regex: escapedSearch,
            $options: 'i'
          }
        });
      }
    }

    where.$and.push({
      $or: orWhere
    });
  }

  if (limitValue && page) {
    limit = parseInt(limitValue, 10);
    skip = parseInt(limitValue, 10) * (page - 1);
  }

  let sortData = null;

  const lowerFields = {
    sort: {},
    fields: []
  };

  if (sort) {
    const sortKeys = sort.split(',');
    sortData = {};

    for (const sortKey of sortKeys) {
      const sortKeyData = sortKey.split('-');
      if (sortKeyData.length === 1) {
        sortData[sortKey] = 1;
        lowerFields.sort[`${sortKey}_toLowerCase`] = 1;
        lowerFields.fields.push(sortKey);
      }
      else if (sortKeyData.length === 2) {
        sortData[sortKeyData[1]] = -1;
        lowerFields.sort[`${sortKeyData[1]}_toLowerCase`] = -1;
        lowerFields.fields.push(sortKeyData[1]);
      }
    }
  }

  const aggregates = [];

  const countAggregate = lodash.result(aggregate, 'count');

  if (countAggregate) {
    aggregates.push({
      $count: countAggregate
    });
  }

  if (fields) {
    const projection = {};
    const fieldKeys = fields.split(',');
    for (const fieldKey of fieldKeys) {
      projection[fieldKey] = 1;
    }
    aggregates.push({
      $project: projection
    });
  }

  return {
    where,
    skip,
    limit,
    page,
    sort: sortData,
    lowerFields,
    aggregates
  };
};

export const parseAggregationOption = (opts = null) => {
  const aggregateOpts = [];

  let sort = {};
  if (!opts || (opts && !opts.sort)) {
    sort.updatedAt = -1;
    sort._id = -1;
  }
  else {
    sort = {
      ...opts.lowerFields.sort,
      _id: -1
    };
  }

  const result = {};
  if (opts) {
    const {
      where: whereOpts, skip: skipOpt, limit: limitOpt, aggregation: aggregationOpts, aggregates
    } = opts;

    const projections = [];

    if (aggregationOpts) {
      const aggregations = [];
      for (const opt of aggregationOpts) {
        if (Object.keys(opt)[0] === '$project') projections.push(opt);
        else aggregations.push(opt);
      }
      result.aggregate = aggregations;
      aggregateOpts.push(...aggregations);
    }

    if (whereOpts && (whereOpts.$and || whereOpts.$or)) {
      result.where = whereOpts;
      aggregateOpts.push({ $match: whereOpts });
    }

    const addFieldsForSorting = {};
    if (opts.lowerFields) {
      for (const fieldName of opts.lowerFields.fields) {
        addFieldsForSorting[`${fieldName}_toLowerCase`] = {
          $cond: {
            if: { $isNumber: `$${fieldName}` },
            then: `$${fieldName}`,
            else: {
              $cond: {
                if: { $and: { $isArray: `$${fieldName}` } },
                then: { $map: { input: `$${fieldName}`, as: 'item', in: { $toLower: '$$item' } } },
                else: { $toLower: `$${fieldName}` }
              }
            }
          }
        };
      }
      if (opts.lowerFields.fields.length) aggregateOpts.push({ $addFields: addFieldsForSorting });
    }

    aggregateOpts.push({ $sort: sort });

    if (Array.isArray(aggregates)) {
      aggregateOpts.push(...aggregates);
    }

    aggregateOpts.push(...projections);

    if (typeof skipOpt === 'number') aggregateOpts.push({ $skip: skipOpt });

    if (typeof limitOpt === 'number') {
      aggregateOpts.push({ $limit: limitOpt });
      result.limit = limitOpt;
    }
  }
  else {
    aggregateOpts.push({ $sort: sort });
  }

  return {
    ...result,
    aggregateOpts
  };
};

export const getDatas = async (Model, opts) => {
  const options = parseAggregationOption(opts);

  const isWithMeta = lodash.result(opts, 'isWithMeta', false);
  const page = lodash.result(opts, 'page', 0);

  if (isWithMeta) {
    const datas = await Model.aggregate(options.aggregateOpts).exec();

    const [countResult] = await Model.aggregate([
      ...(options.aggregate ? options.aggregate : []),
      ...(options.where ? [{ $match: options.where }] : []),
      { $group: { _id: null, n: { $sum: 1 } } }
    ]);

    const count = countResult ? countResult.n : 0;

    const totalPage = Math.ceil(count / options.limit) || 0;

    const meta = {
      totalData: count,
      totalPage,
      limit: options.limit || 0,
      page: Number(page)
    };

    return {
      datas,
      meta
    };
  }
  return Model.aggregate(options.aggregateOpts).exec();
};

export default function noop() {}
