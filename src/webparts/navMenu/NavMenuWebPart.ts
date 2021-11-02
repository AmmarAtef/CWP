import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from "@microsoft/sp-loader";

import styles from './NavMenuWebPart.module.scss';
import * as strings from 'NavMenuWebPartStrings';

export interface INavMenuWebPartProps {
  description: string;
}

export default class NavMenuWebPart extends BaseClientSideWebPart<INavMenuWebPartProps> {

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
  </nav>  <section class="responsive-menue position-fixed w-100 h-100 pt-5 d-none">
  <i class="fas fa-times close-menue position-absolute pointer"></i>
  <nav class="navbar text-center">
    <ul class="navbar-nav w-100 text-capitalize p-4">
      <li class="nav-item bord-btm">
        <a class="nav-link mb-2 pb-2 pt-2" href="#">about us</a>
      </li>
      <li class="nav-item bord-btm">
        <a class="nav-link mb-2 pb-2 pt-2" href="#">department</a>
      </li>
      <li class="nav-item bord-btm">
        <a class="nav-link mb-2 pb-2 pt-2" href="#">media center</a>
      </li>
      <li class="nav-item bord-btm">
        <a class="nav-link mb-2 pb-2 pt-2" href="#">document library</a>
      </li>
      <li class="nav-item bord-btm">
        <a class="nav-link mb-2 pb-2 pt-2" href="#">project center</a>
      </li>
      <li class="nav-item bord-btm">
        <a class="nav-link mb-2 pb-2 pt-2" href="#">services</a>
      </li>
      <li class="nav-item">
        <a class="nav-link mb-2 pb-2 pt-2" href="#">contacts</a>
      </li>
    </ul>
  </nav>
</section>
`;
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
