import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NewJoineesWebPart.module.scss';
import * as strings from 'NewJoineesWebPartStrings';
import { sp } from "@pnp/sp/presets/all";  
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { getRandomString, setup as pnpSetup } from "@pnp/common";

import { SPComponentLoader } from "@microsoft/sp-loader";

export interface INewJoineesWebPartProps {
  description: string;
}

export default class NewJoineesWebPart extends BaseClientSideWebPart<INewJoineesWebPartProps> {

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
      )

      SPComponentLoader.loadScript(
        "/IntranetDemo/Assets/js/libs/jquery-ui.min.js"
      ).then(() => {
        SPComponentLoader.loadScript(
          "/IntranetDemo/Assets/js/main.js"
        );
        
      });

     
    });

  }
  public async onInit() {
    const _ = await super.onInit();
    // other init code may be present
    pnpSetup({
      spfxContext: this.context
    });
  }

  private async getItems() {
    // console.log(await sp.web.lists.getByTitle("newJoinees").items.getById(1).fieldValuesAsText.get());
    const items: any[] = await sp.web.lists.getByTitle("newJoinees").items.get();

    for(var i=0;i<items.length;i++){
      let itemElem =  await sp.web.lists.getByTitle("newJoinees").items.getById(items[i].Id).fieldValuesAsText.get();
      console.log(itemElem);
      $("#divjoinees").append(`<div class="item  d-flex align-items-center">
      ${itemElem["NewJoineePhoto"]}
      <div>
        <p class="text-primary bold mb-0">${itemElem["NewJoinerName"]}</p>
        <p class="text-light mb-0">${itemElem["NewJoineeDepartment"]}</p>
      </div>
    </div>`);

    
    }   
  }


  public render(): void {
    this.getItems();
    this.domElement.innerHTML = `  <div class="col-lg-3  col-md-12 col-sm-12 new-joinees">
    <div class="main-heading">New Joinees</div>
    <div id="divjoinees" class="content-slider mt-3" items-per-page="1">
      
    </div>
  </div>`;
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
