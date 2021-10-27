import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from "@microsoft/sp-loader";
import styles from './WeatherWebPart.module.scss';
import * as strings from 'WeatherWebPartStrings';
import * as $ from 'jquery';



export interface IWeatherWebPartProps {
  description: string;
}

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {

  constructor(){
    super();
    SPComponentLoader.loadCss(
      "/IntranetDemo/Assets/css/main.css"
      );
      SPComponentLoader.loadCss(
        "/IntranetDemo/Assets/css/lightslider.css"
        );
        SPComponentLoader.loadCss(
          "/IntranetDemo/Assets/css/bootstrap.min.css"
          );
          SPComponentLoader.loadCss(
            "/IntranetDemo/Assets/css/all.css"
            );
  }

  public render(): void {
    
    this.domElement.innerHTML = `
    <div class="weather mb-3">
    <img alt="" src="/IntranetDemo/Assets/Img/weatherIcon.png" />
    <span class="textPrimary degree" id="degree">30 °C</span>
    <span id="place">Sunny, Doha</span>
    <i class="fas fa-caret-right text-primary"></i>
  </div>`;

      this.getData();
  }


private getData(){
  const url = new URL('https://api.weatherapi.com/v1/current.json?key=300ef357d4164ac98a390615211910&q=Doha&aqi=no');
    (async () =>{
      const response = await fetch( url.toString());
      const data = await response.json();
       $("#degree").text(data.current.feelslike_c +" °C ");
       $("#place").text(data.current.condition.text+", "+data.location.name);
    })();
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
