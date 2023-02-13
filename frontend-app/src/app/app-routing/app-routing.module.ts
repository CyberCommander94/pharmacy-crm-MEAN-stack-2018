import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { DirectoryComponent } from '../directory/directory.component';
import { StoreAcceptanceComponent } from '../store/store-acceptance/store-acceptance.component';
import { StoreTradeComponent } from '../store/store-trade/store-trade.component';
import { StoreAddComponent } from '../store/store-acceptance/store-add/store-add.component';
import { StoreMainComponent } from '../store/store-acceptance/store-main/store-main.component';
import { StoreEditComponent } from '../store/store-acceptance/store-edit/store-edit.component';
import { StoreWriteOffComponent } from '../store/store-write-off/store-write-off.component';
import { DirectoryMainComponent } from '../directory/directory-main/directory-main.component';
import { DirectoryViewComponent } from '../directory/directory-view/directory-view.component';
import { DirectoryEditComponent } from '../directory/directory-edit/directory-edit.component';
import { DirectoryAddComponent } from '../directory/directory-add/directory-add.component';
import { SuppliersComponent } from '../supplies/suppliers/suppliers.component';
import { SuppliersMainComponent } from '../supplies/suppliers/suppliers-main/suppliers-main.component';
import { SuppliersAddComponent } from '../supplies/suppliers/suppliers-add/suppliers-add.component';
import { SuppliersEditComponent } from '../supplies/suppliers/suppliers-edit/suppliers-edit.component';
import { SupplierViewComponent } from '../supplies/suppliers/supplier-view/supplier-view.component';
import { ContractsComponent } from '../supplies/contracts/contracts.component';
import { ContractsMainComponent } from '../supplies/contracts/contracts-main/contracts-main.component';
import { ContractsAddComponent } from '../supplies/contracts/contracts-add/contracts-add.component';
import { ContractsViewComponent } from '../supplies/contracts/contracts-view/contracts-view.component';
import { ContractsEditComponent } from '../supplies/contracts/contracts-edit/contracts-edit.component';
import { DeliveriesComponent } from '../supplies/deliveries/deliveries.component';
import { DeliveriesMainComponent } from '../supplies/deliveries/deliveries-main/deliveries-main.component';
import { SalesComponent } from '../sales/sales.component';
import { SalesMainComponent } from '../sales/sales-main/sales-main.component';
import { SalesBasketComponent } from '../sales/sales-basket/sales-basket.component';
import { ViewOrderComponent } from '../sales/view-order/view-order.component';
import { EditOrderComponent } from '../sales/edit-order/edit-order.component';
import { ReportsComponent } from '../reports/reports.component';
import { ReportsContractsComponent } from '../reports/reports-contracts/reports-contracts.component';
import { ReportsWriteOffComponent } from '../reports/reports-write-off/reports-write-off.component';
import { ReportsSalesComponent } from '../reports/reports-sales/reports-sales.component';
import { ReportsReturnsComponent } from '../reports/reports-returns/reports-returns.component';
import { SalesMonthReportComponent } from '../reports/reports-sales/sales-month-report/sales-month-report.component';
import { ViewOrderReportComponent } from '../reports/reports-sales/view-order-report/view-order-report.component';
import { ViewWriteOffReportComponent } from '../reports/reports-write-off/view-write-off-report/view-write-off-report.component';
import { ViewReturnReportComponent } from '../reports/reports-returns/view-return-report/view-return-report.component';
import { ViewContractReportComponent } from '../reports/reports-contracts/view-contract-report/view-contract-report.component';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthGuard } from '../auth.guard';


const appRoutes: Routes =[
  { path: '', component: DirectoryComponent, 
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'login', component: AuthenticationComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'main', component: DirectoryMainComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'directory', component: DirectoryComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'main', component: DirectoryMainComponent, canActivate: [AuthGuard]  },
      { path: 'viewItem/:id', component: DirectoryViewComponent, canActivate: [AuthGuard] },
      { path: 'addItem', component: DirectoryAddComponent, canActivate: [AuthGuard] },
      { path: 'editItem/:id', component: DirectoryEditComponent, canActivate: [AuthGuard] }
    ], canActivate: [AuthGuard] 
  },
  { path: 'sales', component: SalesComponent,
    children: [
      { path: 'main', component: SalesMainComponent, canActivate: [AuthGuard]  },
      { path: 'basket', component: SalesBasketComponent, canActivate: [AuthGuard]  },
      { path: 'viewOrder/:id', component: ViewOrderComponent, canActivate: [AuthGuard]  },
      { path: 'editOrder/:id', component: EditOrderComponent, canActivate: [AuthGuard]  },
    ], canActivate: [AuthGuard] 
  },
  { path: 'storeAcceptance', component: StoreAcceptanceComponent,
    children: [
      { path: 'main', component: StoreMainComponent, canActivate: [AuthGuard]  },
      { path: 'addItem', component: StoreAddComponent, canActivate: [AuthGuard] },
      { path: 'editItem/:id', component: StoreEditComponent, canActivate: [AuthGuard] },
    ], canActivate: [AuthGuard] 
  },
  { path: 'storeTrade', component: StoreTradeComponent, canActivate: [AuthGuard] },
  { path: 'storeWriteOff', component: StoreWriteOffComponent, canActivate: [AuthGuard] },
  { path: 'suppliers', component: SuppliersComponent,
    children: [
      { path: 'main', component: SuppliersMainComponent, canActivate: [AuthGuard] },
      { path: 'addSupplier', component: SuppliersAddComponent, canActivate: [AuthGuard]  },
      { path: 'editSupplierInfo/:id', component: SuppliersEditComponent, canActivate: [AuthGuard]  },
      { path: 'viewSupplierInfo/:id', component: SupplierViewComponent, canActivate: [AuthGuard]  }
    ], canActivate: [AuthGuard] 
  },
  { path: 'contracts', component: ContractsComponent,
    children: [
      { path: 'main', component: ContractsMainComponent, canActivate: [AuthGuard]  },
      { path: 'addContract', component: ContractsAddComponent, canActivate: [AuthGuard]  },
      { path: 'viewContractInfo/:id', component: ContractsViewComponent, canActivate: [AuthGuard]  },
      { path: 'editContract/:id', component: ContractsEditComponent, canActivate: [AuthGuard]  }
    ], canActivate: [AuthGuard] 
  },
  { path: 'deliveries', component: DeliveriesComponent,
    children: [
      { path: 'main', component: DeliveriesMainComponent, canActivate: [AuthGuard]  }
    ], canActivate: [AuthGuard] 
  },
  { path: 'reports', component: ReportsComponent,
    children: [
      { path: 'contractsReports', component: ReportsContractsComponent, canActivate: [AuthGuard] },
      { path: 'contractsReports/viewContractReport/:id', component: ViewContractReportComponent, canActivate: [AuthGuard] },
      { path: 'salesReports', component: ReportsSalesComponent, canActivate: [AuthGuard] },
      { path: 'salesReports/salesMonthReport', component: SalesMonthReportComponent, canActivate: [AuthGuard] },
      { path: 'salesReports/viewOrderReport/:id', component: ViewOrderReportComponent, canActivate: [AuthGuard] },
      { path: 'writeOffReports', component: ReportsWriteOffComponent, canActivate: [AuthGuard] },
      { path: 'writeOffReports/viewWriteOffReport/:id', component: ViewWriteOffReportComponent, canActivate: [AuthGuard]  },
      { path: 'returnsReports', component: ReportsReturnsComponent, canActivate: [AuthGuard] },
      { path: 'returnsReports/viewReturnsReport/:id', component: ViewReturnReportComponent, canActivate: [AuthGuard] }
    ], canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
