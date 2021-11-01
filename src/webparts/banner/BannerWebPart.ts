import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './BannerWebPart.module.scss';
import * as strings from 'BannerWebPartStrings';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { _Webs } from '@pnp/sp/webs/types';
import { IContextInfo, _Site } from '@pnp/sp/sites/types';
import { getRandomString, setup as pnpSetup } from "@pnp/common";
import { SPComponentLoader } from "@microsoft/sp-loader";

export interface IBannerWebPartProps {
  description: string;
}

export default class BannerWebPart extends BaseClientSideWebPart<IBannerWebPartProps> {

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



  private async getBanner() {
    const items: any[] = await sp.web.lists.getByTitle("Banners").items.top(1).get();


    for (var i = 0; i < items.length; i++) {
      let itemElem = await sp.web.lists.getByTitle("Banners").items.getById(items[i].Id).fieldValuesAsText.get();
      let imgUrl:string = itemElem['FileRef'];
      console.log(imgUrl);
      $("#imgBanner").attr("src",imgUrl);
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
    <section class="main-cover position-relative">
    <img class="cover-photo w-100 h-100" alt="Cover " id="imgBanner" src="">
    <div class="cover-overlay position-absolute w-100 h-100 d-flex align-items-center">
      <div class="cover-quotes col-lg-4 col-md-7 col-sm-11 position-relative">
        <i class="fas fa-quote-right quotes-icon position-absolute"></i>
        <p>Many of life’s failures are people who did not realize how close they were to success when they gave up.</p>
        <button class="btn btn-link p-0">Thomas A. Edison</button>
        <i class="fas fa-quote-right quotes-icon position-absolute"></i>
      </div>
    </div>
  </section>`;
    this.getBanner();
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
