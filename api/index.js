/**
 * Entry point of the Express application.
 * Sets up middleware, routes, and starts the server.
 */

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const contactRoutes = require('./routes/contact');


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
const budgetCategoryRoutes = require('./routes/budgetcategory');
const callDateRoutes = require('./routes/calldate');
const agNoticeSentPersonRoutes = require('./routes/agnoticesentperson');
const chargeCallRoutes = require('./routes/chargecall');
const chargePaymentRoutes = require('./routes/chargepayment');
const chargeLineRoutes = require('./routes/chargeline');
const agMinuteRoutes = require('./routes/agminute');
const invoicePaymentRoutes = require('./routes/invoicepayment');
const agResolutionPersonRoutes = require('./routes/agresolutionperson');
const agMinutesPresencePersonRoutes = require('./routes/agminutespresenceperson');
const invoiceRoutes = require('./routes/invoice');


const errorController = require('./controllers/error');

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

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
app.use('/api/v1/units', unitRoutes);
app.use('/api/v1/unitunitgroups', unitUnitGroupRoutes);
app.use('/api/v1/agnotices', agNoticeRoutes);
app.use('/api/v1/agresolutions', agResolutionsRoutes);
app.use('/api/v1/budgetcategories', budgetCategoryRoutes);
app.use('/api/v1/calldates', callDateRoutes);
app.use('/api/v1/agnoticesentpersons', agNoticeSentPersonRoutes);
app.use('/api/v1/chargecalls', chargeCallRoutes);
app.use('/api/v1/chargepayments', chargePaymentRoutes);
app.use('/api/v1/chargelines', chargeLineRoutes);
app.use('/api/v1/agminutes', agMinuteRoutes);
app.use('/api/v1/invoicepayments', invoicePaymentRoutes);
app.use('/api/v1/agresolutionpersons', agResolutionPersonRoutes);
app.use('/api/v1/agminutespresencepersons', agMinutesPresencePersonRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api', contactRoutes);

/**
 * 

app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/documentcategories', auth, documentCategoryRoutes);
app.use('/api/v1/documents', auth, documentRoutes);
app.use('/api/v1/persons', auth, personRoutes);
app.use('/api/v1/roles', auth, roleRoutes);
app.use('/api/v1/unitgroups', auth, unitgroupRoutes);
app.use('/api/v1/units', auth, unitRoutes);
app.use('/api/v1/unitunitgroups', auth, unitUnitGroupRoutes);
app.use('/api/v1/agnotices', auth, agNoticeRoutes);
app.use('/api/v1/agresolutions', auth, agResolutionsRoutes);
app.use('/api/v1/agresolutionbudgets', auth, agResolutionBudgetRoutes);
app.use('/api/v1/budgetcategories', auth, budgetCategoryRoutes);
app.use('/api/v1/calldates', auth, callDateRoutes);
app.use('/api/v1/agnoticesentpersons', auth, agNoticeSentPersonRoutes);
 */


// Error handlers
app.use(errorController.get404);
app.use(errorController.get500);

// Start the server
app.listen(port, () => console.log(`Listening to port ${port}`));
