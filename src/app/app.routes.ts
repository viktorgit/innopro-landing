import { Routes } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';
import { Navigation } from './shared/types/menu';
import { WhyUsComponent } from './pages/why-us/why-us.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { WhatWeDoComponent } from './pages/what-we-do/what-we-do.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ServiceComponent } from './pages/service/service.component';

export const routes: Routes = [{
        path: '',
        loadComponent: () => IntroComponent,
    },
    {
        path: Navigation.WHY_US,
        loadComponent: () => WhyUsComponent,
    },
    {
        path: Navigation.CONTACTS,
        loadComponent: () => ContactsComponent,
    },
    {
        path: Navigation.WHAT_WE_DO,
        loadComponent: () => WhatWeDoComponent,
    },
    {
        path: Navigation.REVIEWS,
        loadComponent: () => ReviewsComponent,
    },
    {
        path: Navigation.SERVICE,
        loadComponent: () => ServiceComponent,
    }
];
