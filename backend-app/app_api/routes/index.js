var express = require('express');
var router = express.Router();
var ctrlDirectory = require('../controllers/directory');
var ctrlAcceptanceStore = require('../controllers/store/acceptance-store');
var ctrlTradeStore = require('../controllers/store/trade-store');
var ctrlWriteOffStore = require('../controllers/store/write-off-store');
var ctrlSuppliers = require('../controllers/supplies/suppliers');
var ctrlContracts = require('../controllers/supplies/contracts');
var ctrlDeliveries = require('../controllers/supplies/deliveries');
var ctrlSales = require('../controllers/sales');
var ctrlReports = require('../controllers/reports');
var ctrlUsers = require('../controllers/users');

//directory
    router.get('/directory', ctrlDirectory.directory);
    router.put('/directory/editDirectory', ctrlDirectory.doEditDirectory);
    router.post('/directory/additem', ctrlDirectory.doAddItem);
    router.put('/directory/edititem/:drugid', ctrlDirectory.doEditItem);
    router.get('/directory/viewitem/:drugid', ctrlDirectory.viewItem);
    router.delete('/directory/deleteItem/:drugid', ctrlDirectory.doDeleteItem);

//store

    //acceptance-store
    router.get('/acceptance-store', ctrlAcceptanceStore.acceptanceStore);
    // router.put('/acceptance-store/editAccStore', ctrlAcceptanceStore.doEditAccStore);
    router.get('/acceptance-store/viewitem/:itemid', ctrlAcceptanceStore.viewStoreItem);
    router.post('/acceptance-store/additem', ctrlAcceptanceStore.doAddStoreItem);
    router.put('/acceptance-store/edititem/:itemid', ctrlAcceptanceStore.doEditItem);
    router.delete('/acceptance-store/deleteItem/:itemid', ctrlAcceptanceStore.doDeleteItem);

    //trade-store
    router.get('/trade-store', ctrlTradeStore.tradeStore);
    // router.put('/trade-store/editTradeStore', ctrlAcceptanceStore.doEditTradeStore);
    router.post('/trade-store/additem', ctrlTradeStore.tradeStoreAdd);
    router.put('/trade-store/edititem/:itemid', ctrlTradeStore.doEditItem);
    router.delete('/trade-store/deleteItem/:itemid', ctrlTradeStore.doDeleteItem);

    //write-off-store
    router.get('/write-off-store', ctrlWriteOffStore.writeoffStore);
    // router.put('/write-off-store/editWriteOffStore', ctrlAcceptanceStore.doEditWriteOffStore);
    router.post('/write-off-store/additem', ctrlWriteOffStore.writeOffStoreAdd);
    router.delete('/write-off-store/deleteItem/:itemid', ctrlWriteOffStore.doDeleteItem);


//supplies

    router.get('/supplies', ctrlSuppliers.supplies);
    // router.put('/supplies/editSupplies', ctrlSuppliers.editSupplies);

    //suppliers
    router.get('/supplies/suppliers/viewInfo/:supplierId', ctrlSuppliers.viewSupplierInfo);
    router.post('/supplies/suppliers/addSupplier', ctrlSuppliers.addSupplier);
    router.put('/supplies/suppliers/editSupplier/:supplierId', ctrlSuppliers.editSupplier);
    router.delete('/supplies/suppliers/deleteSupplier/:supplierId', ctrlSuppliers.deleteSupplier);
    router.post('/supplies/supplier/viewInfo/addDrug/:supplierId', ctrlSuppliers.addSupplierDrug);
    router.put('/supplies/supplier/:supplierId/drugs/editDrug/:drugId', ctrlSuppliers.editSupplierDrug);
    router.delete('/supplies/supplier/:supplierId/drugs/deleteDrug/:drugId', ctrlSuppliers.deleteSupplierDrug);

    //contracts
    router.get('/supplies/contracts/viewContractInfo/:contractId', ctrlContracts.viewContractInfo);
    router.post('/supplies/contracts/addContract', ctrlContracts.addContract);
    router.put('/supplies/contracts/editContract/:contractId', ctrlContracts.editContract);
    router.delete('/supplies/contracts/deleteContract/:contractId', ctrlContracts.deleteContract);

    //deliveries
    router.delete('/supplies/deliveries/deleteDelivery/:deliveryId', ctrlDeliveries.deleteDelivery);
    router.post('/supplies/deliveries/addDelivery', ctrlDeliveries.addDelivery);
    router.put('/supplies/deliveries/editDelivery/:deliveryId', ctrlDeliveries.editDelivery);

//sales
    router.get('/sales/getSales', ctrlSales.getSales);
    router.get('/sales/getSale/:saleId', ctrlSales.getSale);
    router.post('/sales/addSale', ctrlSales.addSale);
    router.put('/sales/editSale/:saleId', ctrlSales.editSale);
    router.delete('/sales/deleteSale/:saleId', ctrlSales.deleteSale);

//reports
    router.get('/reports', ctrlReports.getReports);
    router.post('/reports/addSalesReport', ctrlReports.addSalesReport);
    router.delete('/reports/deleteSalesReport/:reportId', ctrlReports.deleteSalesReport);
    router.post('/reports/addWriteOffReport', ctrlReports.addWriteOffReport);
    router.delete('/reports/deleteWriteOffReport/:reportId', ctrlReports.deleteWriteOffReport);
    router.post('/reports/addReturnReport', ctrlReports.addReturnReport);
    router.delete('/reports/deleteReturnReport/:reportId', ctrlReports.deleteReturnReport);
    router.put('/reports/editReports', ctrlReports.editReports);

//users

    router.post('/users', ctrlUsers.getUser);
    router.post('/usersLogin', ctrlUsers.getUserByLogin);
    router.post('/users/addUser', ctrlUsers.addUser);

module.exports = router;