import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './QuickLinksWebPart.module.scss';
import * as strings from 'QuickLinksWebPartStrings';
import { sp } from "@pnp/sp";
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import { _Webs } from '@pnp/sp/webs/types';
import { IContextInfo, _Site } from '@pnp/sp/sites/types';
import { getRandomString, setup as pnpSetup } from "@pnp/common";
import * as $ from 'jquery';



export interface IQuickLinksWebPartProps {
  description: string;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {


  async onInit() {
    const _ = await super.onInit();
    // other init code may be present
    pnpSetup({
      spfxContext: this.context
    });
  }
  public render(): void {
    this.domElement.innerHTML = `
    <nav class="navbar d-none d-md-block">
              <ul class="navbar-nav w-100 text-capitalize p-4">
                <li class="nav-item bord-btm">
                  <a class="nav-link text-light" href="#">about us</a>
                </li>
                <li class="nav-item bord-btm">
                  <a class="nav-link text-light" href="#">department</a>
                </li>
                <li class="nav-item bord-btm">
                  <a class="nav-link text-light" href="#">media center</a>
                </li>
                <li class="nav-item bord-btm">
                  <a class="nav-link text-light" href="#">document library</a>
                </li>
                <li class="nav-item bord-btm">
                  <a class="nav-link text-light" href="#">project center</a>
                </li>
                <li class="nav-item bord-btm">
                  <a class="nav-link text-light" href="#">services</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light" href="#">contacts</a>
                </li>
              </ul>
            </nav>`;
    this.get();
  }

  private async get() {
    
    sp.web.webs.get().then(function (data) {
      console.log("There are totally " + data.length + " subsites available on the site (SCOPE : WEB)");
      for (var i = 0; i < data.length; i++) {
        $("#tree").append(`<li class="nav-item bord-btm">
        <a class="nav-link text-light" href="${data[i].Url}">${data[i].Title}</a>
    </li>`); 
      }
    }).catch(function (data) {
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
