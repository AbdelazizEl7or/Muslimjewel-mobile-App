import React from 'react';
import { requestWidgetUpdate, type WidgetTaskHandlerProps } from 'react-native-android-widget';
import { JoharatAlMoslim } from './widget';
import prayTimes from './PrayTimes';
import { storage } from './context/data-context';
import { getNext, getNextTime } from './screens/sala';
import BackgroundTimer from "react-native-background-timer";
import { registerBackgroundFetchAsync } from './App';

const nameToWidget = {
  // JoharatAlMoslim will be the **name** with which we will reference our widget.
  JoharatAlMoslim: JoharatAlMoslim,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
    const widgetInfo = props.widgetInfo;
    const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
     await registerBackgroundFetchAsync();
     props.renderWidget(<JoharatAlMoslim  />);
     break;
     
     case 'WIDGET_UPDATE':
      props.renderWidget(<JoharatAlMoslim  />);
      break;

    case 'WIDGET_RESIZED':
      await registerBackgroundFetchAsync();
      props.renderWidget(<JoharatAlMoslim  />);
      break;

    case 'WIDGET_DELETED':
      break;

    case 'WIDGET_CLICK':
      if (props.clickAction === 'RERENDER_WIDGET_TIMES') {
        props.renderWidget(<JoharatAlMoslim  />);
        await registerBackgroundFetchAsync();
      }
    break;

    default:
      break;
  }
}