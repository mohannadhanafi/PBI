const express = require('express');

const overview = require('./overview');
const generalSettings = require('./generalSettings');
const employees = require('./employees');
const addEmployee = require('./addEmployee');
const carts = require('./cart');
const setting = require('./setting');
const convertToSnake = require('../middleware/convertCamelToSnake');
const editEmployee = require('./editEmployee');
const errors = require('./errors');
const reports = require('./reports');
const employeeDetalis = require('./employeeDetails');
const logout = require('./logout');
const login = require('./login');
const error = require('./errors');
const autheticate = require('../middleware/authentication');

const router = express.Router();

router.get('/login', login.get);
router.post('/login', login.post);
router.use(autheticate);
router.get('/', overview.get);
router.get('/generalSetting', generalSettings.get);
router.post('/generalSetting', convertToSnake, generalSettings.post);
router.get('/employees', employees.get);
router.get('/addEmployee', addEmployee.get);
router.post('/addEmployee', convertToSnake, addEmployee.post);
router.put('/employee', convertToSnake, editEmployee.put);
router.get('/logout', logout.get);
router.get('/carts', carts.get);

router.get('/reports', reports.get);
router.post('/reports', reports.post);
router.get('/employee/:id', employeeDetalis.get);
router.get('/setting', setting.get);
router.post('/setting', setting.post);
router.delete('/carts', carts.delete);
router.post('/carts', carts.post);
router.put('/carts', carts.put);

router.use(errors.client);
router.use(errors.server);

router.use(error.client);
router.use(error.server);

module.exports = router;
