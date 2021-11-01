import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NewsWebPart.module.scss';
import * as strings from 'NewsWebPartStrings';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { _Webs } from '@pnp/sp/webs/types';
import { IContextInfo, _Site } from '@pnp/sp/sites/types';
import { getRandomString, setup as pnpSetup } from "@pnp/common";
import { SPComponentLoader } from "@microsoft/sp-loader";

export interface INewsWebPartProps {
  description: string;
}

export default class NewsWebPart extends BaseClientSideWebPart<INewsWebPartProps> {

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

  public async onInit() {
    const _ = await super.onInit();
    pnpSetup({
      spfxContext: this.context
    });
  }


  public render(): void {
    this.domElement.innerHTML = `<section class="recent-updates pl-20 mt-5">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <div class="main-heading">Recent Updates</div>
        <p class="text-light">Find all the latest news and updates here</p>
      </div>
      <button class="btn btn-primary">Read all updates</button>
    </div>
    <div class="updates-container large-slider p-3 mt-3">
      <div class="lSSlideOuter ">
      <div class="lSSlideWrapper usingCss" style="transition-duration: 400ms; transition-timing-function: ease;">
      <div id="news" class="content-slider lightSlider lSSlide lsGrab" items-per-page="4" style="width: 2047.5px; transform: translate3d(-630px, 0px, 0px); height: 301px; padding-bottom: 0%; visibility: visible;">
      </div><div class="lSAction"><a class="lSPrev"><i class="fas fa-chevron-left"></i></a><a class="lSNext"><i class="fas fa-chevron-right"></i></a></div></div><ul class="lSPager lSpg" style="margin-top: 5px; transform: translate3d(0px, 0px, 0px);"><li class="active"><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">4</a></li><li><a href="#">5</a></li></ul></div>
    </div>
  </section>`;

 this.getNews();
  }


  private async getNews() {

    const items: any[] = await sp.web.lists.getByTitle("News").items.get();
    for (var i = 0; i < items.length; i++) {
      let itemElem = await sp.web.lists.getByTitle("News").items.getById(items[i].Id).fieldValuesAsText.get();
      console.log(itemElem);
      let classes: string = "";
      if(i<2){
        classes= "clone left";
      }
      else if (i > 2 && i < 5) {
        classes = "lslide";
      }
      else if (i == 3) {
        classes = "lslide active";
      }
      else {
        classes = "clone right";
      }
      $("#news").append(`<div class="item clone ${classes}" style="width: 147.5px; margin-right: 10px;">
      <div class="update-cover">
      ${itemElem['NewsImage']}
      </div>
      <div class="update-content mt-3">
        <div class="font-italic">${itemElem['NewsDate']}</div>
        <h3 class="text-primary bord-btm pb-2 mb-2 font-italic">${itemElem['Title']}</h3>
        <p class="text-light">${itemElem['NewsDescription'].substring(0,20)}</p>
      </div>
    </div>`);
      


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
