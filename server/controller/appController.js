const pool = require('../dbModel.js');

module.exports = {
  addApp: async (req, res, next) => {
    try {
      const {
        company,
        position,
        applied_on,
        company_email,
        company_number,
        id,
      } = req.body;
      console.log(req.body);
      await pool.query(
        'INSERT INTO Applications (company,position,applied_on,company_email,company_number,user_id) VALUES($1, $2, $3, $4, $5, $6)',
        [company, position, applied_on, company_email, company_number, id]
      );
      return next();
    } catch (err) {
      return next(err);
    }
  },
  getApp: async (req, res, next) => {
    try {
      const {id} = req.body;
      const users = await pool.query(
        'SELECT * FROM Applications WHERE user_id = $1',
        [id]
      );
      res.locals.data = users.rows;
      return next();
    } catch (err) {
      next(err);
    }
  },

  deleteApp: async (req, res, next) => {
    try {
      const {id} = req.body;
      await pool.query('DELETE * FROM Applications WHERE _id = $1', [id]);
      return next();
    } catch (err) {
      next(err);
    }
  },
};
