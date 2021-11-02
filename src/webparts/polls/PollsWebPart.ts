import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PollsWebPart.module.scss';
import * as strings from 'PollsWebPartStrings';
import { SPComponentLoader } from "@microsoft/sp-loader";

export interface IPollsWebPartProps {
  description: string;
}

export default class PollsWebPart extends BaseClientSideWebPart<IPollsWebPartProps> {

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


  public render(): void {
    this.domElement.innerHTML = `
    <div class="col-lg-9  col-md-12 col-sm-12">
    <!-- start of polls section -->
    <section class="pl-30 polls">
      <div class="main-heading">Today's Poll</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?</p>
      <!-- start of polls form -->
      <form>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="rollRB" id="rollRB_option1">
          <label class="form-check-label text-light" for="rollRB_option1">
            Lorem ipsum dolor sit
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="rollRB" id="rollRB_option2">
          <label class="form-check-label text-light" for="rollRB_option2">
            Lorem ipsum 
          </label>
        </div>
        <div class="actions mt-3">
          <button type="submit" class="btn btn-primary">Send</button>
          <button type="submit" class="btn btn-outline-primary">View Results</button>
        </div>
        <button class="btn btn-link p-0 mt-1">
          <small>+  View Other Polls</small>
        </button>
      </form>
    </section>
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
