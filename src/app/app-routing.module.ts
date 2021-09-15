import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'phone-verify',
    loadChildren: () => import('./phone-verify/phone-verify.module').then( m => m.PhoneVerifyPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'showroom',
    loadChildren: () => import('./showroom/showroom.module').then( m => m.ShowRoomPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'selected-veicle',
    loadChildren: () => import('./selected-veicle/selected-veicle.module').then( m => m.SelectedVeiclePageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'booking-confirmed',
    loadChildren: () => import('./booking-confirmed/booking-confirmed.module').then( m => m.BookingConfirmedPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'find-us',
    loadChildren: () => import('./find-us/find-us.module').then( m => m.FindUsPageModule)
  },
  {
    path: 'showroom-list',
    loadChildren: () => import('./showroom-list/showroom-list.module').then( m => m.ShowroomListPageModule)
  },
  {
    path: 'test-drive-registration',
    loadChildren: () => import('./test-drive-registration/test-drive-registration.module').then( m => m.TestDriveRegistrationPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'my-bookings',
    loadChildren: () => import('./my-bookings/my-bookings.module').then( m => m.MyBookingsPageModule)
  },
  {
    path: 'my-profile-edit',
    loadChildren: () => import('./my-profile-edit/my-profile-edit.module').then( m => m.MyProfileEditPageModule)
  },
  {
    path: 'vehicle-add',
    loadChildren: () => import('./vehicle-add/vehicle-add.module').then( m => m.VehicleAddPageModule)
  },
  {
    path: 'service-center',
    loadChildren: () => import('./service-center/service-center.module').then( m => m.ServiceCenterPageModule)
  },
  {
    path: 'damage-estimate',
    loadChildren: () => import('./damage-estimate/damage-estimate.module').then( m => m.DamageEstimatePageModule)
  },
  {
    path: 'damage-image-upload',
    loadChildren: () => import('./damage-image-upload/damage-image-upload.module').then( m => m.DamageImageUploadPageModule)
  },
  {
    path: 'damage-estimate-view',
    loadChildren: () => import('./damage-estimate-view/damage-estimate-view.module').then( m => m.DamageEstimateViewPageModule)
  },
  {
    path: 'damage-estimate-respond',
    loadChildren: () => import('./damage-estimate-respond/damage-estimate-respond.module').then( m => m.DamageEstimateRespondPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
