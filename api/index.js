/**
 * Entry point of the Express application.
 * Sets up middleware, routes, and starts the server.
 */

const express = require('express');
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

/** 
 * Middleware to handle Cross-Origin Resource Sharing (CORS) headers.
 * This allows the API to be called from different origins (domains).
 */
app.use((req, res, next) => {
  // Allow requests from any origin - '*' should be replaced with frontend domain in production for more security
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Specify the HTTP methods that are allowed when accessing the resource
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS' // ps: OPTIONS for preflight requests
  );

  // Specify which headers can be used during the actual request
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Respond immediately to OPTIONS requests (preflight) with status 200 (OK)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  // Pass control to the next middleware or route handler
  next();
});

// Route group for document operations
app.use('/api/v1/documentcategories', documentCategoryRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/persons', personRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/unitgroups', unitgroupRoutes);
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
