import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateRowComponent } from './create-row/create-row.component';
import { RowListComponent } from './row-list/row-list.component';
import { RowStatisticsComponent } from './row-statistics/row-statistics.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/list.reducer';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

// Material components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    CreateRowComponent,
    RowListComponent,
    RowStatisticsComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forRoot({
      listState: reducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
