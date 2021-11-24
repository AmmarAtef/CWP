import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OurPerformanceWebPart.module.scss';
import * as strings from 'OurPerformanceWebPartStrings';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { _Webs } from '@pnp/sp/webs/types';
import { IContextInfo, _Site } from '@pnp/sp/sites/types';
import { getRandomString, setup as pnpSetup } from "@pnp/common";
import { SPComponentLoader } from "@microsoft/sp-loader";

export interface IOurPerformanceWebPartProps {
  description: string;
}

export default class OurPerformanceWebPart extends BaseClientSideWebPart<IOurPerformanceWebPartProps> {

  constructor() {
    super();
    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/libs/bootstrap.min.css"
    );

    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/libs/all.css"
    );

    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/libs/lightslider.css"
    );

    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/libs/jquery-ui.css"
    );

    SPComponentLoader.loadCss(

      "/IntranetDemo/Assets/css/main.css"
    );


    SPComponentLoader.loadScript(
      "/IntranetDemo/Assets/js/libs/jquery.min.js"
    ).then(() => {
      SPComponentLoader.loadScript(
        "/IntranetDemo/Assets/js/libs/lightslider.js"
      );

      SPComponentLoader.loadScript(
        "/IntranetDemo/Assets/js/libs/jquery-ui.min.js"
      ).then(() => {
        SPComponentLoader.loadScript(
          "/IntranetDemo/Assets/js/main.js"
        );

      });


    });

  }


  private async getPerformance() {
    const items: any[] = await sp.web.lists.getByTitle("Performance").items.get();
    for (var i = 0; i < items.length; i++) {
      let itemElem = await sp.web.lists.getByTitle("Performance").items.getById(items[i].Id).fieldValuesAsText.get();

      $("#performance").append(`<div class="col-6 d-flex align-items-center item mb-5">
      ${itemElem["PerformanceImage"]}
      <div class="item-content">
        <p class="text-secondary bold m-0">${itemElem['Performance']}</p>
        <p class="text-light m-0">Vessels (Total)</p>
      </div>
    </div>`);



    }

  }

  public async onInit() {
    const _ = await super.onInit();
    pnpSetup({
      spfxContext: this.context
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
    <div class="col-lg-7  col-md-12 col-sm-12">
                    <div class="main-heading mt-3">OUR PERFORMACE</div>
                    <div id="performance" class="row our-performance mt-4">
                      
                    </div>
                  </div>`;
    this.getPerformance();

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
