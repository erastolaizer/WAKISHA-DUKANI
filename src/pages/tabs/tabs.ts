import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { OurServicePage } from '../our-service/our-service';
import { OurDirectionPage } from '../our-direction/our-direction';
import { MorePage } from '../more/more';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OurDirectionPage;
  tab3Root = OurServicePage;
  tab4Root = MorePage;

  constructor() {

  }
}
