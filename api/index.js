/**
 * Entry point of the Express application.
 * Sets up middleware, routes, and starts the server.
 */

const express = require('express');
const cors = require('cors');


const { auth, isManager, isAssistant } = require('./util/auth')

const loginRoutes = require('./routes/login');
const documentRoutes = require('./routes/document');
const documentCategoryRoutes = require('./routes/documentcategory');
const personRoutes = require('./routes/person');
const roleRoutes = require('./routes/roles');
const unitgroupRoutes = require('./routes/unitgroup');
const unitRoutes = require('./routes/unit');
const unitUnitGroupRoutes = require('./routes/unitunitgroup');
const agNoticeRoutes = require('./routes/agnotice');
const agResolutionsRoutes = require('./routes/agresolution');
const agResolutionBudgetRoutes = require('./routes/agresolutionbudget');
const budgetCategoryRoutes = require('./routes/budgetcategory');
const callDateRoutes = require('./routes/calldate');
const agResolutionBudgetCallDateRoutes = require('./routes/agresolutionbudgetcalldate');

const errorController = require('./controllers/error');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors({
  origin: true, // to be changed in production
  credentials: true
}));

// Route group for operations
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/documentcategories', documentCategoryRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/persons', personRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/unitgroups', unitgroupRoutes);
/** app.use('/api/v1/unitgroups', auth, isAssistant, unitgroupRoutes);*/
app.use('/api/v1/units', unitRoutes);
app.use('/api/v1/unitunitgroups', unitUnitGroupRoutes);
app.use('/api/v1/agnotices', agNoticeRoutes);
app.use('/api/v1/agresolutions', agResolutionsRoutes);
app.use('/api/v1/agresolutionbudgets', agResolutionBudgetRoutes);
app.use('/api/v1/budgetcategories', budgetCategoryRoutes);
app.use('/api/v1/calldates', callDateRoutes);
app.use('/api/v1/agresolutionbudgetcalldates', agResolutionBudgetCallDateRoutes);

// Error handlers
app.use(errorController.get404);
app.use(errorController.get500);

// Start the server
app.listen(port, () => console.log(`Listening to port ${port}`));
