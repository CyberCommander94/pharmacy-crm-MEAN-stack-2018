import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Directory } from "../../models/directory";
import { Drug } from '../../models/drug';
import { Store } from "../../models/store";
import { StoreItem } from "../../models/storeItem";
import { Supplier } from "../../models/supplies/supplier";
import { SupplierDrug } from "../../models/supplies/supplierDrug";
import { Supplies } from "../../models/supplies/supplies";
import { Contract } from "../../models/supplies/contract";
import { Delivery } from "../../models/supplies/delivery";
import { Order } from "../../models/order";
import { User } from "../../models/user";
import { Reports } from '../../models/reports';
import { WriteOffDrug } from '../../models/writeOffDrug';



@Injectable()
export class HttpActionsService {

  constructor(private http: HttpClient) { }

  //Users

  getUserData(data: any) {
    return this.http.post<User>('http://localhost:3000/api/users/', data);
  };

  getUserByLogin(data: any) {
    return this.http.post<User>('http://localhost:3000/api/usersLogin/', data);
  };

  addUserData(data: User) {
    return this.http.post<User>('http://localhost:3000/api/users/addUser/', data);
  };

  /////////////////directory

  getDirectoryData() {
    return this.http.get<Directory>('http://localhost:3000/api/directory/');
  };

  editDirectoryData(dir: Directory) {
    return this.http.put<Directory>('http://localhost:3000/api/directory/editDirectory', dir);
  };

  getDrugItem(id: String){
    return this.http.get<Drug>('http://localhost:3000/api/directory/viewitem/' + id);
  };

  addDrug(newDrug: Drug) {
    return this.http.post<Drug>('http://localhost:3000/api/directory/additem', newDrug);
  };

  deleteDrug(id: String){
    return this.http.delete<Drug>('http://localhost:3000/api/directory/deleteItem/' + id);
  };

  editDrug(newDrug: Drug, id: String) {
    return this.http.put<Drug>('http://localhost:3000/api/directory/edititem/' + id, newDrug);
  };

  /////////////////store

  getAccStoreData() {
    return this.http.get<Store>('http://localhost:3000/api/acceptance-store/');
  };

  getStoreItem(id: String){
    return this.http.get<StoreItem>('http://localhost:3000/api/acceptance-store/viewitem/' + id);
  };

  addAccStoreItem(Item: StoreItem) {
    return this.http.post<StoreItem>('http://localhost:3000/api/acceptance-store/additem/', Item);
  };

  deleteAccItem(id: String){
    return this.http.delete<StoreItem>('http://localhost:3000/api/acceptance-store/deleteItem/' + id);
  };

  editStoreItem(newItem: StoreItem, id: String){
    return this.http.put<StoreItem>('http://localhost:3000/api/acceptance-store/edititem/' + id, newItem);
  };

  editTradeStoreItem(newItem: StoreItem, id: String){
    return this.http.put<StoreItem>('http://localhost:3000/api/trade-store/edititem/' + id, newItem);
  };

  getTradeStoreData() {
    return this.http.get<Store>('http://localhost:3000/api/trade-store/');
  };

  addTradeData(Item: StoreItem) {
    return this.http.post<StoreItem>('http://localhost:3000/api/trade-store/additem/', Item);
  };

  deleteTradeItem(id: String){
    return this.http.delete<StoreItem>('http://localhost:3000/api/trade-store/deleteItem/' + id);
  };

  getWriteOffStoreData() {
    return this.http.get<Store>('http://localhost:3000/api/write-off-store/');
  };

  addWriteOffData(Item: StoreItem) {
    return this.http.post<StoreItem>('http://localhost:3000/api/write-off-store/additem/', Item);
  };

  deleteWriteOffItem(id: String){
    return this.http.delete<StoreItem>('http://localhost:3000/api/write-off-store/deleteItem/' + id);
  };

  ///////////supplies

  getSuppliesData(){
    return this.http.get<Supplies>('http://localhost:3000/api/supplies/');
  };

  getSupplierInfo(id: String){
    return this.http.get<Supplier>('http://localhost:3000/api/supplies/suppliers/viewInfo/' + id);
  };

  addSupplier(newSupplier: Supplier) {
    return this.http.post<Supplier>('http://localhost:3000/api/supplies/suppliers/addSupplier/', newSupplier);
  };

  editSupplierInfo(newSupplier: Supplier, id: String) {
    return this.http.put<Supplier>('http://localhost:3000/api/supplies/suppliers/editSupplier/' + id, newSupplier);
  };

  deleteSupplier(id: String){
    return this.http.delete<Supplier>('http://localhost:3000/api/supplies/suppliers/deleteSupplier/' + id);
  };

  addSupplierDrug(newDrug: SupplierDrug ,supplierId: String){
    return this.http.post<SupplierDrug>('http://localhost:3000/api/supplies/supplier/viewInfo/addDrug/' + supplierId, newDrug)
  };

  editSupplierDrug(newDrug: SupplierDrug, supplierId: String, drugId: String){
    return this.http.put<SupplierDrug>('http://localhost:3000/api/supplies/supplier/' + supplierId + '/drugs/editDrug/' + drugId, newDrug)
  };

  deleteSupplierDrug(supplierId: String, drugId: String){
    return this.http.delete<SupplierDrug>('http://localhost:3000/api/supplies/supplier/' + supplierId + '/drugs/deleteDrug/' + drugId)
  };

  addContract(newContract: Contract){
    return this.http.post<Contract>('http://localhost:3000/api/supplies/contracts/addContract/', newContract);
  };

  getContractInfo(id: String){
    return this.http.get<Contract>('http://localhost:3000/api/supplies/contracts/viewContractInfo/' + id);
  };

  editContractInfo(newContract: Contract, id: String) {
    return this.http.put<Contract>('http://localhost:3000/api/supplies/contracts/editContract/' + id, newContract);
  };

  deleteContract(id: String){
    return this.http.delete<Contract>('http://localhost:3000/api/supplies/contracts/deleteContract/' + id);
  };

  deleteDelivery(id: String){
    return this.http.delete<Delivery>('http://localhost:3000/api/supplies/deliveries/deleteDelivery/' + id);
  };

  addDelivery(newDelivery: Delivery){
    return this.http.post<Delivery>('http://localhost:3000/api/supplies/deliveries/addDelivery/', newDelivery);
  };

  editDelivery(newDelivery: Delivery, id: String) {
    return this.http.put<Delivery>('http://localhost:3000/api/supplies/deliveries/editDelivery/' + id, newDelivery);
  };

  ///////////sales

  getSalesData(){
    return this.http.get('http://localhost:3000/api/sales/getSales/');
  };

  getSalesItem(id: String){
    return this.http.get<Order>('http://localhost:3000/api/sales/getSale/' + id);
  };

  deleteSalesData(id: String){
    return this.http.delete<Order>('http://localhost:3000/api/sales/deleteSale/' + id);
  };

  addSaleData(newSale: Order) {
    return this.http.post<Order>('http://localhost:3000/api/sales/addSale/', newSale);
  };

  editSaleData(newSale: Order, id: String) {
    return this.http.put<Order>('http://localhost:3000/api/sales/editSale/' + id, newSale);
  };

  ///////////reports

  getReportsData(){
    return this.http.get<Reports>('http://localhost:3000/api/reports/');
  };

  addSaleReport(newReport: Order){
    return this.http.post<Order>('http://localhost:3000/api/reports/addSalesReport/', newReport);
  }

  deleteSaleReport(id: String){
    return this.http.delete<Order>('http://localhost:3000/api/reports/deleteSalesReport/' + id);
  };

  addWriteOffReport(newReport: WriteOffDrug){
    return this.http.post<WriteOffDrug>('http://localhost:3000/api/reports/addWriteOffReport', newReport);
  }

  deleteWriteOffReport(id: String){
    return this.http.delete<WriteOffDrug>('http://localhost:3000/api/reports/deleteWriteOffReport/' + id);
  };

  addReturnReport(newReport: WriteOffDrug){
    return this.http.post<WriteOffDrug>('http://localhost:3000/api/reports/addReturnReport', newReport);
  }

  deleteReturnReport(id: String){
    return this.http.delete<WriteOffDrug>('http://localhost:3000/api/reports/deleteReturnReport/' + id);
  };

  editReports(newReports: Reports){
    return this.http.put<Reports>('http://localhost:3000/api/reports/editReports', newReports);
  }
}