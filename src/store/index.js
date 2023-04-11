import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
// import regReducer from './Slices/userRegistrationSlice';
 import settingReducer from './Slices/settingsSlice'
// import moduleReducer from './Slices/moduleSlice';
// import usersReducer from './Slices/usersSlice';
// import userGroupsReducer from './Slices/userGroupsSlice';
// import logsReducer from './Slices/logs';
// import apiKeysReducer from './Slices/apiKeysSlice';
// import appSettingsReducer from './Slices/appSettings';
// import paymentGateways from './Slices/paymentGateways';
// import smtpReducer from './Slices/smtp';
// import emailTemplatesReducer from './Slices/emailTemplates';
// import ProductsReducer from './Slices/products';
// import categoriesReducer from './Slices/categories';
// import brandsReducer from './Slices/brandsSlice';
// import departmentsReducer from './Slices/departmentsSlice';
// import transactionsReducer from './Slices/transactions';
// import invoicesReducer from './Slices/invoicesSlice';
// import notificationTemplatesReducer from './Slices/notification-templates';
// import reportsReducer from './Slices/reports';
// import whmcsReducer from './Slices/whmcs';
// import articlesReducer from './Slices/articles';
// import articlesFeedbackReducer from './Slices/articlesFeedback';
// import getArticleFeedbackCommentsReducer from './Slices/articleFeedbackComments';
// import articleCategoriesReducer from './Slices/articleCategories';
// import ordersReducer from './Slices/ordersSlice';
// import notificationsReducer from './Slices/notificationsSlice';
// import ticketsReducer from './Slices/ticketsSlice';
// import ticketCommentsReducer from './Slices/ticketCommentsSlice';
// import ticketRepliesReducer from './Slices/ticketRepliesSlice';
// import webHooks from './Slices/webhooks';
// import countSlice from './Slices/dataCount';
// import creditSlice from './Slices/creditsSlice';
// import invoiceOverviewSlice from './Slices/dashboard';
// import ScriptingSlice from './Slices/scripting';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // reg: regReducer,
     settings: settingReducer,
    // modules: moduleReducer,
    // users: usersReducer,
    // userGroups: userGroupsReducer,
    // logs: logsReducer,
    // apiKeys: apiKeysReducer,
    // appSettings: appSettingsReducer,
    // paymentGateways: paymentGateways,
    // smtps: smtpReducer,
    // emailTemplates: emailTemplatesReducer,
    // products: ProductsReducer,
    // categories: categoriesReducer,
    // brands: brandsReducer,
    // departments: departmentsReducer,
    // transactions: transactionsReducer,
    // articles: articlesReducer,
    // articlesFeedback: articlesFeedbackReducer,
    // articlesFeedbackComments: getArticleFeedbackCommentsReducer,
    // articleCategories: articleCategoriesReducer,
    // invoices: invoicesReducer,
    // notificationTemplates: notificationTemplatesReducer,
    // reports: reportsReducer,
    // whmcs: whmcsReducer,
    // orders: ordersReducer,
    // notifications: notificationsReducer,
    // tickets: ticketsReducer,
    // ticketComments: ticketCommentsReducer,
    // ticketReplies: ticketRepliesReducer,
    // webhooks: webHooks,
    // count: countSlice,
    // credits: creditSlice,
    // incomeOverview:invoiceOverviewSlice,
    // scripting: ScriptingSlice
  },
});
export const messageNotifications = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export * from './Actions';
export * from './Slices';

export default store;
