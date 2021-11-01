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
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { _Webs } from '@pnp/sp/webs/types';
import { IContextInfo, _Site } from '@pnp/sp/sites/types';
import { getRandomString, setup as pnpSetup } from "@pnp/common";
import { SPComponentLoader } from "@microsoft/sp-loader";


export interface IQuickLinksWebPartProps {
  description: string;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

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
      );

      SPComponentLoader.loadScript(
        "/IntranetDemo/Assets/js/libs/jquery-ui.min.js"
      );

      SPComponentLoader.loadScript(
        "/IntranetDemo/Assets/js/main.js"
      );
    });

  }

  public async onInit() {
    const _ = await super.onInit();
    pnpSetup({
      spfxContext: this.context
    });
  }
  public render(): void {
    this.domElement.innerHTML = `
    <section class="departments large-slider pl-20 mt-5">
                  <div class="lSSlideOuter "><div class="lSSlideWrapper usingCss" style="transition-duration: 400ms; transition-timing-function: ease;">
                  <div id="depts" class="content-slider lightSlider lSSlide lsGrab" items-per-page="6" style="width: 2096.33px; transform: translate3d(-662px, 0px, 0px); height: 144px; padding-bottom: 0%; visibility: visible;">
                  </div><div class="lSAction"><a class="lSPrev"><i class="fas fa-chevron-left"></i></a><a class="lSNext"><i class="fas fa-chevron-right"></i></a></div></div><ul class="lSPager lSpg" style="margin-top: 5px; transform: translate3d(0px, 0px, 0px);"><li class="active"><a href="#">1</a></li><li class=""><a href="#">2</a></li><li class=""><a href="#">3</a></li><li class=""><a href="#">4</a></li><li class=""><a href="#">5</a></li><li class=""><a href="#">6</a></li><li class=""><a href="#">7</a></li></ul></div>
                </section>`;
    this.getLinks();
  }

  private async getLinks() {

    const items: any[] = await sp.web.lists.getByTitle("Quick Links").items.get();
    for (var i = 0; i < items.length; i++) {
      let itemElem = await sp.web.lists.getByTitle("Quick Links").items.getById(items[i].Id).fieldValuesAsText.get();
      let classes: string = "";
      if(i<2){
        classes= "clone left";
      }
      else if (i > 2 && i < 7) {
        classes = "lslide";
      }
      else if (i == 3) {
        classes = "lslide active";
      }
      else {
        classes = "clone right";
      }
      $("#depts").append(`<div class="item text-center ${classes}" style="width: 100.333px; margin-right: 10px;">
      <div class="dept-photo pb-4 p-4">
        ${itemElem['QuickLinksImage']}
      </div>
      <p class="mb-0 mt-2 text-light bold">${itemElem['Title']}</p>
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
