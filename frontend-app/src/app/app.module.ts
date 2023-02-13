import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarUserInfoComponent } from './sidebar/sidebar-user-info/sidebar-user-info.component';
import { SalesComponent } from './sales/sales.component';
import { DirectoryComponent } from './directory/directory.component';
import { DirectoryHeaderComponent } from './directory/directory-header/directory-header.component';
import { DirectoryMainComponent } from './directory/directory-main/directory-main.component';
import { DirectoryEditComponent } from './directory/directory-edit/directory-edit.component';
import { DirectoryViewComponent } from './directory/directory-view/directory-view.component';
import { DirectoryAddComponent } from './directory/directory-add/directory-add.component';
import { HeaderControlsComponent } from './directory/header-controls/header-controls.component';
import { StoreControlsComponent } from './store/store-controls/store-controls.component';
import { StoreTradeComponent } from './store/store-trade/store-trade.component';
import { StoreHeaderComponent } from './store/store-header/store-header.component';
import { StoreWriteOffComponent } from './store/store-write-off/store-write-off.component';
import { StoreAcceptanceComponent } from './store/store-acceptance/store-acceptance.component';
import { StoreAddComponent } from './store/store-acceptance/store-add/store-add.component';
import { StoreEditComponent } from './store/store-acceptance/store-edit/store-edit.component';
import { StoreMainComponent } from './store/store-acceptance/store-main/store-main.component';

import { FilterNamePipe } from './pipes/filter-names';
import { SuppliersComponent } from './supplies/suppliers/suppliers.component';
import { SuppliersMainComponent } from './supplies/suppliers/suppliers-main/suppliers-main.component';
import { SuppliersAddComponent } from './supplies/suppliers/suppliers-add/suppliers-add.component';
import { SuppliersEditComponent } from './supplies/suppliers/suppliers-edit/suppliers-edit.component';
import { SupplierViewComponent } from './supplies/suppliers/supplier-view/supplier-view.component';
import { SuppliesHeaderComponent } from './supplies/suppliers/supplies-header/supplies-header.component';
import { SuppliesControlsComponent } from './supplies/suppliers/supplies-controls/supplies-controls.component';
import { ContractsComponent } from './supplies/contracts/contracts.component';
import { ContractsMainComponent } from './supplies/contracts/contracts-main/contracts-main.component';
import { ContractsHeaderComponent } from './supplies/contracts/contracts-header/contracts-header.component';
import { ContractsControlsComponent } from './supplies/contracts/contracts-controls/contracts-controls.component';
import { ContractsAddComponent } from './supplies/contracts/contracts-add/contracts-add.component';
import { AddSubGroupComponent } from './supplies/contracts/contracts-add/add-sub-group/add-sub-group.component';
import { ContractsEditComponent } from './supplies/contracts/contracts-edit/contracts-edit.component';
import { ContractsViewComponent } from './supplies/contracts/contracts-view/contracts-view.component';
import { DeliveriesComponent } from './supplies/deliveries/deliveries.component';
import { DeliveriesMainComponent } from './supplies/deliveries/deliveries-main/deliveries-main.component';
import { UpdateDeliveriesService } from './servises/supplies-servises/updatingDeliveriesData/update-deliveries.service'
import { HttpActionsService } from './servises/http-actions/http-actions.service'
import { SharingSuppliesDataService } from './servises/supplies-servises/sharing-supplies-data.service';
import { SalesMainComponent } from './sales/sales-main/sales-main.component';
import { SalesBasketComponent } from './sales/sales-basket/sales-basket.component';
import { SalesHeaderComponent } from './sales/sales-header/sales-header.component';
import { AddGroupComponent } from './sales/sales-main/add-group/add-group.component';
import { ViewOrderComponent } from './sales/view-order/view-order.component';
import { EditOrderComponent } from './sales/edit-order/edit-order.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsHeaderComponent } from './reports/reports-header/reports-header.component';
import { ReportsContractsComponent } from './reports/reports-contracts/reports-contracts.component';
import { ReportsSalesComponent } from './reports/reports-sales/reports-sales.component';
import { ReportsWriteOffComponent } from './reports/reports-write-off/reports-write-off.component';
import { ReportsReturnsComponent } from './reports/reports-returns/reports-returns.component';
import { ViewOrderReportComponent } from './reports/reports-sales/view-order-report/view-order-report.component';
import { SalesMonthReportComponent } from './reports/reports-sales/sales-month-report/sales-month-report.component';
import { ViewWriteOffReportComponent } from './reports/reports-write-off/view-write-off-report/view-write-off-report.component';
import { ViewReturnReportComponent } from './reports/reports-returns/view-return-report/view-return-report.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { UpdatingTradeStoreDataService } from './servises/store-servises/updating-trade-store-data/updating-trade-store-data.service'
import { SharingStoreDataService } from './servises/store-servises/sharing-store-data.service';
import { ViewContractReportComponent } from './reports/reports-contracts/view-contract-report/view-contract-report.component'




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DirectoryComponent,
    SalesComponent,
    SidebarMenuComponent,
    SidebarUserInfoComponent,
    DirectoryHeaderComponent,
    DirectoryMainComponent,
    DirectoryEditComponent,
    DirectoryViewComponent,
    DirectoryAddComponent,
    HeaderControlsComponent,
    FilterNamePipe,
    StoreControlsComponent,
    StoreTradeComponent,
    StoreHeaderComponent,
    StoreWriteOffComponent,
    StoreAcceptanceComponent,
    StoreAddComponent,
    StoreEditComponent,
    StoreMainComponent,
    SuppliersComponent,
    SuppliersMainComponent,
    SuppliersAddComponent,
    SuppliersEditComponent,
    SupplierViewComponent,
    SuppliesHeaderComponent,
    SuppliesControlsComponent,
    ContractsComponent,
    ContractsMainComponent,
    ContractsHeaderComponent,
    ContractsControlsComponent,
    ContractsAddComponent,
    AddSubGroupComponent,
    ContractsEditComponent,
    ContractsViewComponent,
    DeliveriesComponent,
    DeliveriesMainComponent,
    SalesMainComponent,
    SalesBasketComponent,
    SalesHeaderComponent,
    AddGroupComponent,
    ViewOrderComponent,
    EditOrderComponent,
    ReportsComponent,
    ReportsHeaderComponent,
    ReportsContractsComponent,
    ReportsSalesComponent,
    ReportsWriteOffComponent,
    ReportsReturnsComponent,
    ViewOrderReportComponent,
    SalesMonthReportComponent,
    ViewWriteOffReportComponent,
    ViewReturnReportComponent,
    AuthenticationComponent,
    RegistrationComponent,
    ViewContractReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UpdateDeliveriesService,
              HttpActionsService,
              SharingSuppliesDataService,
              AuthGuard,
              UpdatingTradeStoreDataService,
              SharingStoreDataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }