import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PromotionsWebPart.module.scss';
import * as strings from 'PromotionsWebPartStrings';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { _Webs } from '@pnp/sp/webs/types';
import { IContextInfo, _Site } from '@pnp/sp/sites/types';
import { getRandomString, setup as pnpSetup } from "@pnp/common";
import { SPComponentLoader } from "@microsoft/sp-loader";

export interface IPromotionsWebPartProps {
  description: string;
}

export default class PromotionsWebPart extends BaseClientSideWebPart<IPromotionsWebPartProps> {


  constructor() {
    super();
    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/bootstrap.min.css"
    );

    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/all.css"
    );

    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/lightslider.css"
    );

    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/jquery-ui.css"
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


  public render(): void {
    this.domElement.innerHTML = `
    <section class="promotions outline-container mt-4 text-center">
    <div class="main-heading mb-3">Promotions</div>
    <div class="lSSlideOuter ">
    <div class="lSSlideWrapper usingCss" style="transition-duration: 400ms; transition-timing-function: ease;">
    <div id="promotions" class="content-slider lightSlider lsGrab lSSlide" items-per-page="1" style="width: 1288px; transform: translate3d(-322px, 0px, 0px); height: 178px; padding-bottom: 0%; visibility: visible;">
    
    </div><div class="lSAction"><a class="lSPrev"><i class="fas fa-chevron-left"></i></a><a class="lSNext"><i class="fas fa-chevron-right"></i></a></div></div><ul class="lSPager lSpg" style="margin-top: 5px; transform: translate3d(0px, 0px, 0px);"><li class="active"><a href="#">1</a></li><li><a href="#">2</a></li></ul></div>
    <div>
      <button class="btn btn-link mt-3">+ View all promotions</button>
    </div>
  </section>`;

    this.getPromotions();

  }


  public async onInit() {
    const _ = await super.onInit();
    pnpSetup({
      spfxContext: this.context
    });
  }

  private async getPromotions() {
    const items: any[] = await sp.web.lists.getByTitle("Promotions").items.get();
    for (var i = 0; i < items.length; i++) {
      let itemElem = await sp.web.lists.getByTitle("Promotions").items.getById(items[i].Id).fieldValuesAsText.get();
      console.log(itemElem);
      let classCss: string = "clone right"
      if (i == 0) {
        classCss = "clone left";
      }
      else if (i == 1) {
        classCss = "lslide active";
      }
      else if (i == 2) {
        classCss = "lslide";
      }
    
      $("#promotions").append(
        `<div class="${classCss}" style="width: 312px; margin-right: 10px;">
        <div class="outline-container d-inline-block">
          ${itemElem['PromotionsImage']}
        </div>
        <p class="text-primary bold mt-3 mb-0 offer">${itemElem['PromotionsOffer']}</p>
        <p class="text-light mb-0">${itemElem['PromotionsDescription']}</p>
        <button class="btn btn-link bold p-0">Read more</button>
      </div>`
      );
    }

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
