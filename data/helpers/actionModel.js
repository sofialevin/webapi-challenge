const db = require('../dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  // eslint-disable-next-line func-names
  async get(id) {
    const query = db('actions');

    if (id) {
      const action = await query.where('id', id)
        .first();
      if (action) {
        return mappers.actionToBody(action);
      }
      return action;
    }

    const actions = await query;
    // eslint-disable-next-line camelcase
    return actions.map((action_1) => mappers.actionToBody(action_1));
  },
  async insert(action) {
    const [id] = await db('actions')
      .insert(action);
    // eslint-disable-next-line no-return-await
    return await this.get(id);
  },
  // eslint-disable-next-line func-names
  async update(id, changes) {
    const count = await db('actions')
      .where('id', id)
      .update(changes);
    // eslint-disable-next-line no-return-await
    return await (count > 0 ? this.get(id) : null);
  },
  // eslint-disable-next-line func-names
  remove(id) {
    return db('actions')
      .where('id', id)
      .del();
  },
};
