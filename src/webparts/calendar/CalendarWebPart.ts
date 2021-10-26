import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from "@microsoft/sp-loader";
import styles from './CalendarWebPart.module.scss';
import * as strings from 'CalendarWebPartStrings';
import 'jqueryui';
import * as $ from 'jquery';
export interface ICalendarWebPartProps {
  description: string;
}

export default class CalendarWebPart extends BaseClientSideWebPart<ICalendarWebPartProps> {

  constructor(){
    super();
    SPComponentLoader.loadCss(
      "//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"
      );
  }
  public render(): void {

    this.domElement.innerHTML = `
    <div>
      <div id="datepicker"></div>
    </div>`;
    this.BindDatePicker();
  }
  public BindDatePicker()
  {
    $("#datepicker").datepicker();
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
