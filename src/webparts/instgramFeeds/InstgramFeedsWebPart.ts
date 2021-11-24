import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './InstgramFeedsWebPart.module.scss';
import * as strings from 'InstgramFeedsWebPartStrings';
import { SPComponentLoader } from "@microsoft/sp-loader";

export interface IInstgramFeedsWebPartProps {
  description: string;
}

export default class InstgramFeedsWebPart extends BaseClientSideWebPart<IInstgramFeedsWebPartProps> {
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
    <section class="instgram-feeds mt-4">
                  <div class="main-heading">Instagram Feeds</div>
                  <div class="position-relative">
                    <i class="fab fa-instagram-square instgram-icon position-absolute"></i>
                    <div class="feeds-container outline-container pb-0">
                      <div class="feed-item mb-2 d-flex">
                        <img class="w-100" alt="instgram-feeds" src="/IntranetDemo/assets/img/dummy/insgram-feeds.jpg" />
                      </div>
                      <div class="feed-item mb-2 d-flex">
                        <img class="w-100" alt="instgram-feeds" src="/IntranetDemo/assets/img/dummy/insgram-feeds.jpg" />
                      </div>
                    </div>
                  </div>
                </section>`;
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
