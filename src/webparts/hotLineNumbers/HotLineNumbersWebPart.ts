import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HotLineNumbersWebPart.module.scss';
import * as strings from 'HotLineNumbersWebPartStrings';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { getRandomString, setup as pnpSetup } from "@pnp/common";

import { SPComponentLoader } from "@microsoft/sp-loader";
export interface IHotLineNumbersWebPartProps {
  description: string;
}

export default class HotLineNumbersWebPart extends BaseClientSideWebPart<IHotLineNumbersWebPartProps> {

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



  public render(): void {
    this.domElement.innerHTML = `
    <section class="hotline-numbers p-3 pt-0">
                  <div class="main-heading position-relative d-flex align-items-center">
                    <span class="position-relative d-inline-block handset-icon"></span> hotline numbers
                  </div>
                  <div id="title" class="d-flex justify-content-around bord-btm text-primary">
                   
                  </div>
                  <div id="hotLineNumber" class="d-flex justify-content-around bold mt-1">
                    
                  </div>
                </section>`;
      this.getItems();
  }

  public async onInit() {
    const _ = await super.onInit();
    // other init code may be present
    pnpSetup({
      spfxContext: this.context
    });
  }

  private async getItems(){
    const items: any[] = await sp.web.lists.getByTitle("HotLine").items.get();
    items.forEach((item: any) =>{
$("#title").append(`<span>${item['HotLineTitle']}</span>`);
$("#hotLineNumber").append(`<span>${item['HotLine']}</span>`);


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
